import { Brain, List, TrendingUp, Hash, Globe, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"

const features = [
  {
    icon: Brain,
    title: '"Style-DNA" embeddings',
    description: "Deep learning models capture unique writing patterns and voice",
  },
  {
    icon: List,
    title: "Hooks library (list-builder)",
    description: "Curated collection of proven attention-grabbing openers",
  },
  {
    icon: TrendingUp,
    title: "Viral score predictor",
    description: "AI-powered engagement prediction before you post",
  },
  {
    icon: Hash,
    title: "Auto-hashtags & CTAs",
    description: "Smart suggestions for maximum reach and conversions",
  },
  {
    icon: Globe,
    title: "Multiplatform tones",
    description: "Optimize for X/Threads, Instagram, TikTok, and more",
  },
  {
    icon: Calendar,
    title: "Scheduler & queue",
    description: "Plan and automate your content calendar",
  },
]

export function Features() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 sm:text-5xl">Powerful features for creators</h2>
          <p className="text-xl text-muted-foreground">Everything you need to scale your content</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-card border-border hover:border-accent/50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 mb-4">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
