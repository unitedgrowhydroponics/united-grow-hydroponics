import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Package, Droplets, FlaskConical, Ruler, Ship, FileDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PRODUCT_CATALOGUE_PDF = '/product-catalogue.pdf'
/** URL-safe name (ampersand in filenames often serves index.html instead of the PDF on static hosts) */
const PRODUCT_CATALOGUE_EXPORT_GUIDE_PDF = '/product-catalogue-export-guide.pdf'

/* ─────────────── PRODUCT DATA ─────────────── */

const cocopeatBlocks = {
  title: 'Cocopeat Blocks',
  subtitle: 'Compressed & Ready for Export',
  description: 'Our premium cocopeat blocks are manufactured from 100% natural coconut coir pith, meticulously washed and buffered to achieve optimal EC and pH levels. Compressed at a 5:1 ratio for cost-efficient shipping and storage, each block expands to 65–80 liters of high-quality growing medium upon hydration.',
  variants: [
    {
      name: '5kg Low EC Block (Washed & Buffered)',
      specs: [
        { label: 'Dimensions (Compressed)', value: '30 × 30 × 10–12 cm' },
        { label: 'Weight', value: '5 kg (± 200g)' },
        { label: 'EC (1:3 extract)', value: '< 0.5 mS/cm' },
        { label: 'pH (1:3 extract)', value: '5.8 – 6.8' },
        { label: 'Expansion Volume', value: '65 – 80 liters per block' },
        { label: 'Compression Ratio', value: '5:1' },
        { label: 'Moisture Content', value: '10 – 15%' },
        { label: 'Fiber Content', value: '< 5%' },
        { label: 'Sand Content', value: '< 5%' },
        { label: 'Colour', value: 'Natural Brown' },
      ],
      packing: [
        { label: 'Pallet Load', value: '~220 blocks per pallet' },
        { label: '40ft HC Container (Palletized)', value: '~24 MT (~4,800 blocks)' },
        { label: '40ft HC Container (Bulk)', value: '~26 MT (~5,200 blocks)' },
        { label: '20ft Container', value: '~12.5 MT (~2,500 blocks)' },
      ],
      applications: ['Seed Germination', 'Soil Amendment', 'Potting Mix Base', 'Hydroponic Systems', 'Nursery Production', 'Export Agriculture'],
    },
    {
      name: '5kg High EC Block (Unwashed)',
      specs: [
        { label: 'Dimensions (Compressed)', value: '30 × 30 × 10–12 cm' },
        { label: 'Weight', value: '5 kg (± 200g)' },
        { label: 'EC (1:3 extract)', value: '< 4.0 mS/cm' },
        { label: 'pH (1:3 extract)', value: '5.8 – 6.8' },
        { label: 'Expansion Volume', value: '65 – 70 liters per block' },
        { label: 'Compression Ratio', value: '5:1' },
        { label: 'Moisture Content', value: '10 – 15%' },
        { label: 'Fiber Content', value: '< 5%' },
        { label: 'Sand Content', value: '< 5%' },
        { label: 'Colour', value: 'Natural Brown' },
      ],
      packing: [
        { label: 'Pallet Load', value: '~220 blocks per pallet' },
        { label: '40ft HC Container (Palletized)', value: '~24 MT' },
        { label: '40ft HC Container (Bulk)', value: '~26 MT' },
        { label: 'Bundle Packing', value: '4 blocks per bundle, 1,300 bundles' },
      ],
      applications: ['Large-Scale Agriculture', 'Soil Conditioning', 'Composting', 'Custom Blending', 'Bulk Horticulture'],
    },
    {
      name: '650g Brick (Low EC)',
      specs: [
        { label: 'Dimensions (Compressed)', value: '20 × 10 × 5 cm' },
        { label: 'Weight', value: '650g (± 3%)' },
        { label: 'EC (1:3 extract)', value: '< 0.5 mS/cm' },
        { label: 'pH (1:3 extract)', value: '5.8 – 6.8' },
        { label: 'Expansion Volume', value: '8 – 9 liters per brick' },
        { label: 'Compression Ratio', value: '3.3:1' },
        { label: 'Moisture Content', value: '10 – 15%' },
        { label: 'Fiber Content', value: '< 5%' },
        { label: 'Grade', value: 'Fine / Standard / Coarse' },
        { label: 'Colour', value: 'Natural Brown' },
      ],
      packing: [
        { label: 'Carton Packing', value: 'Available' },
        { label: 'Bulk Packing', value: 'Available' },
        { label: 'Custom Private Label', value: 'Available (MOQ applies)' },
      ],
      applications: ['Home Gardening', 'Retail Packaging', 'Nursery Seedlings', 'Small-Scale Hydroponics', 'Soilless Mix'],
    },
  ],
  grades: ['Fine Grade (0–6mm sieve)', 'Standard Grade (0–8mm sieve)', 'Coarse Grade (Unsieved)'],
}

