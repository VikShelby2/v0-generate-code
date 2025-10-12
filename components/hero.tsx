import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-6xl font-bold leading-tight tracking-tight text-balance sm:text-7xl lg:text-8xl">
            Clone any creator's writing style. Post like them in minutes.
          </h1>

          <p className="mt-6 text-xl text-muted-foreground text-balance sm:text-2xl">
            Paste a handle → we learn the tone, hooks, and cadence → generate viral threads, captions, and scripts.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="rounded-full px-8 text-base" asChild>
              <Link href="/app">
                Generate your first post free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="rounded-full px-8 text-base" asChild>
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>

          <div className="mt-16">
            <p className="text-sm text-muted-foreground mb-6">Used by 1,000+ creators & agencies</p>
            <div className="flex items-center justify-center gap-8 flex-wrap opacity-50">
              <div className="text-2xl font-bold">Klarna</div>
              <div className="text-2xl font-bold">Harvey</div>
              <div className="text-2xl font-bold">OSCAR</div>
              <div className="text-2xl font-bold">SUPERHUMAN</div>
              <div className="text-2xl font-bold">Salesforce</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
