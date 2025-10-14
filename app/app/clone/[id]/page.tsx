"use client"

import { useEffect, useState } from "react"
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
import { generatePost, deleteClone } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
import type { Clone, GeneratedPost } from "@/lib/types"

export default function CloneDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [clone, setClone] = useState<Clone | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [draft, setDraft] = useState("")
  const [alts, setAlts] = useState<string[]>([])
  const [viralScore, setViralScore] = useState(0)
  const [schedulerOpen, setSchedulerOpen] = useState(false)

  useEffect(() => {
    if (user && params.id) {
      // In a real app, you would fetch the clone data here
      // For now, we'll just set it from a mock
      setClone({ 
        id: params.id as string, 
        name: "Tech Influencer Style", 
        platforms: ["x", "threads"], 
        createdAt: new Date(), 
        updatedAt: new Date(), 
        status: "ready"
      })
    }
  }, [user, params.id])

  const handleGenerate = async (config: GenerateConfig) => {
    if (!clone) return
    setIsGenerating(true)
    try {
      const response = await generatePost({ cloneId: clone.id, topic: config.topic })
      const data = response.data as GeneratedPost
      setDraft(data.content)
      setAlts([]) // Assuming the API returns only one post for now
      setViralScore(data.viralScore)
      toast({
        title: "Content generated!",
        description: "Your post is ready to edit and publish.",
      })
    } catch (error) {
      console.error("Error generating post:", error)
      toast({
        title: "Error generating post",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
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

  const handleDelete = async () => {
    if (!clone) return
    try {
      await deleteClone({ id: clone.id })
      router.push("/app")
    } catch (error) {
      console.error("Error deleting clone:", error)
      toast({
        title: "Error deleting clone",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }
  
  if (!clone) {
    return <div>Loading...</div>
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
          <h1 className="text-4xl font-bold mb-2">{clone.name}</h1>
          <div className="flex items-center gap-2">
            {clone.platforms.map((platform) => (
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