const growBags = {
  title: 'Crop-Specific Grow Bags',
  subtitle: 'Engineered Slabs for Professional Hydroponics',
  description: 'UniGrow grow bags are precision-manufactured coco substrate slabs encased in UV-stabilized poly sleeves (inner black / outer white, 2+ years UV rating). Each bag is formulated with crop-specific blends of cocopeat and husk chips to deliver the ideal air-filled porosity and water holding capacity for maximum yield.',
  commonSpecs: [
    { label: 'EC (1:5 extract)', value: '< 0.5 – 1.0 mS/cm (Low EC option available)' },
    { label: 'pH (1:5 extract)', value: '5.5 – 6.5 (Buffered)' },
    { label: 'Air-Filled Porosity', value: '20 – 33% (blend-dependent)' },
    { label: 'Water Holding Capacity', value: '5.5 – 6.75 L/kg' },
    { label: 'Organic Matter', value: '95 – 98% by weight' },
    { label: 'UV Treatment', value: '2+ years (Inner Black / Outer White)' },
    { label: 'Plant Holes', value: 'Pre-cut, Custom patterns available' },
    { label: 'Drain Holes', value: 'Pre-cut slits at base' },
    { label: 'Private Label', value: 'OEM Branding Available' },
  ],
  cropVariants: [
    {
      crop: 'Tomato',
      icon: '🍅',
      blend: '40% Coco Peat / 60% Coco Chips (SP Red)',
      bagSize: '100 × 20 × 15 cm (30L expanded)',
      plantsPerSlab: '2 – 3 plants',
      schedule: 'Drip irrigation 4–6x daily',
      notes: 'Higher chip ratio provides excellent drainage and aeration for deep root systems. Pre-cut dripper holes and planting cuts included.',
      image: '/images/feature-ph-ec.jpg',
    },
    {
      crop: 'Cucumber',
      icon: '🥒',
      blend: '50% Coco Peat / 50% Coco Chips',
      bagSize: '100 × 20 × 10 cm (20L expanded)',
      plantsPerSlab: '2 – 3 plants',
      schedule: 'Drip irrigation 3–5x daily',
      notes: 'Balanced blend optimizes moisture retention for cucumbers\' high water demand. Train vines vertically for airflow.',
      image: '/images/solution-hydroponic.jpg',
    },
    {
      crop: 'Capsicum (Bell Pepper)',
      icon: '🫑',
      blend: '50% Coco Peat / 50% Coco Chips',
      bagSize: '100 × 18 × 12 cm (21.6L expanded)',
      plantsPerSlab: '2 plants per slab',
      schedule: 'Drip irrigation 3–4x daily',
      notes: 'Well-drained mix prevents salt buildup. Monitor EC closely — capsicum is sensitive to salinity. Blossom end rot prevention built in.',
      image: '/images/hardware-growbags.jpg',
    },
    {
      crop: 'Strawberry',
      icon: '🍓',
      blend: '60% Coco Peat / 40% Coco Chips (ST Green)',
      bagSize: '100 × 15 × 10 cm (15L expanded)',
      plantsPerSlab: '4 – 6 plants',
      schedule: 'Drip irrigation 2–4x daily',
      notes: 'Higher peat content retains more moisture for shallow strawberry roots. Elevated AFP ensures oxygen delivery to crown.',
      image: '/images/feature-custom.jpg',
    },
  ],
  standardSizes: [
    { size: '100 × 15 × 8 cm', volume: '12.0 L', mix: '60/40 Peat/Chip' },
    { size: '100 × 18 × 8 cm', volume: '14.4 L', mix: '50/50 Peat/Chip' },
    { size: '100 × 20 × 10 cm', volume: '20.0 L', mix: '50/50 Peat/Chip' },
    { size: '100 × 20 × 12 cm', volume: '24.0 L', mix: '40/60 Peat/Chip' },
    { size: '100 × 20 × 15 cm', volume: '30.0 L', mix: '40/60 Peat/Chip' },
    { size: '100 × 24 × 8 cm', volume: '19.2 L', mix: 'Custom' },
    { size: '90 × 15 × 10 cm', volume: '13.5 L', mix: '60/40 Peat/Chip' },
    { size: '90 × 20 × 10 cm', volume: '18.0 L', mix: '50/50 Peat/Chip' },
  ],
}

