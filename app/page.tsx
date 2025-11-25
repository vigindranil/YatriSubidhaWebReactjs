"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { About } from "@/components/about"
import { AboutICP } from "@/components/about-icp"

export default function Home() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-slate-50">
      <Navigation onLoginClick={() => setShowLogin(true)} />
      {!showLogin ? (
        <>
          <Hero onGetStarted={() => setShowLogin(true)} />
          <Features />
          <About />
          <AboutICP />
          <HowItWorks />
          <Footer />
        </>
      ) : (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
    </main>
  )
}
