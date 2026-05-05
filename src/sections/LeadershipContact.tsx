import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, Globe, Send } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

const leaders = [
  {
    name: 'Sreeram Yuvarajan',
    title: 'Director – Global Expansion & Strategy',
    image: '/images/leader-sreeram.jpg',
    expertise: ['International Sourcing', 'Hydroponic Systems', 'Agri-Business Strategy'],
  },
  {
    name: 'S. Vijayakumar',
    title: 'Managing Director',
    image: '/images/leader-vijayakumar.png',
    expertise: ['Hydroponics', 'Growing Media', 'Agri-Tech Specialist'],
  },
  {
    name: 'Issam Berrhazi',
    title: 'Director – International Business & Strategy',
    image: '/images/leader-issam.jpg',
    expertise: ['International Business', 'Hydroponic Consulting', 'Project Development'],
  },
]

export default function LeadershipContact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    inquiryType: 'Products',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.leadership-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        '.leader-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.leaders-grid',
            start: 'top 85%',
          },
        }
      )

      gsap.fromTo(
        '.contact-form-container',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-container',
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#0B1215]"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="leadership-header text-center mb-16 md:mb-20">
          <p className="label-text text-[#D4AF37] mb-4">Our Team</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#F6FFF7] leading-tight max-w-3xl mx-auto">
            Leadership & <span className="text-[#D4AF37]">Contact</span>
          </h2>
        </div>

        {/* Leadership Cards */}
        <div className="leaders-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="leader-card glass-card overflow-hidden group hover:border-[#D4AF37]/50 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1215] via-[#0B1215]/30 to-transparent" />
              </div>
              <div className="p-6 -mt-12 relative">
                <h3 className="text-xl font-medium text-[#F6FFF7] mb-1">
                  {leader.name}
                </h3>
                <p className="text-[#D4AF37] text-sm mb-4">{leader.title}</p>
                <div className="flex flex-wrap gap-2">
                  {leader.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs rounded-full border border-[#D4AF37]/30 text-[#D7D7D7]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="contact-form-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl md:text-3xl font-normal text-[#F6FFF7] mb-6">
              Get In <span className="text-[#D4AF37]">Touch</span>
            </h3>
            <p className="text-[#D7D7D7] mb-8">
              Ready to start your hydroponic project or discuss distribution opportunities?
              Reach out to our team for a consultation.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-[#F6FFF7] font-medium mb-1">Email</p>
                  <p className="text-[#D7D7D7] text-sm">info@ughydroponics.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-[#F6FFF7] font-medium mb-1">Phone</p>
                  <div className="text-[#D7D7D7] text-sm space-y-1">
                    <p>+212 728-431924 (Morocco)</p>
                    <p>+91 8610253876 (India)</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                  <Globe size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-[#F6FFF7] font-medium mb-1">Website</p>
                  <p className="text-[#D7D7D7] text-sm">www.ughydroponics.com</p>
                </div>
              </div>
            </div>

            {/* Partnership CTA */}
            <div className="glass-card p-6">
              <p className="label-text text-[#D4AF37] mb-3">Partnership Program</p>
              <p className="text-[#D7D7D7] text-sm mb-4">
                We are actively looking for country distributors, importers, project developers,
                and government partners worldwide.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Exclusive Territories', 'Private Labeling', 'Technical Support', 'Marketing Support'].map(
                  (offer) => (
                    <span
                      key={offer}
                      className="px-3 py-1 text-xs rounded-full bg-[#D4AF37]/10 text-[#D4AF37]"
                    >
                      {offer}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-4">
                  <Send size={24} className="text-[#D4AF37]" />
                </div>
                <h4 className="text-xl font-medium text-[#F6FFF7] mb-2">
                  Message Sent!
                </h4>
                <p className="text-[#D7D7D7]">
                  Thank you for reaching out. Our team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label-text text-[#D7D7D7] mb-2 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#2D2D2D] border border-white/10 rounded-lg text-[#F6FFF7] placeholder:text-[#D7D7D7]/50 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="label-text text-[#D7D7D7] mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#2D2D2D] border border-white/10 rounded-lg text-[#F6FFF7] placeholder:text-[#D7D7D7]/50 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="label-text text-[#D7D7D7] mb-2 block">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#2D2D2D] border border-white/10 rounded-lg text-[#F6FFF7] placeholder:text-[#D7D7D7]/50 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    placeholder="Your country"
                  />
                </div>

                <div>
                  <label className="label-text text-[#D7D7D7] mb-2 block">
                    Inquiry Type
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#2D2D2D] border border-white/10 rounded-lg text-[#F6FFF7] focus:border-[#D4AF37] focus:outline-none transition-colors"
                  >
                    <option value="Products">Products</option>
                    <option value="Projects">Projects</option>
                    <option value="Distribution">Distribution</option>
                  </select>
                </div>

                <div>
                  <label className="label-text text-[#D7D7D7] mb-2 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-[#2D2D2D] border border-white/10 rounded-lg text-[#F6FFF7] placeholder:text-[#D7D7D7]/50 focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                <button type="submit" className="pill-btn-solid w-full">
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/212601700202"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse-gold"
        aria-label="Contact on WhatsApp"
      >
        <SiWhatsapp size={26} className="text-white" />
      </a>
    </section>
  )
}
