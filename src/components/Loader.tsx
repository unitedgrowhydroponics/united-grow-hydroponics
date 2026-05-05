import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Loader() {
  const [count, setCount] = useState(0)
  const loaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(obj.val)),
    })

    gsap.to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.6,
      delay: 2.2,
      ease: 'power3.in',
    })

    gsap.to(loaderRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 2.4,
      ease: 'power3.in',
      onComplete: () => {
        if (loaderRef.current) {
          loaderRef.current.style.display = 'none'
        }
      },
    })
  }, [])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] bg-[#0B1215] flex flex-col items-center justify-center"
    >
      <div ref={textRef} className="text-center">
        <div className="text-[#D4AF37] font-bold text-7xl md:text-9xl tracking-tighter mb-4">
          {count}
        </div>
        <div className="label-text text-[#F6FFF7]/60 tracking-[4px]">
          United Grow Hydroponics S.A.R.L
        </div>
      </div>
    </div>
  )
}
