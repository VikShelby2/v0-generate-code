import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Chen",
    handle: "@sarahcreates",
    avatar: "SC",
    quote: "+38% engagement in 48h. This tool is a game-changer for my content strategy.",
  },
  {
    name: "Marcus Rivera",
    handle: "@marcusmarketing",
    avatar: "MR",
    quote: "Saved 10+ hours per week. The style cloning is eerily accurate.",
  },
  {
    name: "Emily Watson",
    handle: "@emilywrites",
    avatar: "EW",
    quote: "Finally cracked the viral code. My threads are getting 10x more impressions.",
  },
]

export function SocialProof() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 sm:text-5xl">Loved by creators</h2>
          <p className="text-xl text-muted-foreground">See what our users are saying</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarFallback className="bg-accent/20 text-accent font-semibold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.handle}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{testimonial.quote}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
