"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TopicPrompt, type GenerateConfig } from "@/components/topic-prompt"
import { EditorPreview } from "@/components/editor-preview"
import { ViralScore } from "@/components/viral-score"
import { SchedulerModal, type ScheduleData } from "@/components/scheduler-modal"
import { ArrowLeft, Copy, Calendar, Download, RefreshCw, Trash2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const mockClone = {
  id: "1",
  name: "Tech Influencer Style",
  platforms: ["x", "threads"],
}

const mockGeneratedContent = `🚀 Just discovered the secret to 10x productivity

Most people think it's about working harder.

They're wrong.

Here's what actually works:

1. Deep work blocks (2-3 hours, no distractions)
2. Strategic breaks (not scrolling, actual rest)
3. Single-tasking (multitasking is a myth)

The result? I ship more in 4 hours than most do in 8.

Try it for a week. Thank me later.

#productivity #deepwork #focus`

const mockAlts = [
  `Want to know the real productivity hack?

It's not about hustle culture or grinding 24/7.

It's about working smarter, not harder.

Here's my framework:
• 2-3 hour deep work sessions
• Real breaks (no phone)
• One task at a time

This changed everything for me.

#productivity #worksmarter`,
  `The productivity secret nobody talks about:

Most "productive" people aren't working more hours.

They're working differently.

My 3-step system:
1. Deep focus blocks
2. Intentional rest
3. Zero multitasking

Results speak for themselves.

#productivity #focus`,
]

export default function CloneDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [draft, setDraft] = useState("")
  const [alts, setAlts] = useState<string[]>([])
  const [viralScore, setViralScore] = useState(0)
  const [schedulerOpen, setSchedulerOpen] = useState(false)

  const handleGenerate = async (config: GenerateConfig) => {
    setIsGenerating(true)
    // Mock generation - will be replaced with API call
    setTimeout(() => {
      setDraft(mockGeneratedContent)
      setAlts(mockAlts)
      setViralScore(Math.floor(Math.random() * 30) + 70) // Random score 70-100
      setIsGenerating(false)
      toast({
        title: "Content generated!",
        description: "Your post is ready to edit and publish.",
      })
    }, 2000)
  }

  const handleAcceptAlt = (index: number) => {
    setDraft(alts[index])
    toast({
      title: "Alternative accepted",
      description: "Draft updated with selected version.",
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(draft)
    toast({
      title: "Copied to clipboard",
      description: "Your content is ready to paste.",
    })
  }

  const handleSchedule = (data: ScheduleData) => {
    toast({
      title: "Post scheduled",
      description: `Scheduled for ${new Date(data.datetime).toLocaleString()} on ${data.platforms.length} platform(s).`,
    })
  }

  const handleDelete = () => {
    // Mock delete
    router.push("/app")
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/app")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">{mockClone.name}</h1>
          <div className="flex items-center gap-2">
            {mockClone.platforms.map((platform) => (
              <Badge key={platform} variant="secondary">
                {platform}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retrain
          </Button>
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Generator */}
        <div>
          <Card className="p-6 bg-card border-border">
            <h2 className="text-xl font-semibold mb-6">Generate a post</h2>
            <TopicPrompt onGenerate={handleGenerate} isLoading={isGenerating} />
          </Card>
        </div>

        {/* Right: Preview */}
        <div>
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Preview</h2>
              {viralScore > 0 && <ViralScore score={viralScore} />}
            </div>

            <EditorPreview draft={draft} alts={alts} onAcceptAlt={handleAcceptAlt} onChangeDraft={setDraft} />

            {draft && (
              <div className="flex gap-2 mt-6">
                <Button onClick={handleCopy} variant="outline" className="flex-1 bg-transparent">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={() => setSchedulerOpen(true)} variant="outline" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </Card>

          {/* Disclaimer */}
          <Card className="mt-6 p-4 bg-card border-accent/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                AI may produce imitative content. Use respectfully and with consent.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <SchedulerModal open={schedulerOpen} onOpenChange={setSchedulerOpen} onSchedule={handleSchedule} />
    </div>
  )
}
