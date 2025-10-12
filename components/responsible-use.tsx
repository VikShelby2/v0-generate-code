import { AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

export function ResponsibleUse() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-8 bg-card border-accent/20">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
              <AlertCircle className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Responsible Use</h3>
              <p className="text-muted-foreground leading-relaxed">
                Only clone public content. Do not impersonate or violate platform policies. Use for inspiration and
                ghostwriting with consent. We believe in ethical AI that empowers creators while respecting intellectual
                property and authenticity.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
