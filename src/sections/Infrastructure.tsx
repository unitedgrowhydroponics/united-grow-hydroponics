import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Wind, Thermometer, Waves, Package } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const hardware = [
  {
    title: 'Cooling Pads & Fans',
    description: 'Evaporative cooling systems for optimal temperature control in arid climates',
    image: '/images/hardware-cooling.jpg',
    icon: Wind,
  },
  {
    title: 'Climate Control',
    description: 'Automated temperature, humidity, and CO2 management systems',
    image: '/images/hardware-climate.jpg',
    icon: Thermometer,
  },
  {
    title: 'NFT Channels',
    description: 'Precision-engineered nutrient film technique channels for leafy greens',
    image: '/images/hardware-nft.jpg',
    icon: Waves,
  },
  {
    title: 'Grow Bags',
    description: 'UV-stabilized cocopeat grow bags for vine crops and vegetables',
    image: '/images/hardware-growbags.jpg',
    icon: Package,
  },
]

const turnkeySteps = [
  'Site Analysis',
  'Design & Engineering',
  'Material Supply',
  'Installation',
  'Crop Planning',
  'Training',
]

export default function Infrastructure() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.infra-header',
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
        '.infra-showcase',
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.infra-showcase',
            start: 'top 85%',
          },
        }
      )

      gsap.fromTo(
        '.hardware-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.hardware-grid',
            start: 'top 85%',
          },
        }
      )

      gsap.fromTo(
        '.turnkey-step',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.turnkey-section',
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="infrastructure"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#F6FFF7]"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="infra-header text-center mb-16 md:mb-20">
          <p className="label-text text-[#D4AF37] mb-4">Infrastructure</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#0B1215] leading-tight max-w-4xl mx-auto">
            State-of-the-Art{' '}
            <span className="text-[#D4AF37]">Greenhouse Infrastructure</span>
          </h2>
        </div>

        {/* Showcase Image */}
        <div className="infra-showcase relative rounded-[10px] overflow-hidden mb-16" style={{ aspectRatio: '16/9' }}>
          <img
            src="/images/infrastructure-showcase.jpg"
            alt="Greenhouse infrastructure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1215]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-medium text-[#F6FFF7] mb-2">
              Turnkey Project Solutions
            </h3>
            <p className="text-[#D7D7D7] max-w-xl">
              From site analysis to crop training, we deliver complete greenhouse projects
              tailored to your climate, crop, and budget.
            </p>
          </div>
        </div>

        {/* Hardware Grid */}
        <div className="hardware-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {hardware.map((item) => (
            <div
              key={item.title}
              className="hardware-card group bg-white rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                    <item.icon size={16} className="text-[#D4AF37]" />
                  </div>
                  <h4 className="text-[#0B1215] font-medium">{item.title}</h4>
                </div>
                <p className="text-sm text-[#2D2D2D]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Turnkey Process */}
        <div className="turnkey-section bg-[#0B1215] rounded-[10px] p-8 md:p-12">
          <div className="text-center mb-10">
            <p className="label-text text-[#D4AF37] mb-3">Our Process</p>
            <h3 className="text-2xl md:text-3xl font-normal text-[#F6FFF7]">
              Turnkey Project Scope
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {turnkeySteps.map((step, index) => (
              <div
                key={step}
                className="turnkey-step text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-[#D4AF37]/30 flex items-center justify-center group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-all duration-300">
                  <span className="text-2xl font-light text-[#D4AF37]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-[#F6FFF7] text-sm font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
