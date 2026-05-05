import { Leaf, Factory } from 'lucide-react'
import { Link } from 'react-router'

const sitemap = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'UniGrow Brand', href: '#unigrow' },
  { label: 'Global Network', href: '#network' },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Contact', href: '#contact' },
]

const languages = ['EN', 'FR', 'AR', 'NL']

export default function Footer() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0B1215] border-t border-white/5">
      {/* Main Footer */}
      <div className="section-padding py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Big typography */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#F6FFF7] leading-tight mb-8">
              Growing a<br />
              <span className="text-[#D4AF37]">Sustainable</span><br />
              Future
            </h2>
            <Link to="/" className="inline-flex items-center gap-4 mb-8">
              <img src="/images/logo.png" alt="United Grow" className="h-16 w-auto" />
            </Link>
            <p className="text-[#D7D7D7] max-w-md">
              United Grow Hydroponics S.A.R.L — From Source to Sustainable Farming.
              Delivering premium hydroponic solutions and UniGrow cocopeat substrates worldwide.
            </p>
          </div>

          {/* Right - Links & Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {/* Sitemap */}
            <div>
              <p className="label-text text-[#D4AF37] mb-6">Sitemap</p>
              <nav className="space-y-3">
                {sitemap.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-[#D7D7D7] hover:text-[#D4AF37] transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Manufacturing */}
            <div>
              <p className="label-text text-[#D4AF37] mb-6 flex items-center gap-2">
                <Factory size={14} />
                Manufacturing
              </p>
              <div className="space-y-3 mb-8">
                {['India', 'Sri Lanka', 'Philippines', 'Vietnam'].map((country) => (
                  <div key={country} className="flex items-center gap-2 text-[#D7D7D7] text-sm">
                    <Leaf size={12} className="text-[#D4AF37]" />
                    {country}
                  </div>
                ))}
              </div>

              {/* Languages */}
              <p className="label-text text-[#D4AF37] mb-4">Languages</p>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                      lang === 'EN'
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                        : 'border-white/20 text-[#D7D7D7] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="section-padding py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#D7D7D7]/60 text-xs">
            © {new Date().getFullYear()} United Grow Hydroponics S.A.R.L. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#D7D7D7]/60">
            <Link to="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-[#D4AF37] transition-colors">
              Terms of Service
            </Link>
            <span>Casablanca, Morocco</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
