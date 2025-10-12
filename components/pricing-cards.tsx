import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out StoryCloner",
    features: [
      "1 clone",
      "3 generations per day",
      "Basic style training",
      "Watermark tag on posts",
      "Community support",
    ],
    cta: "Start free",
    href: "/app",
    popular: false,
  },
  {
    name: "Creator+",
    price: "$9",
    period: "per month",
    description: "For serious content creators",
    features: [
      "Unlimited clones",
      "Unlimited generations",
      "Advanced style training",
      "Viral score predictor",
      "Content scheduler",
      "No watermark",
      "Priority support",
    ],
    cta: "Start free trial",
    href: "/app",
    popular: true,
  },
  {
    name: "Agency",
    price: "$49",
    period: "per month",
    description: "For teams and agencies",
    features: [
      "Everything in Creator+",
      "10 team seats",
      "Client folders & organization",
      "White-label exports",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
    ],
    cta: "Contact sales",
    href: "/app",
    popular: false,
  },
]

export function PricingCards() {
  return (
    <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={`relative p-8 bg-card border-border ${
            plan.popular ? "border-accent shadow-lg shadow-accent/10 scale-105" : ""
          }`}
        >
          {plan.popular && (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
              Most Popular
            </Badge>
          )}

          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground">/ {plan.period}</span>
            </div>
          </div>

          <Button
            className={`w-full mb-6 ${plan.popular ? "" : "variant-outline"}`}
            variant={plan.popular ? "default" : "outline"}
            size="lg"
            asChild
          >
            <Link href={plan.href}>{plan.cta}</Link>
          </Button>

          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  )
}
