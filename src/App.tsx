import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Route, Routes, useLocation } from 'react-router'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import SolutionsGrid from './sections/SolutionsGrid'
import UniGrowProducts from './sections/UniGrowProducts'
import GlobalNetwork from './sections/GlobalNetwork'
import Infrastructure from './sections/Infrastructure'
import LeadershipContact from './sections/LeadershipContact'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)
  const { pathname } = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => {
      clearTimeout(timer)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useLayoutEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  return (
    <div className="relative">
      {loading && <Loader />}
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero animationDelay={loading ? 2.8 : 0} />
              <SolutionsGrid />
              <UniGrowProducts />
              <GlobalNetwork />
              <Infrastructure />
              <LeadershipContact />
            </main>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}
