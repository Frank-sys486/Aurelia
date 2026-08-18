import React, { useEffect, useMemo, useState } from 'react'
import { Routes, Route, NavLink, Link, useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom'
import {
  ArrowRight, CalendarDays, Check, ChevronDown, Clock3, Gift, Heart, Leaf, Mail,
  MapPin, Menu, Phone, Search, ShieldCheck, Sparkles, Star, UserRound, X
} from 'lucide-react'
import { api } from './api'
import { gallery, packages, treatments } from './data'

const money = n => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(n)
const minutes = n => n >= 60 ? `${Math.floor(n/60)} hr${Math.floor(n/60)>1?'s':''}${n%60 ? ` ${n%60} min` : ''}` : `${n} min`

function App() {
  const { pathname } = useLocation()
  const bookingMode = pathname === '/booking'
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return <div className="app-shell">
    {!bookingMode && <Announcement />}
    {!bookingMode && <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/treatments/:id" element={<TreatmentDetail />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    {!bookingMode && <Footer />}
    {!bookingMode && <MobileBookingBar />}
  </div>
}

function Announcement() {
  return <div className="announcement">Private wellness rituals · Open daily 10:00 AM–9:00 PM</div>
}

function Header({ menuOpen, setMenuOpen }) {
  return <header className="site-header">
    <div className="nav-wrap">
      <Link className="brand" to="/"><span className="brand-mark">A</span><span>AURELIA <small>SPA & WELLNESS</small></span></Link>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <NavLink to="/treatments">Treatments</NavLink>
        <NavLink to="/packages">Packages</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
        <NavLink to="/contact">Visit</NavLink>
        <NavLink to="/account" className="account-link"><UserRound size={16}/> My bookings</NavLink>
      </nav>
      <div className="nav-actions">
        <Link className="btn btn-dark desktop-book" to="/booking">Book a ritual</Link>
        <button className="menu-btn" aria-label="Toggle menu" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X/> : <Menu/>}</button>
      </div>
    </div>
  </header>
}

function Home() {
  return <>
    <section className="hero">
      <video className="hero-media" autoPlay muted loop playsInline aria-hidden="true">
        <source src="https://github.com/Frank-sys486/IV-Elements-demp/raw/refs/heads/main/src/assets/video/hero/videoplayback1.mp4" type="video/mp4"/>
      </video>
      <div className="hero-overlay"/>
      <div className="hero-content container">
        <h1>Rest, restored<br/>with intention.</h1>
        <p className="hero-copy">Thoughtful massage, skin, body, and wellness rituals designed for deep rest and unhurried renewal.</p>
        <div className="hero-actions">
          <Link className="btn btn-cream" to="/booking">Book your experience <ArrowRight size={16}/></Link>
          <Link className="text-link light" to="/treatments">Explore treatments</Link>
        </div>
      </div>
    </section>

    <section className="section intro-section">
      <div className="container intro-grid">
        <div><p className="eyebrow">Aurelia philosophy</p><h2>Luxury that feels quiet,<br/>personal, and human.</h2></div>
        <div className="intro-copy"><p>We believe the most restorative experiences are not rushed. Every Aurelia ritual is paced around you—from the welcome tea to the final few minutes of stillness.</p><Link className="text-link" to="/about">Discover our approach <ArrowRight size={15}/></Link></div>
      </div>
    </section>

    <section className="section section-soft">
      <div className="container">
        <SectionHead eyebrow="Our rituals" title="Choose how you want to feel." link="/treatments" linkText="View all treatments" />
        <div className="treatment-grid">
          {treatments.filter(t => t.featured).map(t => <TreatmentCard key={t.id} t={t}/>) }
        </div>
      </div>
    </section>

    <section className="split-feature">
      <div className="split-image image-signature"/>
      <div className="split-copy">
        <p className="eyebrow">Signature experience</p>
        <h2>The Quiet Luxury</h2>
        <p>165 minutes of unhurried restoration: a full-body massage, luminous facial, botanical tea, and private relaxation time.</p>
        <div className="meta-row"><span><Clock3 size={16}/> 2 hr 45 min</span><span>{money(7600)}</span></div>
        <Link className="btn btn-dark" to="/booking?package=quiet-luxury">Reserve this ritual</Link>
      </div>
    </section>

    <section className="section experience-section">
      <div className="container">
        <div className="center-head"><p className="eyebrow">The experience</p><h2>Your time starts before<br/>the treatment begins.</h2></div>
        <div className="steps-grid">
          {[
            ['01','Arrive','Come a little early. We’ll welcome you with tea and a quiet moment to settle in.'],
            ['02','Unwind','Your therapist personalizes pressure, focus areas, scent, and pace around how you feel.'],
            ['03','Restore','Your treatment unfolds without rush, with thoughtful transitions and private comfort.'],
            ['04','Leave renewed','Take a few final minutes to hydrate, breathe, and return to your day gradually.'],
          ].map(([n,t,d]) => <div className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </div>
    </section>

    <section className="section reviews-section">
      <div className="container">
        <div className="center-head"><p className="eyebrow">Guest experiences</p><h2>Kind words, quietly shared.</h2></div>
        <div className="review-grid">{[
          ['Mara D.','Every detail feels intentional. The treatment was excellent, but the calm atmosphere is what made me want to return.'],
          ['Elaine R.','Elegant without feeling intimidating. Booking was easy, the staff were warm, and the experience felt genuinely restorative.'],
          ['Jules P.','The kind of place where you stop checking the time. Quiet, polished, and deeply relaxing.']
        ].map(([name,q]) => <article className="review" key={name}><div className="stars">★★★★★</div><p>“{q}”</p><span>{name}</span></article>)}</div>
      </div>
    </section>

    <section className="section gallery-preview">
      <div className="container"><SectionHead eyebrow="A glimpse inside" title="Designed for exhale." link="/gallery" linkText="View gallery" /></div>
      <div className="gallery-strip">{gallery.slice(0,4).map((src,i)=><img key={src} src={src} alt={`Aurelia spa atmosphere ${i+1}`}/>)}</div>
    </section>

    <section className="visit-cta">
      <div className="container visit-inner">
        <div><p className="eyebrow light">Your ritual is waiting</p><h2>Make space for feeling well.</h2></div>
        <div><p>Choose a treatment, date, and time in just a few steps.</p><Link className="btn btn-cream" to="/booking">Book your visit <ArrowRight size={16}/></Link></div>
      </div>
    </section>
  </>
}

function SectionHead({ eyebrow, title, link, linkText }) {
  return <div className="section-head"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{link && <Link className="text-link" to={link}>{linkText} <ArrowRight size={15}/></Link>}</div>
}

function TreatmentCard({ t }) {
  return <Link className="treatment-card" to={`/treatments/${t.id}`}>
    <div className="card-image-wrap"><img src={t.image} alt={t.name}/><span>{t.category}</span></div>
    <div className="card-body"><h3>{t.name}</h3><p>{t.short}</p><div className="card-meta"><span>{minutes(t.duration)}</span><strong>{money(t.price)}</strong></div></div>
  </Link>
}

function Treatments() {
  const [category,setCategory] = useState('All')
  const cats = ['All', ...new Set(treatments.map(t => t.category))]
  const shown = category === 'All' ? treatments : treatments.filter(t => t.category === category)
  return <div className="page">
    <PageHero eyebrow="Treatments" title="Rituals for rest, release, and renewal." copy="Explore treatments by intention. Every service can be personalized around comfort, pressure, and focus areas." />
    <section className="section"><div className="container">
      <div className="filter-pills">{cats.map(c => <button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>
      <div className="treatment-grid all-grid">{shown.map(t => <TreatmentCard key={t.id} t={t}/>)}</div>
    </div></section>
  </div>
}

function TreatmentDetail() {
  const { id } = useParams()
  const t = treatments.find(x => x.id === id)
  if (!t) return <NotFound />
  return <div className="detail-page">
    <div className="detail-image"><img src={t.image} alt={t.name}/></div>
    <div className="detail-content">
      <p className="eyebrow">{t.category}</p><h1>{t.name}</h1><p className="detail-lead">{t.short}</p>
      <div className="detail-meta"><span><Clock3 size={17}/>{minutes(t.duration)}</span><span>{money(t.price)}</span></div>
      <div className="detail-rule"/>
      <h3>Designed to support</h3><ul className="benefit-list">{t.benefits.map(b => <li key={b}><Check size={16}/>{b}</li>)}</ul>
      <p className="muted-copy">Your therapist will begin with a short consultation to understand your preferences. Pressure, scent, temperature, and areas of focus can all be adjusted.</p>
      <Link className="btn btn-dark full-btn" to={`/booking?treatment=${t.id}`}>Book this treatment <ArrowRight size={16}/></Link>
      <Link className="text-link detail-back" to="/treatments">← Back to treatments</Link>
    </div>
  </div>
}

function Packages() {
  return <div className="page"><PageHero eyebrow="Spa packages" title="More time. Deeper restoration." copy="Layer treatments into one seamless experience, with thoughtful pauses and private relaxation time built in." />
    <section className="section"><div className="container package-list">{packages.map((p,i)=><article className="package-row" key={p.id}>
      <img src={p.image} alt={p.name}/><div><span className="package-num">0{i+1}</span><p className="eyebrow">Curated ritual</p><h2>{p.name}</h2><p>{p.description}</p><div className="meta-row"><span><Clock3 size={16}/>{minutes(p.duration)}</span><strong>{money(p.price)}</strong></div><Link className="btn btn-outline" to={`/booking?package=${p.id}`}>Reserve package</Link></div>
    </article>)}</div></section>
  </div>
}

function About() {
  return <div className="page"><PageHero eyebrow="About Aurelia" title="Care that gives you permission to slow down." copy="Aurelia was imagined as a softer kind of luxury: less performance, more presence." />
    <section className="section"><div className="container story-grid"><div className="story-image"/><div><p className="eyebrow">Our point of view</p><h2>Wellness should feel personal, not prescribed.</h2><p>We created Aurelia around a simple idea: rest works best when it feels safe, unhurried, and made for the person receiving it.</p><p>That means calm spaces, clear communication, skilled therapists, quality products, and enough time between appointments to never make a guest feel rushed.</p><div className="value-stack">{[['01','Considered care'],['02','Quiet luxury'],['03','Skilled touch'],['04','Thoughtful pacing']].map(x=><div key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong></div>)}</div></div></div></section>
    <section className="section section-soft"><div className="container promise-grid"><div><ShieldCheck/><h3>Private & respectful</h3><p>Your comfort, boundaries, and preferences guide every treatment.</p></div><div><Leaf/><h3>Thoughtfully selected</h3><p>Products and aromatics are chosen for sensory quality and treatment fit.</p></div><div><Heart/><h3>Warm, never clinical</h3><p>High standards delivered with human warmth rather than formality.</p></div></div></section>
  </div>
}

function Gallery() {
  return <div className="page"><PageHero eyebrow="Gallery" title="A little calm, before you arrive." copy="Warm textures, soft light, and quiet rooms designed to make the transition from outside to inside feel immediate." />
    <section className="section"><div className="container masonry">{gallery.map((src,i)=><img key={src} className={i%3===1?'tall':''} src={src} alt={`Aurelia spa gallery ${i+1}`}/>)}</div></section>
  </div>
}

const faqs = [
  ['How early should I arrive?','We recommend arriving 15 minutes before your first visit, and 10 minutes before returning appointments.'],
  ['What should I wear?','Come in whatever feels comfortable. For body treatments, your therapist will explain draping and privacy before the ritual begins.'],
  ['Can I request a therapist?','Yes. You can note a preference during booking. We will do our best to accommodate it based on availability.'],
  ['What is your cancellation policy?','Appointments may be cancelled or moved up to 24 hours before the scheduled time. Late cancellations may be subject to a service fee.'],
  ['Can I book if I am pregnant?','Please contact us before booking so we can recommend appropriate treatments and timing for you.'],
  ['Do you offer gift cards?','Yes. Digital Aurelia gift cards can be purchased online and redeemed toward treatments or packages.']
]
function FAQ(){ const [open,setOpen]=useState(0); return <div className="page"><PageHero eyebrow="Frequently asked" title="Everything you may want to know before your visit." copy="If your question is not here, send us a note and our guest team will help." /><section className="section"><div className="container faq-wrap">{faqs.map(([q,a],i)=><div className="faq-item" key={q}><button onClick={()=>setOpen(open===i?-1:i)}><span>{q}</span><ChevronDown className={open===i?'rot':''}/></button>{open===i && <p>{a}</p>}</div>)}</div></section></div> }

function Contact() {
  const [form,setForm]=useState({name:'',email:'',phone:'',message:''}), [status,setStatus]=useState('')
  async function submit(e){e.preventDefault();setStatus('sending');await api.sendContact(form);setStatus('sent');setForm({name:'',email:'',phone:'',message:''})}
  return <div className="page"><PageHero eyebrow="Visit & contact" title="We would love to welcome you." copy="Questions about treatments, accessibility, group visits, or special requests? Our guest team is here to help." />
    <section className="section"><div className="container contact-grid"><div className="contact-details">
      <div><MapPin/><span><small>Location</small>General Trias, Cavite<br/>Philippines</span></div><div><Clock3/><span><small>Hours</small>Daily · 10:00 AM–9:00 PM</span></div><div><Phone/><span><small>Phone</small>+63 917 555 0148</span></div><div><Mail/><span><small>Email</small>hello@aureliaspa.ph</span></div>
      <div className="contact-photo"/>
    </div><form className="form-card" onSubmit={submit}><p className="eyebrow">Send a note</p><h2>How can we help?</h2><Field label="Name" value={form.name} onChange={v=>setForm({...form,name:v})} required/><Field label="Email" type="email" value={form.email} onChange={v=>setForm({...form,email:v})} required/><Field label="Phone" value={form.phone} onChange={v=>setForm({...form,phone:v})}/><label className="field"><span>Message</span><textarea rows="5" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required/></label><button className="btn btn-dark full-btn" disabled={status==='sending'}>{status==='sending'?'Sending…':'Send message'}</button>{status==='sent'&&<p className="success"><Check size={16}/> Message received. Our guest team will get back to you.</p>}</form></div></section>
  </div>
}

function GiftCards(){
  const [amount,setAmount]=useState(3000), [form,setForm]=useState({recipient:'',email:'',from:'',message:''}), [status,setStatus]=useState(null), [loading,setLoading]=useState(false)
  async function purchase(e){e.preventDefault();setLoading(true);const card=await api.purchaseGiftCard({...form,amount:Number(amount)});setStatus(card);setLoading(false)}
  if(status) return <div className="confirmation-page"><div className="confirmation-card"><div className="success-icon"><Gift/></div><p className="eyebrow">Gift card created</p><h1>A little restoration, ready to give.</h1><p>Your Aurelia gift card has been created and is ready to share.</p><div className="confirmation-code">{status.code}</div><div className="summary-lines"><span>Value <strong>{money(status.amount)}</strong></span><span>Recipient <strong>{status.recipient}</strong></span></div><Link className="btn btn-dark" to="/">Return home</Link></div></div>
  return <div className="page"><PageHero eyebrow="Gift cards" title="Give someone time to feel like themselves again." copy="Digital Aurelia gift cards can be used toward any treatment or package." /><section className="section"><div className="container gift-grid"><div className="gift-visual"><div><span>AURELIA</span><small>SPA & WELLNESS</small><p>A gift of quiet time.</p></div></div><form className="form-card" onSubmit={purchase}><h2>Create your gift</h2><label className="field"><span>Gift amount</span><select value={amount} onChange={e=>setAmount(e.target.value)}>{[2000,3000,5000,7500,10000].map(n=><option key={n} value={n}>{money(n)}</option>)}</select></label><Field label="Recipient name" value={form.recipient} onChange={v=>setForm({...form,recipient:v})} required/><Field label="Recipient email" type="email" value={form.email} onChange={v=>setForm({...form,email:v})} required/><Field label="From" value={form.from} onChange={v=>setForm({...form,from:v})} required/><label className="field"><span>Message</span><textarea rows="4" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></label><button className="btn btn-dark full-btn" disabled={loading}>{loading?'Creating gift card…':'Create gift card'}</button><p className="form-note">Digital delivery · Redeemable toward any Aurelia ritual.</p></form></div></section></div>
}

function Booking(){
  const [params] = useSearchParams(), nav=useNavigate()
  const initialTreatment = params.get('treatment') || ''
  const initialPackage = params.get('package') || ''
  const [step,setStep]=useState(1), [kind,setKind]=useState(initialPackage?'package':'treatment'), [choice,setChoice]=useState(initialTreatment||initialPackage)
  const [date,setDate]=useState(''), [time,setTime]=useState(''), [form,setForm]=useState({name:'',email:'',phone:'',notes:'',therapist:'No preference'}), [loading,setLoading]=useState(false), [booking,setBooking]=useState(null)
  const options = kind==='treatment'?treatments:packages
  const selected=options.find(x=>x.id===choice)
  const times=['10:00 AM','11:30 AM','1:00 PM','2:30 PM','4:00 PM','5:30 PM','7:00 PM']
  const minDate=new Date(Date.now()+86400000).toISOString().slice(0,10)
  function next(){ if(step===1&&!choice)return; if(step===2&&(!date||!time))return; setStep(s=>Math.min(4,s+1)); window.scrollTo({top:0,behavior:'smooth'}) }
  async function confirm(){setLoading(true);const data=await api.createBooking({type:kind,itemId:selected.id,itemName:selected.name,price:selected.price,duration:selected.duration,date,time,...form});setBooking(data);setLoading(false);setStep(5);window.scrollTo({top:0,behavior:'smooth'})}
  if(step===5&&booking) return <div className="confirmation-page"><div className="confirmation-card"><div className="success-icon"><Check/></div><p className="eyebrow">Booking confirmed</p><h1>Your quiet time is reserved.</h1><p>Your confirmation is saved for <strong>{booking.email}</strong>.</p><div className="confirmation-code">{booking.confirmation}</div><div className="summary-lines"><span>Ritual <strong>{booking.itemName}</strong></span><span>Date <strong>{booking.date}</strong></span><span>Time <strong>{booking.time}</strong></span><span>Total <strong>{money(booking.price)}</strong></span></div><div className="confirmation-actions"><Link className="btn btn-dark" to={`/account?email=${encodeURIComponent(booking.email)}`}>View my booking</Link><Link className="text-link" to="/">Return home</Link></div></div></div>
  return <div className="booking-page"><div className="booking-top"><Link className="brand" to="/"><span className="brand-mark">A</span><span>AURELIA <small>SPA & WELLNESS</small></span></Link><span>Secure appointment booking</span></div><div className="booking-shell">
    <div className="booking-main"><div className="progress"><span>Step {Math.min(step,4)} of 4</span><div><i style={{width:`${step*25}%`}}/></div></div>
      {step===1&&<div className="booking-step"><p className="eyebrow">Choose your ritual</p><h1>What would you like to book?</h1><div className="kind-toggle"><button className={kind==='treatment'?'active':''} onClick={()=>{setKind('treatment');setChoice('')}}>Treatments</button><button className={kind==='package'?'active':''} onClick={()=>{setKind('package');setChoice('')}}>Packages</button></div><div className="booking-options">{options.map(o=><button key={o.id} className={choice===o.id?'selected':''} onClick={()=>setChoice(o.id)}><div><strong>{o.name}</strong><span>{minutes(o.duration)} · {money(o.price)}</span></div>{choice===o.id?<Check/>:<ArrowRight/>}</button>)}</div></div>}
      {step===2&&<div className="booking-step"><p className="eyebrow">Date & time</p><h1>When would you like to visit?</h1><label className="field"><span>Select a date</span><input type="date" min={minDate} value={date} onChange={e=>{setDate(e.target.value);setTime('')}}/></label>{date&&<><span className="field-label">Available times</span><div className="time-grid">{times.map((t,i)=><button key={t} disabled={(new Date(date).getDate()+i)%7===0} className={time===t?'selected':''} onClick={()=>setTime(t)}>{t}</button>)}</div><p className="availability-note"><Sparkles size={15}/> Availability updates automatically for your selected date.</p></>}</div>}
      {step===3&&<div className="booking-step"><p className="eyebrow">Your details</p><h1>Who is the appointment for?</h1><div className="form-grid"><Field label="Full name" value={form.name} onChange={v=>setForm({...form,name:v})} required/><Field label="Email" type="email" value={form.email} onChange={v=>setForm({...form,email:v})} required/><Field label="Mobile number" value={form.phone} onChange={v=>setForm({...form,phone:v})} required/><label className="field"><span>Therapist preference</span><select value={form.therapist} onChange={e=>setForm({...form,therapist:e.target.value})}><option>No preference</option><option>Female therapist preferred</option><option>Male therapist preferred</option></select></label><label className="field full"><span>Notes or requests</span><textarea rows="4" placeholder="Pressure preference, focus areas, accessibility needs…" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></label></div></div>}
      {step===4&&<div className="booking-step"><p className="eyebrow">Review</p><h1>Everything look right?</h1><div className="review-booking"><div><small>Ritual</small><strong>{selected?.name}</strong><button onClick={()=>setStep(1)}>Change</button></div><div><small>Date & time</small><strong>{date} · {time}</strong><button onClick={()=>setStep(2)}>Change</button></div><div><small>Guest</small><strong>{form.name}<br/>{form.email}<br/>{form.phone}</strong><button onClick={()=>setStep(3)}>Change</button></div></div><div className="policy-box"><ShieldCheck/><p><strong>Booking policy</strong><br/>Appointments can be moved or cancelled up to 24 hours before the scheduled time. Please arrive 10–15 minutes early.</p></div></div>}
      <div className="booking-controls">{step>1&&<button className="btn btn-outline" onClick={()=>setStep(s=>s-1)}>Back</button>}<button className="btn btn-dark" disabled={(step===1&&!choice)||(step===2&&(!date||!time))||(step===3&&(!form.name||!form.email||!form.phone))||loading} onClick={step===4?confirm:next}>{loading?'Confirming…':step===4?`Confirm booking · ${money(selected?.price||0)}`:'Continue'} <ArrowRight size={16}/></button></div>
    </div>
    <aside className="booking-aside"><p className="eyebrow">Your visit</p>{selected?<><div className="aside-image" style={{backgroundImage:`url(${selected.image})`}}/><h3>{selected.name}</h3><div className="aside-line"><span>Duration</span><strong>{minutes(selected.duration)}</strong></div>{date&&<div className="aside-line"><span>Date</span><strong>{date}</strong></div>}{time&&<div className="aside-line"><span>Time</span><strong>{time}</strong></div>}<div className="aside-total"><span>Total</span><strong>{money(selected.price)}</strong></div></>:<p className="muted-copy">Choose a treatment or package to see your visit summary.</p>}</aside>
  </div></div>
}

function Account(){
  const [params]=useSearchParams(); const [email,setEmail]=useState(params.get('email')||''), [lookup,setLookup]=useState(params.get('email')||''), [bookings,setBookings]=useState([]), [loading,setLoading]=useState(false), [message,setMessage]=useState('')
  async function search(e){if(e)e.preventDefault(); if(!email)return; setLoading(true);setMessage('');const rows=await api.getBookings(email);setBookings(rows);setLookup(email);setLoading(false)}
  useEffect(()=>{if(params.get('email')) search()},[]) // eslint-disable-line
  async function cancel(id){setMessage('Cancelling appointment…');await api.cancelBooking(id);const rows=await api.getBookings(lookup);setBookings(rows);setMessage('Appointment cancelled.')}
  return <div className="page"><PageHero eyebrow="My bookings" title="Your Aurelia visits, in one place." copy="Enter the email used during booking to view and manage your upcoming appointments." /><section className="section"><div className="container account-wrap"><form className="lookup-form" onSubmit={search}><Field label="Booking email" type="email" value={email} onChange={setEmail} required/><button className="btn btn-dark" disabled={loading}>{loading?'Looking up…':'Find my bookings'} <Search size={16}/></button></form>{message&&<p className="account-message">{message}</p>}{lookup&&!loading&&bookings.length===0&&<div className="empty-state"><CalendarDays/><h3>No bookings found</h3><p>No appointments are connected to {lookup}.</p><Link className="btn btn-outline" to="/booking">Make a booking</Link></div>}{bookings.length>0&&<div className="booking-history">{bookings.map(b=><article key={b.id}><div><span className={`status ${b.status}`}>{b.status}</span><p className="eyebrow">{b.confirmation}</p><h3>{b.itemName}</h3><p>{b.date} · {b.time} · {minutes(b.duration)}</p></div><div className="history-right"><strong>{money(b.price)}</strong>{b.status==='confirmed'&&<button onClick={()=>cancel(b.id)}>Cancel booking</button>}</div></article>)}</div>}</div></section></div>
}

function Field({label,type='text',value,onChange,required=false}){return <label className="field"><span>{label}</span><input type={type} value={value} onChange={e=>onChange(e.target.value)} required={required}/></label>}
function PageHero({eyebrow,title,copy}){return <section className="page-hero"><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div></section>}
function NotFound(){return <div className="not-found"><h1>We couldn’t find that page.</h1><Link className="btn btn-dark" to="/">Return home</Link></div>}

function Footer(){
  const [email,setEmail]=useState(''),[status,setStatus]=useState('')
  async function sub(e){e.preventDefault();if(!email)return;setStatus('loading');await api.subscribeNewsletter(email);setStatus('done');setEmail('')}
  return <footer className="footer"><div className="container footer-grid"><div><Link className="brand footer-brand" to="/"><span className="brand-mark">A</span><span>AURELIA <small>SPA & WELLNESS</small></span></Link><p>A quieter approach to modern wellness, created for unhurried restoration.</p></div><div><h4>Explore</h4><Link to="/treatments">Treatments</Link><Link to="/packages">Packages</Link><Link to="/gift-cards">Gift cards</Link><Link to="/gallery">Gallery</Link></div><div><h4>Visit</h4><Link to="/about">About</Link><Link to="/faq">FAQ</Link><Link to="/contact">Contact</Link><Link to="/account">My bookings</Link></div><div><h4>Notes from Aurelia</h4><p>Occasional wellness notes, new rituals, and seasonal offers.</p><form className="newsletter" onSubmit={sub}><input type="email" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} required/><button aria-label="Subscribe"><ArrowRight/></button></form>{status==='done'&&<small className="footer-success">You’re on the list.</small>}</div></div><div className="container footer-bottom"><span>© 2026 Aurelia Spa & Wellness</span><span>Privacy · Terms · Booking policy</span></div></footer>
}
function MobileBookingBar(){ const { pathname } = useLocation(); if (pathname === '/booking') return null; return <div className="mobile-booking"><Link to="/booking">Book an appointment</Link></div>}

export default App
