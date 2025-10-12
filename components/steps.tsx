import { FileText, Sparkles, Rocket } from "lucide-react"

const steps = [
  {
    icon: FileText,
    title: "Paste a username or links",
    description: "Add any creator's handle or paste their content URLs",
  },
  {
    icon: Sparkles,
    title: "Train a style (auto)",
    description: "Our AI analyzes tone, hooks, and writing patterns",
  },
  {
    icon: Rocket,
    title: "Generate posts & schedule",
    description: "Create viral content and schedule across platforms",
  },
]

export function Steps() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 sm:text-5xl">How it works</h2>
          <p className="text-xl text-muted-foreground">Three simple steps to viral content</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20 mb-6">
                  <step.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-accent/20 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
