import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

type HeroProps = {
  animationDelay?: number
}

export default function Hero({ animationDelay = 2.8 }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: animationDelay })

      tl.fromTo(
        '.hero-label',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo(
          '.hero-title',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-subtitle',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.hero-trust',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.hero-cta',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
          '-=0.2'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [animationDelay])

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Hydroponic greenhouse"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1215]/70 via-[#0B1215]/50 to-[#0B1215]" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center section-padding max-w-5xl mx-auto pt-24"
      >
        <p className="hero-label label-text text-[#D4AF37] mb-6 opacity-0">
          United Grow Hydroponics S.A.R.L
        </p>

        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#F6FFF7] leading-[1.1] tracking-tight mb-8 text-shadow-hero opacity-0">
          Global Hydroponics & Cocopeat Solutions{' '}
          <span className="text-[#D4AF37]">Engineered</span> for Sustainable Agriculture
        </h1>

        <p className="hero-subtitle text-lg md:text-xl text-[#D7D7D7] max-w-3xl mx-auto mb-6 opacity-0">
          United Grow Hydroponics S.A.R.L delivers advanced hydroponic systems, greenhouse
          solutions, and premium UniGrow cocopeat substrates to global markets.
        </p>

        <p className="hero-trust label-text text-[#F6FFF7]/70 mb-10 opacity-0">
          Manufacturing | Export | Turnkey Projects | Consulting
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button onClick={() => scrollToSection('#contact')} className="hero-cta pill-btn-outline opacity-0">
            Request a Quote
          </button>
          <button onClick={() => scrollToSection('#unigrow')} className="hero-cta text-[#F6FFF7] text-sm tracking-widest uppercase hover:text-[#D4AF37] transition-colors opacity-0 flex items-center gap-2">
            Explore UniGrow
            <span className="text-lg">→</span>
          </button>
        </div>

        {/* Key Metrics */}
        <div className="hero-cta mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-0">
          {[
            { value: '7+', label: 'Countries' },
            { value: '4', label: 'Manufacturing Units' },
            { value: 'Global', label: 'Export Markets' },
            { value: '100%', label: 'Hydroponics Focus' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-light text-[#D4AF37] mb-1">
                {stat.value}
              </div>
              <div className="label-text text-[#F6FFF7]/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="label-text text-[#F6FFF7]/60">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
      </div>
    </section>
  )
}
