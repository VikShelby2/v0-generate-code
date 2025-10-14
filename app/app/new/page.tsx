"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { createClone } from "@/lib/api"

const platforms = [
  { id: "x", name: "X (Twitter)", icon: "𝕏" },
  { id: "threads", name: "Threads", icon: "◈" },
  { id: "instagram", name: "Instagram", icon: "◉" },
  { id: "tiktok", name: "TikTok", icon: "♪" },
]

export default function NewClonePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    sources: "",
    platforms: [] as string[],
    directness: 50,
    length: 50,
    keywords: "",
  })
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePlatformToggle = (platformId: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter((p) => p !== platformId)
        : [...prev.platforms, platformId],
    }))
  }

  const handleCreate = async () => {
    setIsCreating(true)
    setError(null)
    try {
      await createClone({ name: formData.name, platforms: formData.platforms })
      router.push("/app")
    } catch (err) {
      setError("Failed to create clone. Please try again.")
      console.error(err)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <Button variant="ghost" className="mb-6" onClick={() => (step === 1 ? router.push("/app") : setStep(step - 1))}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Create New Clone</h1>
        <p className="text-muted-foreground">Train AI on any creator's writing style</p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                s === step
                  ? "bg-accent text-accent-foreground"
                  : s < step
                    ? "bg-accent/20 text-accent"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {s < step ? <Check className="h-4 w-4" /> : s}
            </div>
            {s < 3 && <div className={`h-1 flex-1 mx-2 ${s < step ? "bg-accent" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      <Card className="p-8 bg-card border-border">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-base mb-2">
                Clone Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Tech Influencer Style"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="sources" className="text-base mb-2">
                Handles or URLs
              </Label>
              <Textarea
                id="sources"
                placeholder="@username or paste URLs (one per line)"
                value={formData.sources}
                onChange={(e) => setFormData({ ...formData, sources: e.target.value })}
                rows={6}
                className="mt-2 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Add Twitter/X handles or paste links to posts you want to learn from
              </p>
            </div>

            <div>
              <Label className="text-base mb-3">Select Platforms</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      formData.platforms.includes(platform.id)
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <Checkbox checked={formData.platforms.includes(platform.id)} />
                    <span className="text-2xl">{platform.icon}</span>
                    <span className="font-medium">{platform.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-base">Tone: Direct ↔ Story-driven</Label>
                <Badge variant="secondary">{formData.directness}%</Badge>
              </div>
              <Slider
                value={[formData.directness]}
                onValueChange={([value]) => setFormData({ ...formData, directness: value })}
                max={100}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Direct & punchy</span>
                <span>Story-driven</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-base">Length: Punchy ↔ Longform</Label>
                <Badge variant="secondary">{formData.length}%</Badge>
              </div>
              <Slider
                value={[formData.length]}
                onValueChange={([value]) => setFormData({ ...formData, length: value })}
                max={100}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Short & punchy</span>
                <span>Long & detailed</span>
              </div>
            </div>

            <div>
              <Label htmlFor="keywords" className="text-base mb-2">
                Priority Keywords (Optional)
              </Label>
              <Input
                id="keywords"
                placeholder="e.g., AI, productivity, growth"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-2">Comma-separated topics to emphasize</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 mx-auto mb-4">
                <Check className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Ready to Create</h3>
              <p className="text-muted-foreground">Review your clone configuration</p>
            </div>

            <div className="space-y-4 bg-muted/50 rounded-lg p-6">
              <div>
                <span className="text-sm text-muted-foreground">Name:</span>
                <p className="font-semibold">{formData.name || "Untitled Clone"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Platforms:</span>
                <div className="flex gap-2 mt-1">
                  {formData.platforms.map((p) => (
                    <Badge key={p} variant="secondary">
                      {platforms.find((pl) => pl.id === p)?.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Sources:</span>
                <p className="text-sm mt-1 font-mono">{formData.sources.split("\n").length} items</p>
              </div>
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              className="flex-1"
              disabled={step === 1 && (!formData.name || !formData.sources || formData.platforms.length === 0)}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleCreate} className="flex-1" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Clone"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
