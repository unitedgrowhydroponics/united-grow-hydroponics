import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Factory } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const offices = [
  { city: 'Morocco', role: 'HQ', flag: '🇲🇦', x: 0.48, y: 0.32 },
  { city: 'Netherlands', role: 'EU Operations', flag: '🇳🇱', x: 0.5, y: 0.22 },
  { city: 'UAE', role: 'Middle East Hub', flag: '🇦🇪', x: 0.58, y: 0.35 },
  { city: 'India', role: 'Manufacturing', flag: '🇮🇳', x: 0.65, y: 0.4 },
  { city: 'Sri Lanka', role: 'Manufacturing', flag: '🇱🇰', x: 0.66, y: 0.48 },
  { city: 'Philippines', role: 'Manufacturing', flag: '🇵🇭', x: 0.78, y: 0.42 },
]

const manufacturing = ['India', 'Sri Lanka', 'Philippines', 'Vietnam']

export default function GlobalNetwork() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let time = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    // Node positions (normalized)
    const nodes = offices.map((o) => ({
      x: o.x * width,
      y: o.y * height,
      baseR: 4,
      pulseR: 0,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      time += 0.015

      // Draw connections
      const hq = nodes[0]
      nodes.forEach((node, i) => {
        if (i === 0) return
        const pulse = Math.sin(time * 2 + i) * 0.5 + 0.5
        ctx.beginPath()
        ctx.moveTo(hq.x, hq.y)
        ctx.lineTo(node.x, node.y)
        ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 + pulse * 0.25})`
        ctx.lineWidth = 1 + pulse * 1.5
        ctx.stroke()
      })

      // Draw secondary connections
      for (let i = 1; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
          if (dist < width * 0.25) {
            const pulse = Math.sin(time * 1.5 + i + j) * 0.5 + 0.5
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.05 + pulse * 0.1})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time * 2 + i * 0.8) * 0.5 + 0.5
        const r = node.baseR + pulse * 6

        // Outer glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 3)
        gradient.addColorStop(0, `rgba(212, 175, 55, ${0.3 + pulse * 0.2})`)
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)')
        ctx.beginPath()
        ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.baseR, 0, Math.PI * 2)
        ctx.fillStyle = '#D4AF37'
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.network-header',
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
        '.office-card',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.office-list',
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        '.manufacturing-badge',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.manufacturing-section',
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="network"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0B1215] overflow-hidden"
    >
      {/* Canvas Background */}
      <div className="absolute inset-0 opacity-60">
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* World map decorative overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23D4AF37' stroke-width='0.5' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 section-padding">
        {/* Header */}
        <div className="network-header text-center mb-16 md:mb-20">
          <p className="label-text text-[#D4AF37] mb-4">Our Reach</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#F6FFF7] leading-tight max-w-3xl mx-auto">
            Global Presence,{' '}
            <span className="text-[#D4AF37]">Local Manufacturing</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Office Cards */}
          <div className="office-list lg:w-[380px] space-y-4">
            {offices.map((office) => (
              <div
                key={office.city}
                className="office-card glass-card p-4 flex items-center gap-4 hover:border-[#D4AF37]/50 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                  <MapPin size={18} className="text-[#D4AF37]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{office.flag}</span>
                    <h4 className="text-[#F6FFF7] font-medium">{office.city}</h4>
                  </div>
                  <p className="text-sm text-[#D7D7D7]">{office.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right content */}
          <div className="flex-1">
            <div className="glass-card p-8 mb-8">
              <h3 className="text-2xl font-medium text-[#F6FFF7] mb-4">
                Why Our Network Matters
              </h3>
              <div className="space-y-4 text-[#D7D7D7]">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                  <p>Direct factory sourcing from 4 manufacturing countries</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                  <p>Reduced cost advantage through local production</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                  <p>Faster delivery timelines with regional distribution hubs</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                  <p>End-to-end export handling including documentation and customs</p>
                </div>
              </div>
            </div>

            {/* Manufacturing badges */}
            <div className="manufacturing-section">
              <p className="label-text text-[#D4AF37] mb-4 flex items-center gap-2">
                <Factory size={14} />
                Manufacturing Units
              </p>
              <div className="flex flex-wrap gap-3">
                {manufacturing.map((country) => (
                  <span
                    key={country}
                    className="manufacturing-badge px-4 py-2 rounded-full border border-[#D4AF37]/30 text-[#F6FFF7] text-sm hover:bg-[#D4AF37]/10 transition-colors"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>

            {/* Export markets */}
            <div className="mt-8 glass-card p-6">
              <p className="label-text text-[#D4AF37] mb-4">Export Markets</p>
              <div className="grid grid-cols-2 gap-4">
                {['Europe', 'Middle East', 'Africa', 'Asia'].map((market) => (
                  <div key={market} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    <span className="text-[#D7D7D7] text-sm">{market}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
