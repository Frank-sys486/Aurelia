import { treatments, packages, testimonials } from './data'

const DB_KEY = 'aurelia_spa_db_v1'
const wait = (ms = 650) => new Promise(resolve => setTimeout(resolve, ms))

const seed = {
  bookings: [],
  messages: [],
  newsletter: [],
  giftCards: [],
  profile: null,
  preferences: { marketing: false },
}

function readDB() {
  const raw = localStorage.getItem(DB_KEY)
  if (!raw) {
    localStorage.setItem(DB_KEY, JSON.stringify(seed))
    return structuredClone(seed)
  }
  try { return { ...seed, ...JSON.parse(raw) } } catch { return structuredClone(seed) }
}

function writeDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db))
  return db
}

function id(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export const api = {
  async getTreatments() {
    await wait(450)
    return structuredClone(treatments)
  },
  async getTreatment(treatmentId) {
    await wait(400)
    const item = treatments.find(t => t.id === treatmentId)
    if (!item) throw new Error('Treatment not found')
    return structuredClone(item)
  },
  async getPackages() {
    await wait(500)
    return structuredClone(packages)
  },
  async getTestimonials() {
    await wait(350)
    return structuredClone(testimonials)
  },
  async createBooking(payload) {
    await wait(1050)
    const db = readDB()
    const booking = {
      id: id('BK'),
      confirmation: `AU-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ...payload,
    }
    db.bookings.unshift(booking)
    db.profile = { name: payload.name, email: payload.email, phone: payload.phone }
    writeDB(db)
    return structuredClone(booking)
  },
  async getBookings(email) {
    await wait(700)
    const db = readDB()
    return db.bookings.filter(b => b.email.toLowerCase() === String(email).toLowerCase())
  },
  async cancelBooking(bookingId) {
    await wait(900)
    const db = readDB()
    const booking = db.bookings.find(b => b.id === bookingId)
    if (!booking) throw new Error('Booking not found')
    booking.status = 'cancelled'
    booking.cancelledAt = new Date().toISOString()
    writeDB(db)
    return structuredClone(booking)
  },
  async sendContact(payload) {
    await wait(850)
    const db = readDB()
    const message = { id: id('MSG'), createdAt: new Date().toISOString(), status: 'received', ...payload }
    db.messages.unshift(message)
    writeDB(db)
    return message
  },
  async subscribeNewsletter(email) {
    await wait(650)
    const db = readDB()
    if (!db.newsletter.some(x => x.email.toLowerCase() === email.toLowerCase())) {
      db.newsletter.push({ id: id('NL'), email, createdAt: new Date().toISOString() })
      writeDB(db)
    }
    return { ok: true }
  },
  async purchaseGiftCard(payload) {
    await wait(1000)
    const db = readDB()
    const card = {
      id: id('GC'),
      code: `AUR-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      status: 'active',
      createdAt: new Date().toISOString(),
      ...payload,
    }
    db.giftCards.unshift(card)
    writeDB(db)
    return card
  },
  async getProfile() {
    await wait(350)
    return readDB().profile
  },
  async resetDemoData() {
    await wait(450)
    localStorage.removeItem(DB_KEY)
    readDB()
    return { ok: true }
  }
}
