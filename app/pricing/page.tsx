import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PricingCards } from "@/components/pricing-cards"

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 sm:text-6xl text-balance">Simple, transparent pricing</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Choose the plan that fits your content creation needs
            </p>
          </div>

          <PricingCards />

          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