const openTopBags = {
  title: 'Open Top Grow Bags',
  subtitle: 'Ready-to-Use Upright Growing Containers',
  description: 'UniGrow Open Top Grow Bags are self-contained, upright growing units with compressed substrate inside a UV-stabilized expandable bag. Simply hydrate and plant — no additional pots required. Available in multiple gallon sizes with custom peat-to-chip ratios for any crop or climate.',
  specs: [
    { label: 'Material', value: '100% Coco Peat + Coco Chips blend' },
    { label: 'EC', value: '< 0.5 – 1.0 mS/cm (Low EC available)' },
    { label: 'pH', value: '5.5 – 6.8 (Buffered & Washed)' },
    { label: 'Water Holding Capacity', value: '4.5 – 6.75 L/kg' },
    { label: 'Air Filled Porosity', value: '28 – 33% (V/V)' },
    { label: 'Organic Matter', value: '95 – 98% by weight' },
    { label: 'Compression Ratio', value: '5:1' },
    { label: 'UV Bag Rating', value: '2 – 3 years' },
    { label: 'Biodegradable', value: 'Yes' },
    { label: 'OMRI Listed', value: 'Available on request' },
  ],
  sizes: [
    { gallon: '1 Gal', dryDim: '21 × 17.5 × 6 cm', wetDim: '15 × 15 × 15 cm', weight: '0.4 kg', volume: '3.8 L' },
    { gallon: '2 Gal', dryDim: '21 × 17.5 × 6 cm', wetDim: '25 × 20 × 23 cm', weight: '0.8 kg', volume: '7.6 L' },
    { gallon: '3 Gal', dryDim: '24 × 19 × 6.5 cm', wetDim: '25 × 20 × 28 cm', weight: '1.28 kg', volume: '11.4 L' },
    { gallon: '5 Gal', dryDim: '29 × 24 × 7 cm', wetDim: '30 × 25 × 25 cm', weight: '2.08 kg', volume: '19.0 L' },
    { gallon: '6 Gal', dryDim: '30 × 30 × 7 cm', wetDim: '30 × 30 × 27 cm', weight: '2.4 kg', volume: '22.7 L' },
    { gallon: '8 Gal', dryDim: '30 × 30 × 8 cm', wetDim: '30 × 30 × 30 cm', weight: '2.7 kg', volume: '30.3 L' },
    { gallon: '10 Gal', dryDim: '30 × 30 × 10 cm', wetDim: '30 × 30 × 42 cm', weight: '3.8 kg', volume: '37.9 L' },
  ],
  mixOptions: [
    { ratio: '70/30', peat: '70%', chips: '25%', fiber: '3%', crush: '2%', whc: '6.75 L/kg', afp: '10.1%', bestFor: 'High moisture crops' },
    { ratio: '60/40', peat: '60%', chips: '35%', fiber: '3%', crush: '2%', whc: '6.0 L/kg', afp: '15–18%', bestFor: 'Balanced crops' },
    { ratio: '50/50', peat: '50%', chips: '45%', fiber: '3%', crush: '2%', whc: '5.5 L/kg', afp: '20–22%', bestFor: 'Tomato, Cucumber' },
    { ratio: '40/60', peat: '40%', chips: '55%', fiber: '3%', crush: '2%', whc: '5.0 L/kg', afp: '22–25%', bestFor: 'High aeration crops' },
    { ratio: '30/70', peat: '30%', chips: '65%', fiber: '3%', crush: '2%', whc: '4.5 L/kg', afp: '28–33%', bestFor: 'Orchids, Speciality' },
  ],
}

