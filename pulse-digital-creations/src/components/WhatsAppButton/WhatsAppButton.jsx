import './WhatsAppButton.scss'

const PHONE = '919352073285'
const SERVICES = [
  'Reels Production',
  'Branding & Logo Design',
  'Motion Graphics',
  'Digital Marketing',
  'Product Photography',
  'Web Design',
]
const MESSAGE = `Hi Pulse Digital Creations! I'd like to know more about your services:\n${SERVICES.map(s => `• ${s}`).join('\n')}\n\nCould you share more details?`

export default function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.44 5.13L2 22l5.14-1.52a9.84 9.84 0 0 0 4.9 1.33h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.44 17.5 2 12.04 2Zm5.78 14.03c-.25.68-1.45 1.32-2 1.4-.52.08-1.02.11-1.6-.1-.37-.14-1.95-.65-3.76-1.98-2.06-1.54-3.32-3.35-3.6-3.9-.26-.5-.02-.78.2-.98.2-.18.44-.33.63-.5.18-.17.3-.3.44-.56.13-.25.07-.46-.02-.65-.1-.2-.95-2.3-1.1-2.65-.15-.35-.3-.3-.42-.3-.12 0-.3-.02-.47-.02-.16 0-.42.06-.64.3-.22.25-.84.82-.84 1.98 0 1.17.86 2.3 1 2.47.13.17 1.6 2.5 4 3.5 2.4.98 2.4.66 2.84.62.44-.04 1.45-.6 1.66-1.18.2-.57.2-1.07.14-1.18-.06-.1-.23-.16-.48-.28Z"/>
      </svg>
    </a>
  )
}
