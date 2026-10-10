import 'dotenv/config'
import express from 'express'
import Anthropic from '@anthropic-ai/sdk'

const {
  PORT = 3000,
  WHATSAPP_TOKEN,
  WHATSAPP_PHONE_NUMBER_ID,
  WHATSAPP_VERIFY_TOKEN,
  ANTHROPIC_API_KEY,
} = process.env

for (const [name, value] of Object.entries({
  WHATSAPP_TOKEN,
  WHATSAPP_PHONE_NUMBER_ID,
  WHATSAPP_VERIFY_TOKEN,
  ANTHROPIC_API_KEY,
})) {
  if (!value) {
    console.warn(`[warn] ${name} is not set — the bot will not work until it's configured in .env`)
  }
}

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY })
const app = express()
app.use(express.json())

const SYSTEM_PROMPT = `You are the WhatsApp assistant for Pulse Digital Creations, a digital agency based in India serving global brands.

Your job: when a visitor messages in, figure out which service(s) they're interested in, answer their questions about it, and keep the conversation moving toward them sharing their project details (what they need, timeline, budget) so the team can follow up.

Services we offer:
1. Reels Production — cafe reels, product videos, event coverage, Instagram & YouTube Shorts
2. Branding & Logo Design — logo creation, brand identity, color & typography systems, brand guidelines
3. Motion Graphics — logo animation, promotional videos, social media animations, title sequences
4. Digital Marketing — social media strategy, content planning, ad creatives, campaign management
5. Product Photography — product shoots, lifestyle photography, catalogue shoots, e-commerce ready edits
6. Web Design — landing pages, portfolio sites, e-commerce design, UI/UX consulting

Contact for human follow-up: pulsedigitalcreations@gmail.com / 9438536276.

Style rules for WhatsApp:
- Keep replies short — 2-4 sentences, not an essay.
- Use WhatsApp formatting sparingly: *bold* for emphasis, plain text otherwise. No markdown headers, no numbered markdown lists with "#" or "**".
- Be warm and conversational, not corporate.
- If they ask about pricing, explain it depends on project scope and ask 1-2 clarifying questions instead of inventing a number.
- If the conversation is ready for a human (they've shared enough detail, or explicitly ask for a person), say the team will follow up and mention the email/phone above.
- Never invent services, pricing, timelines, or portfolio claims not listed here.`

// In-memory conversation history, keyed by WhatsApp sender id. Resets on restart —
// swap for Redis/a DB if you need history to survive deploys.
const conversations = new Map()
const MAX_TURNS = 10

function getHistory(from) {
  return conversations.get(from) ?? []
}

function pushTurns(from, ...turns) {
  const history = getHistory(from)
  history.push(...turns)
  conversations.set(from, history.slice(-MAX_TURNS * 2))
}

async function generateReply(from, userText) {
  const history = getHistory(from)

  const response = await anthropic.messages.create({
    model: 'claude-opus-5-5',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [...history, { role: 'user', content: userText }],
  })

  const textBlock = response.content.find((b) => b.type === 'text')
  const reply = textBlock?.text ?? "Sorry, I couldn't put that into words — could you try rephrasing?"

  pushTurns(from, { role: 'user', content: userText }, { role: 'assistant', content: reply })
  return reply
}

async function sendWhatsAppMessage(to, body) {
  const url = `https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body },
    }),
  })

  if (!res.ok) {
    console.error('[whatsapp] send failed', res.status, await res.text())
  }
}

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'pulse-whatsapp-ai-bot' })
})

// Meta's one-time webhook verification handshake.
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']

  if (mode === 'subscribe' && token === WHATSAPP_VERIFY_TOKEN) {
    res.status(200).send(challenge)
  } else {
    res.sendStatus(403)
  }
})

// Incoming WhatsApp messages land here.
app.post('/webhook', (req, res) => {
  // Ack immediately — Meta expects a fast 200 and will retry if we're slow.
  res.sendStatus(200)

  const message = req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]
  if (!message) return // status callbacks, read receipts, etc. — nothing to do

  const from = message.from
  const text = message.text?.body

  if (!text) {
    sendWhatsAppMessage(from, "I can only read text messages right now — mind typing out what you're looking for?")
    return
  }

  generateReply(from, text)
    .then((reply) => sendWhatsAppMessage(from, reply))
    .catch((err) => {
      console.error('[ai] generateReply failed', err)
      sendWhatsAppMessage(
        from,
        "Sorry, I hit a snag on my end. Please try again in a moment, or reach us directly at pulsedigitalcreations@gmail.com / 9438536276.",
      )
    })
})

app.listen(PORT, () => {
  console.log(`Pulse WhatsApp AI bot listening on port ${PORT}`)
})