const cocoChips = {
  title: 'Coco Chips / Husk Cubes',
  subtitle: 'Premium Aeration Media for Specialty Crops',
  description: 'UniGrow Coco Chips are precision-cut slices and cubes from coconut husk, graded by size for specific applications. With exceptional aeration, drainage, and longevity, they are the ideal replacement for bark-based media in orchid cultivation, Anthurium, Bromeliads, and high-drainage hydroponic systems.',
  specs: [
    { label: 'Material', value: '100% Coconut Husk' },
    { label: 'EC (1:5 extract)', value: '< 500 μS/cm (Customizable)' },
    { label: 'pH', value: '5.5 – 6.5' },
    { label: 'Moisture', value: '< 20%' },
    { label: 'Compression Ratio', value: '5:1' },
    { label: 'Organic Matter', value: '> 95%' },
    { label: 'Longevity', value: '3 – 5 years (vs. 1–2 for bark)' },
    { label: 'Biodegradable', value: 'Yes' },
    { label: 'Pathogen Free', value: 'Yes — steam treated' },
    { label: 'Weed Free', value: 'Yes' },
  ],
  grades: [
    { grade: 'SSS / Super Small', size: '1/16 – 1/8 inch (1.5 – 3mm)', use: 'Seed starting, fine orchid mixes, propagation' },
    { grade: 'SS / Small', size: '1/8 – 1/4 inch (3 – 6mm)', use: 'Orchid seedlings, Anthurium, fine-rooted plants' },
    { grade: 'S / Small-Medium', size: '1/4 – 3/8 inch (6 – 10mm)', use: 'Standard orchid mixes, potting blends' },
    { grade: 'M / Medium', size: '3/8 – 1/2 inch (10 – 12mm)', use: 'Orchids, Bromeliads, general horticulture' },
    { grade: 'L / Large', size: '1/2 – 3/4 inch (12 – 20mm)', use: 'Large specimen orchids, Cattleya, Vanda' },
    { grade: 'XL / Extra Large', size: '3/4 – 1+ inch (20 – 25mm)', use: 'Drainage layer, large container base, decorative mulch' },
  ],
  packing: [
    { format: 'Loose Bag', qty: '10 L / 25 L / 50 L', load: '3,000 bags per 20ft container' },
    { format: 'Compressed Block', qty: '5kg blocks', load: 'Standard cocopeat block loading' },
    { format: 'Bulk Loose', qty: 'By cubic meter', load: 'Container/truckload' },
  ],
}

/* ─────────────── COMPONENT ─────────────── */

