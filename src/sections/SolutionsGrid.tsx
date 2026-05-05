import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const solutions = [
  {
    title: 'Hydroponic Systems',
    description: 'NFT, DWC, Vertical & Custom Systems',
    image: '/images/solution-hydroponic.jpg',
  },
  {
    title: 'UniGrow Cocopeat',
    description: 'Premium Engineered Growing Media',
    image: '/images/product-blocks-hero.jpg',
  },
  {
    title: 'Greenhouse Projects',
    description: 'Polyhouse & Shade Net Structures',
    image: '/images/solution-greenhouse.jpg',
  },
  {
    title: 'Irrigation & Fertigation',
    description: 'Precision Water & Nutrient Delivery',
    image: '/images/solution-irrigation.jpg',
  },
  {
    title: 'Export & Logistics',
    description: 'End-to-End Global Shipping',
    image: '/images/solution-export.jpg',
  },
  {
    title: 'Agri Consulting',
    description: 'Expert Farm Design & Planning',
    image: '/images/solution-consulting.jpg',
  },
]

export default function SolutionsGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.solutions-title',
        { y: 60, opacity: 0 },
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
        '.solution-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.solutions-grid',
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#F6FFF7]"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="solutions-title text-center mb-16 md:mb-20">
          <p className="label-text text-[#D4AF37] mb-4">Our Expertise</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#0B1215] leading-tight max-w-3xl mx-auto">
            End-to-End Solutions,{' '}
            <span className="text-[#D4AF37]">From Seed to Harvest</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="solutions-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className="solution-card group relative overflow-hidden rounded-[10px] cursor-pointer"
              style={{ aspectRatio: '4/3' }}
            >
              {/* Image */}
              <img
                src={solution.image}
                alt={solution.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1215]/90 via-[#0B1215]/30 to-transparent" />

              {/* Gold accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="label-text text-[#D4AF37] mb-2 block">
                  0{index + 1}
                </span>
                <h3 className="text-xl md:text-2xl font-medium text-[#F6FFF7] mb-2">
                  {solution.title}
                </h3>
                <p className="text-sm text-[#D7D7D7]">{solution.description}</p>
              </div>

              {/* Hover icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-[#F6FFF7]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-[#D4AF37]">
                <span className="text-[#D4AF37] text-lg">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
