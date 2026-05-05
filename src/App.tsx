import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })

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
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
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