export default function UniGrowProducts() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeProduct, setActiveProduct] = useState<'blocks' | 'growbags' | 'opentop' | 'chips'>('blocks')
  const [activeBlockVariant, setActiveBlockVariant] = useState(0)
  const [activeChipGrade, setActiveChipGrade] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.products-header', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.products-header', start: 'top 85%' },
      })
      gsap.fromTo('.product-nav-btn', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: '.product-nav', start: 'top 90%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const tabs = [
    { key: 'blocks' as const, label: 'Cocopeat Blocks', icon: Package },
    { key: 'growbags' as const, label: 'Grow Bags', icon: Package },
    { key: 'opentop' as const, label: 'Open Top Bags', icon: Package },
    { key: 'chips' as const, label: 'Coco Chips', icon: Package },
  ]

  return (
    <section id="unigrow" ref={sectionRef} className="py-24 md:py-32 bg-[#0B1215]">
      <div className="section-padding">
        {/* Header */}
        <div className="products-header text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src="/images/logo.png" alt="UniGrow" className="h-14 w-auto opacity-80" />
          </div>
          <p className="label-text text-[#D4AF37] mb-4">UniGrow Product Line</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#F6FFF7] leading-tight max-w-4xl mx-auto mb-6">
            Engineered Growing Media — <span className="text-[#D4AF37]">Technical Excellence</span>
          </h2>
          <p className="text-[#D7D7D7] max-w-3xl mx-auto text-base md:text-lg">
            Every UniGrow product is manufactured under strict quality control, with batch-tested EC and pH,
            customizable blends, and full export documentation. From substrate to harvest — precision at every layer.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3">
            <a
              href={PRODUCT_CATALOGUE_PDF}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] text-sm font-medium tracking-wide hover:bg-[#D4AF37]/10 transition-colors"
            >
              <FileDown size={18} aria-hidden />
              Download product catalogue
            </a>
            <a
              href={PRODUCT_CATALOGUE_EXPORT_GUIDE_PDF}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] text-sm font-medium tracking-wide hover:bg-[#D4AF37]/10 transition-colors"
            >
              <FileDown size={18} aria-hidden />
              Download catalogue &amp; export guide
            </a>
          </div>
        </div>

        {/* Core Quality Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: FlaskConical, label: 'EC', value: '< 0.5 mS/cm', sub: 'Washed & Buffered' },
            { icon: Droplets, label: 'pH', value: '5.5 – 6.8', sub: 'Stable & Buffered' },
            { icon: Ruler, label: 'Compression', value: '5:1 Ratio', sub: 'Efficient Shipping' },
            { icon: Ship, label: 'Export Ready', value: 'FCL / LCL', sub: 'Phytosanitary Certs' },
          ].map((item) => (
            <div key={item.label} className="glass-card p-5 text-center hover:border-[#D4AF37]/40 transition-colors">
              <item.icon size={22} className="text-[#D4AF37] mx-auto mb-2" />
              <p className="text-[#F6FFF7] font-medium text-sm">{item.value}</p>
              <p className="text-[#D4AF37] text-xs mb-1">{item.label}</p>
              <p className="text-[#D7D7D7]/60 text-[11px]">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Product Navigation */}
        <div className="product-nav flex flex-wrap gap-3 mb-12 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveProduct(tab.key)}
              className={`product-nav-btn px-6 py-3 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                activeProduct === tab.key
                  ? 'bg-[#D4AF37] text-[#0B1215]'
                  : 'border border-white/20 text-[#D7D7D7] hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─────────── COCOPEAT BLOCKS ─────────── */}
        {activeProduct === 'blocks' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
              <div>
                <h3 className="text-2xl md:text-3xl font-medium text-[#F6FFF7] mb-2">{cocopeatBlocks.title}</h3>
                <p className="text-[#D4AF37] text-sm mb-4">{cocopeatBlocks.subtitle}</p>
                <p className="text-[#D7D7D7] mb-6 leading-relaxed">{cocopeatBlocks.description}</p>
                <div className="mb-6">
                  <p className="label-text text-[#D4AF37] mb-3">Available Grades</p>
                  <div className="flex flex-wrap gap-2">
                    {cocopeatBlocks.grades.map((g) => (
                      <span key={g} className="px-3 py-1.5 text-xs rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">{g}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[10px] overflow-hidden">
                  <img src="/images/product-blocks-hero.jpg" alt="UniGrow Cocopeat Blocks" className="w-full h-64 object-cover" />
                </div>
                <div className="rounded-[10px] overflow-hidden mt-4">
                  <img src="/images/product-blocks-detail.jpg" alt="UniGrow Block Expansion" className="w-full h-52 object-cover" />
                </div>
              </div>
              <div>
                {/* Variant Selector */}
                <div className="flex gap-2 mb-6">
                  {cocopeatBlocks.variants.map((v, i) => (
                    <button
                      key={v.name}
                      onClick={() => setActiveBlockVariant(i)}
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                        activeBlockVariant === i
                          ? 'bg-[#D4AF37] text-[#0B1215]'
                          : 'bg-white/5 text-[#D7D7D7] hover:bg-white/10'
                      }`}
                    >
                      {v.name.includes('650g') ? '650g Brick' : v.name.includes('High') ? '5kg High EC' : '5kg Low EC'}
                    </button>
                  ))}
                </div>
                {/* Specs Table */}
                {cocopeatBlocks.variants[activeBlockVariant] && (
                  <div className="space-y-6">
                    <div className="glass-card p-6">
                      <h4 className="text-[#F6FFF7] font-medium mb-4 flex items-center gap-2">
                        <FlaskConical size={16} className="text-[#D4AF37]" />
                        Technical Specifications
                      </h4>
                      <div className="space-y-2.5">
                        {cocopeatBlocks.variants[activeBlockVariant].specs.map((s) => (
                          <div key={s.label} className="flex justify-between items-start gap-4 py-2 border-b border-white/5">
                            <span className="text-[#D7D7D7] text-sm">{s.label}</span>
                            <span className="text-[#F6FFF7] text-sm font-medium text-right">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="glass-card p-6">
                      <h4 className="text-[#F6FFF7] font-medium mb-4 flex items-center gap-2">
                        <Ship size={16} className="text-[#D4AF37]" />
                        Packing & Loading
                      </h4>
                      <div className="space-y-2.5">
                        {cocopeatBlocks.variants[activeBlockVariant].packing.map((p) => (
                          <div key={p.label} className="flex justify-between items-start gap-4 py-2 border-b border-white/5">
                            <span className="text-[#D7D7D7] text-sm">{p.label}</span>
                            <span className="text-[#F6FFF7] text-sm font-medium text-right">{p.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cocopeatBlocks.variants[activeBlockVariant].applications.map((a) => (
                        <span key={a} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                          <Check size={12} /> {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ─────────── GROW BAGS ─────────── */}
        {activeProduct === 'growbags' && (
          <div className="animate-fade-in space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-2xl md:text-3xl font-medium text-[#F6FFF7] mb-2">{growBags.title}</h3>
                <p className="text-[#D4AF37] text-sm mb-4">{growBags.subtitle}</p>
                <p className="text-[#D7D7D7] mb-8 leading-relaxed">{growBags.description}</p>
                {/* Common Specs */}
                <div className="glass-card p-6 mb-8">
                  <h4 className="text-[#F6FFF7] font-medium mb-4">Universal Specifications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
                    {growBags.commonSpecs.map((s) => (
                      <div key={s.label} className="flex justify-between items-start gap-3 py-2 border-b border-white/5">
                        <span className="text-[#D7D7D7] text-sm">{s.label}</span>
                        <span className="text-[#F6FFF7] text-sm font-medium text-right">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Standard Sizes Table */}
                <div className="glass-card p-6">
                  <h4 className="text-[#F6FFF7] font-medium mb-4">Standard Size Chart</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-[#D4AF37] text-left border-b border-[#D4AF37]/30">
                          <th className="pb-3 pr-4 font-medium">Dimensions (cm)</th>
                          <th className="pb-3 pr-4 font-medium">Volume</th>
                          <th className="pb-3 font-medium">Standard Mix</th>
                        </tr>
                      </thead>
                      <tbody>
                        {growBags.standardSizes.map((row, i) => (
                          <tr key={i} className="border-b border-white/5 text-[#D7D7D7]">
                            <td className="py-2.5 pr-4">{row.size}</td>
                            <td className="py-2.5 pr-4 text-[#F6FFF7]">{row.volume}</td>
                            <td className="py-2.5">{row.mix}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-[10px] overflow-hidden">
                  <img src="/images/product-growbags.jpg" alt="UniGrow Grow Bags" className="w-full h-56 object-cover" />
                </div>
                <div className="rounded-[10px] overflow-hidden">
                  <img src="/images/product-growbag-detail.jpg" alt="UniGrow Grow Bag Cross Section" className="w-full h-48 object-cover" />
                </div>
              </div>
            </div>
            {/* Crop-Specific Cards */}
            <div>
              <p className="label-text text-[#D4AF37] mb-6">Crop-Specific Formulations</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {growBags.cropVariants.map((crop) => (
                  <div key={crop.crop} className="glass-card p-6 hover:border-[#D4AF37]/40 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{crop.icon}</span>
                      <h4 className="text-lg font-medium text-[#F6FFF7]">{crop.crop} Grow Bag</h4>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-[#D7D7D7]">Blend</span>
                        <span className="text-[#F6FFF7] font-medium text-right">{crop.blend}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-[#D7D7D7]">Bag Size</span>
                        <span className="text-[#F6FFF7] font-medium text-right">{crop.bagSize}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-[#D7D7D7]">Plants per Slab</span>
                        <span className="text-[#F6FFF7] font-medium text-right">{crop.plantsPerSlab}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-[#D7D7D7]">Irrigation</span>
                        <span className="text-[#F6FFF7] font-medium text-right">{crop.schedule}</span>
                      </div>
                      <p className="text-[#D7D7D7]/70 text-xs mt-3 pt-3 border-t border-white/5">{crop.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─────────── OPEN TOP BAGS ─────────── */}
        {activeProduct === 'opentop' && (
          <div className="animate-fade-in space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl md:text-3xl font-medium text-[#F6FFF7] mb-2">{openTopBags.title}</h3>
                <p className="text-[#D4AF37] text-sm mb-4">{openTopBags.subtitle}</p>
                <p className="text-[#D7D7D7] mb-8 leading-relaxed">{openTopBags.description}</p>
                <div className="glass-card p-6">
                  <h4 className="text-[#F6FFF7] font-medium mb-4">Technical Specifications</h4>
                  <div className="space-y-2.5">
                    {openTopBags.specs.map((s) => (
                      <div key={s.label} className="flex justify-between items-start gap-4 py-2 border-b border-white/5">
                        <span className="text-[#D7D7D7] text-sm">{s.label}</span>
                        <span className="text-[#F6FFF7] text-sm font-medium text-right">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-[10px] overflow-hidden">
                <img src="/images/product-opentop.jpg" alt="UniGrow Open Top Bags" className="w-full h-full object-cover min-h-[400px]" />
              </div>
            </div>
            {/* Size Chart */}
            <div className="glass-card p-6 md:p-8">
              <h4 className="text-[#F6FFF7] font-medium mb-6 flex items-center gap-2">
                <Ruler size={16} className="text-[#D4AF37]" />
                Size Chart — Dry vs. Hydrated Dimensions
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[#D4AF37] text-left border-b border-[#D4AF37]/30">
                      <th className="pb-3 pr-4 font-medium">Size</th>
                      <th className="pb-3 pr-4 font-medium">Dry Dimensions</th>
                      <th className="pb-3 pr-4 font-medium">Hydrated Dimensions</th>
                      <th className="pb-3 pr-4 font-medium">Dry Weight</th>
                      <th className="pb-3 font-medium">Expanded Vol.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openTopBags.sizes.map((row) => (
                      <tr key={row.gallon} className="border-b border-white/5 text-[#D7D7D7]">
                        <td className="py-3 pr-4 text-[#F6FFF7] font-medium">{row.gallon}</td>
                        <td className="py-3 pr-4">{row.dryDim}</td>
                        <td className="py-3 pr-4">{row.wetDim}</td>
                        <td className="py-3 pr-4">{row.weight}</td>
                        <td className="py-3">{row.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Mix Options */}
            <div>
              <h4 className="text-[#F6FFF7] font-medium mb-4 flex items-center gap-2">
                <FlaskConical size={16} className="text-[#D4AF37]" />
                Custom Blend Options
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {openTopBags.mixOptions.map((mix) => (
                  <div key={mix.ratio} className="glass-card p-5 hover:border-[#D4AF37]/40 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#D4AF37] font-bold text-lg">{mix.ratio}</span>
                      <span className="text-[#D7D7D7]/60 text-xs">Peat / Chip</span>
                    </div>
                    <div className="space-y-1.5 text-sm text-[#D7D7D7]">
                      <p>Peat: <span className="text-[#F6FFF7]">{mix.peat}</span></p>
                      <p>Chips: <span className="text-[#F6FFF7]">{mix.chips}</span></p>
                      <p>Fiber: <span className="text-[#F6FFF7]">{mix.fiber}</span></p>
                      <p>WHC: <span className="text-[#F6FFF7]">{mix.whc}</span></p>
                      <p>AFP: <span className="text-[#F6FFF7]">{mix.afp}</span></p>
                    </div>
                    <p className="text-[#D4AF37] text-xs mt-3 pt-3 border-t border-white/5">Best for: {mix.bestFor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─────────── COCO CHIPS ─────────── */}
        {activeProduct === 'chips' && (
          <div className="animate-fade-in space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl md:text-3xl font-medium text-[#F6FFF7] mb-2">{cocoChips.title}</h3>
                <p className="text-[#D4AF37] text-sm mb-4">{cocoChips.subtitle}</p>
                <p className="text-[#D7D7D7] mb-8 leading-relaxed">{cocoChips.description}</p>
                <div className="glass-card p-6">
                  <h4 className="text-[#F6FFF7] font-medium mb-4">Technical Specifications</h4>
                  <div className="space-y-2.5">
                    {cocoChips.specs.map((s) => (
                      <div key={s.label} className="flex justify-between items-start gap-4 py-2 border-b border-white/5">
                        <span className="text-[#D7D7D7] text-sm">{s.label}</span>
                        <span className="text-[#F6FFF7] text-sm font-medium text-right">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-[10px] overflow-hidden">
                  <img src="/images/product-chips.jpg" alt="UniGrow Coco Chips" className="w-full h-56 object-cover" />
                </div>
                {/* Grade Selector */}
                <div className="glass-card p-6">
                  <h4 className="text-[#F6FFF7] font-medium mb-4">Grade Selection</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cocoChips.grades.map((g, i) => (
                      <button
                        key={g.grade}
                        onClick={() => setActiveChipGrade(i)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          activeChipGrade === i
                            ? 'bg-[#D4AF37] text-[#0B1215]'
                            : 'bg-white/5 text-[#D7D7D7] hover:bg-white/10'
                        }`}
                      >
                        {g.grade}
                      </button>
                    ))}
                  </div>
                  <div className="glass-card p-4 bg-white/5">
                    <p className="text-[#D4AF37] text-sm font-medium mb-1">{cocoChips.grades[activeChipGrade].grade}</p>
                    <p className="text-[#F6FFF7] text-sm mb-1">Size: {cocoChips.grades[activeChipGrade].size}</p>
                    <p className="text-[#D7D7D7] text-xs">{cocoChips.grades[activeChipGrade].use}</p>
                  </div>
                </div>
                {/* Packing */}
                <div className="glass-card p-6">
                  <h4 className="text-[#F6FFF7] font-medium mb-4 flex items-center gap-2">
                    <Ship size={16} className="text-[#D4AF37]" />
                    Packing & Shipping
                  </h4>
                  <div className="space-y-2.5">
                    {cocoChips.packing.map((p) => (
                      <div key={p.format} className="flex justify-between items-start gap-4 py-2 border-b border-white/5">
                        <span className="text-[#D7D7D7] text-sm">{p.format} ({p.qty})</span>
                        <span className="text-[#F6FFF7] text-sm font-medium text-right">{p.load}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* OEM / Customization CTA */}
        <div className="mt-16 glass-card p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-medium text-[#F6FFF7] mb-4">
            Need <span className="text-[#D4AF37]">Custom Formulations</span>?
          </h3>
          <p className="text-[#D7D7D7] max-w-2xl mx-auto mb-8">
            UniGrow offers full OEM private labeling, crop-specific blend development, custom bag dimensions,
            and branded packaging. Our R&D team works with your agronomists to develop the perfect substrate
            for your climate, crop, and irrigation system.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['OEM Private Label', 'Custom Blends', 'Crop-Specific R&D', 'Branded Packaging', 'Phytosanitary Docs'].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm border border-[#D4AF37]/20">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
