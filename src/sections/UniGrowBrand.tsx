import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: 'Low EC & Stable pH',
    description: 'Washed and buffered cocopeat with optimal electrical conductivity and pH balance for superior crop performance.',
    image: '/images/feature-ph-ec.jpg',
  },
  {
    title: 'High Water Retention',
    description: 'Advanced fiber structure ensures exceptional water holding capacity while maintaining excellent drainage and root oxygenation.',
    image: '/images/feature-water.jpg',
  },
  {
    title: 'Custom Crop Blends',
    description: 'Crop-specific formulations for tomato, cucumber, capsicum, and strawberry with pre-cut planting holes and UV stabilization.',
    image: '/images/feature-custom.jpg',
  },
]

export default function UniGrowBrand() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.fromTo(
        '.unigrow-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.unigrow-header',
            start: 'top 85%',
          },
        }
      )

      // Precision line reveal
      const lines = document.querySelectorAll('.reveal-line')
      gsap.set(lines, { scaleX: 0 })

      lines.forEach((line, i) => {
        const direction = i % 2 === 0 ? 1 : -1
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.reveal-wrapper',
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: true,
          },
        })

        tl.to(line, {
          scaleX: direction,
          duration: 1,
        }).to(
          line,
          {
            clipPath: `inset(0 ${direction > 0 ? '100%' : '0'} 0 ${direction > 0 ? '0' : '100%'})`,
            duration: 1,
          },
          i * 0.1
        )
      })

      // Feature cards entrance
      gsap.fromTo(
        '.feature-card-wrapper',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.features-container',
            start: 'top 80%',
          },
        }
      )

      // Product categories
      gsap.fromTo(
        '.product-category',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.product-categories',
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="unigrow"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#0B1215]"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="unigrow-header text-center mb-16 md:mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src="/images/logo.png" alt="UniGrow" className="h-12 w-auto opacity-80" />
          </div>
          <p className="label-text text-[#D4AF37] mb-4">The Engineered Substrate</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#F6FFF7] leading-tight max-w-4xl mx-auto mb-6">
            Premium Growing Media for{' '}
            <span className="text-[#D4AF37]">Maximum Yield</span>
          </h2>
          <p className="text-[#D7D7D7] max-w-2xl mx-auto">
            UniGrow is the flagship brand of United Grow Hydroponics, developed for
            high-performance growing media solutions tailored for international markets.
          </p>
        </div>

        {/* Precision Line Reveal */}
        <div className="reveal-wrapper text-3xl md:text-5xl lg:text-6xl text-center mb-20 md:mb-28 py-8">
          <div className="reveal-cover">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="reveal-line"
                style={{
                  top: `${(i / 6) * 100}%`,
                  height: `${100 / 6}%`,
                }}
              />
            ))}
          </div>
          <div className="reveal-text">
            ENGINEERED FOR
            <br />
            GLOBAL AGRICULTURE
          </div>
        </div>

        {/* Feature Cards */}
        <div className="features-container mb-20">
          <p className="label-text text-[#D4AF37] mb-8 text-center">Technical Advantages</p>
          <div className="feature-carousel">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card-wrapper feature-card group cursor-pointer">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1215] via-[#0B1215]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-medium text-[#F6FFF7] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#D7D7D7] opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-md">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Categories */}
        <div className="product-categories">
          <p className="label-text text-[#D4AF37] mb-8 text-center">Product Range</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Cocopeat Blocks',
                desc: '5kg compressed blocks, high expansion ratio, ideal for export & bulk use',
                icon: '🧱',
              },
              {
                title: 'Grow Bags',
                desc: 'Crop-specific bags for tomato, cucumber, capsicum & strawberry',
                icon: '🌱',
              },
              {
                title: 'Open Top Bags',
                desc: 'Ideal for hydroponics with easy root development & high drainage',
                icon: '🪴',
              },
              {
                title: 'Coco Chips',
                desc: 'High aeration chips for orchids & specialty crop usage',
                icon: '🌴',
              },
            ].map((product) => (
              <div
                key={product.title}
                className="product-category glass-card p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group"
              >
                <span className="text-3xl mb-4 block">{product.icon}</span>
                <h4 className="text-lg font-medium text-[#F6FFF7] mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {product.title}
                </h4>
                <p className="text-sm text-[#D7D7D7]">{product.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
