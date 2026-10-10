# Pulse WhatsApp AI Bot

Auto-replies to messages sent to your WhatsApp Business number, using Claude to answer based on what service the visitor is asking about. This is a standalone backend — it has nothing to do with the website's `wa.me` button, which just opens a chat. This is what makes the chat itself smart.

## What you need before this works

1. **A Meta Business Manager account** and a WhatsApp Business app on [developers.facebook.com](https://developers.facebook.com) with the WhatsApp product added.
2. **A phone number registered on the WhatsApp Cloud API** — either a new number, or your existing one migrated onto the Cloud API (Meta's migration flow, not a `wa.me` link).
3. **An Anthropic API key** — get one at [console.anthropic.com](https://console.anthropic.com).
4. **Somewhere to host this server with a public HTTPS URL** — e.g. [Render](https://render.com), [Railway](https://railway.app), or a VPS. Meta needs to reach your `/webhook` endpoint from the internet; `localhost` won't work (use `ngrok` only for local testing).

## Setup

```bash
cd whatsapp-ai-bot
npm install
cp .env.example .env
```

Fill in `.env`:

- `WHATSAPP_TOKEN` — from Meta App → WhatsApp → API Setup → Temporary/Permanent access token
- `WHATSAPP_PHONE_NUMBER_ID` — same page, "Phone number ID"
- `WHATSAPP_VERIFY_TOKEN` — any random string you make up (e.g. `pulse-verify-xyz123`) — you'll enter this same value in Meta's dashboard in the next step
- `ANTHROPIC_API_KEY` — from console.anthropic.com

Run it locally:

```bash
npm run dev
```

## Connecting the webhook

1. Deploy this server somewhere with a public URL (or run `ngrok http 3000` for local testing and use the `https://...ngrok-free.app` URL it gives you).
2. In the Meta App dashboard → WhatsApp → Configuration → Webhook, click **Edit**.
3. Callback URL: `https://<your-deployed-url>/webhook`
4. Verify token: the same value you put in `WHATSAPP_VERIFY_TOKEN`.
5. Click **Verify and save** — Meta will hit `GET /webhook` to confirm it matches.
6. Under **Webhook fields**, subscribe to `messages`.

Now send a WhatsApp message to your business number — it should get an AI reply within a few seconds.

## How it works

- `GET /webhook` — one-time handshake Meta uses to verify the endpoint.
- `POST /webhook` — fires every time someone messages your number. The handler acks Meta immediately (required within a few seconds), then asynchronously asks Claude for a reply and sends it back via the Cloud API.
- Conversation history is kept **in memory**, per sender, capped at the last 10 exchanges. It resets if the server restarts. For production, swap `conversations` (a `Map`) for Redis or a database table keyed by sender phone number.
- The system prompt (`SYSTEM_PROMPT` in `server.js`) is where the services list, tone, and contact-handoff behavior live — edit it directly to change what the bot knows or how it talks.

## Cost

Using `claude-opus-5-5` ($4 / $20 per million input/output tokens), a typical WhatsApp exchange (short system prompt + a few turns of history + a short reply) costs roughly **$0.005–0.01 per message** — a few hundred messages a month is well under a dollar. If volume gets high and you want it cheaper, change the `model` field in `server.js` to `claude-haiku-5-5` ($0.10 / $0.50 per million tokens) — notably cheaper, still solid for straightforward Q&A like this.

## Known limitations (scaffold, not production-hardened)

- No database — conversation memory is lost on restart/redeploy.
- No rate limiting — a flood of messages hits your Anthropic bill directly.
- No signature verification on incoming webhooks (Meta supports `X-Hub-Signature-256` — worth adding before going live so random requests can't fake messages).
- Text messages only — images/audio/documents get a "please type it out" reply.
