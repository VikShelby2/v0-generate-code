import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Steps } from "@/components/steps"
import { Features } from "@/components/features"
import { SocialProof } from "@/components/social-proof"
import { ResponsibleUse } from "@/components/responsible-use"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Steps />
        <Features />
        <SocialProof />
        <ResponsibleUse />
      </main>
      <Footer />
    </div>
  )
}
