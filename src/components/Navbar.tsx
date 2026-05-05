import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'UniGrow Brand', href: '#unigrow' },
  { label: 'Global Network', href: '#network' },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(
        '.menu-link',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      )
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollToSection = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#0B1215]/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="section-padding flex items-center justify-between">
          <a href="#" className="flex items-center gap-3" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/images/logo.png" alt="United Grow" className="h-10 w-auto" />
            <span className="hidden md:block text-[#F6FFF7] text-sm font-medium tracking-wide">
              United Grow Hydroponics
            </span>
          </a>

          <div className="flex items-center gap-6">
            <a
              href="tel:+212728431924"
              className="hidden lg:flex items-center gap-2 text-[#D4AF37] text-sm hover:text-[#F6FFF7] transition-colors"
            >
              <Phone size={14} />
              <span className="label-text">+212 728-431924</span>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex items-center justify-center text-[#F6FFF7] hover:text-[#D4AF37] transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0B1215] transition-all duration-700 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="h-full flex flex-col lg:flex-row">
          {/* Left side - Navigation */}
          <div className="flex-1 flex flex-col justify-center section-padding pt-24 lg:pt-0">
            <nav className="space-y-4 lg:space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="menu-link block text-left text-4xl lg:text-6xl font-light text-[#F6FFF7] hover:text-[#D4AF37] transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right side - Contact info */}
          <div className="lg:w-[400px] bg-[#0f1a1d] section-padding py-8 lg:py-0 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <p className="label-text text-[#D4AF37] mb-4">Contact</p>
                <div className="space-y-3 text-sm text-[#D7D7D7]">
                  <p>info@ughydroponics.com</p>
                  <p>www.ughydroponics.com</p>
                </div>
              </div>

              <div>
                <p className="label-text text-[#D4AF37] mb-4">Offices</p>
                <div className="space-y-3 text-sm text-[#D7D7D7]">
                  <div>
                    <p className="text-[#F6FFF7] font-medium">Morocco (HQ)</p>
                    <p>Casablanca</p>
                    <p className="text-[#D4AF37]">+212 728-431924</p>
                  </div>
                  <div>
                    <p className="text-[#F6FFF7] font-medium">Netherlands</p>
                    <p>EU Operations</p>
                  </div>
                  <div>
                    <p className="text-[#F6FFF7] font-medium">UAE</p>
                    <p>Middle East Hub</p>
                  </div>
                  <div>
                    <p className="text-[#F6FFF7] font-medium">India / Sri Lanka / Philippines</p>
                    <p>Manufacturing Units</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => scrollToSection('#contact')}
                className="pill-btn-outline w-full"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
