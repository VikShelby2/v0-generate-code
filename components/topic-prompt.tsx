"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Sparkles } from "lucide-react"

interface TopicPromptProps {
  onGenerate: (config: GenerateConfig) => void
  isLoading?: boolean
}

export interface GenerateConfig {
  topic: string
  type: "thread" | "caption" | "script"
  length: "short" | "medium" | "long"
  includeHooks: boolean
  includeCTA: boolean
  includeHashtags: boolean
}

export function TopicPrompt({ onGenerate, isLoading }: TopicPromptProps) {
  const [config, setConfig] = useState<GenerateConfig>({
    topic: "",
    type: "thread",
    length: "medium",
    includeHooks: true,
    includeCTA: true,
    includeHashtags: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(config)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="topic" className="text-base mb-2">
          What do you want to write about?
        </Label>
        <Textarea
          id="topic"
          placeholder="e.g., offer launch tips for freelancers"
          value={config.topic}
          onChange={(e) => setConfig({ ...config, topic: e.target.value })}
          rows={3}
          className="mt-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="type" className="text-sm mb-2">
            Content Type
          </Label>
          <Select value={config.type} onValueChange={(value: any) => setConfig({ ...config, type: value })}>
            <SelectTrigger id="type" className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thread">Thread</SelectItem>
              <SelectItem value="caption">Caption</SelectItem>
              <SelectItem value="script">Script</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="length" className="text-sm mb-2">
            Length
          </Label>
          <Select value={config.length} onValueChange={(value: any) => setConfig({ ...config, length: value })}>
            <SelectTrigger id="length" className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="long">Long</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm">Include</Label>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Attention-grabbing hooks</span>
          <Switch
            checked={config.includeHooks}
            onCheckedChange={(checked) => setConfig({ ...config, includeHooks: checked })}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Call-to-action</span>
          <Switch
            checked={config.includeCTA}
            onCheckedChange={(checked) => setConfig({ ...config, includeCTA: checked })}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Hashtags</span>
          <Switch
            checked={config.includeHashtags}
            onCheckedChange={(checked) => setConfig({ ...config, includeHashtags: checked })}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={!config.topic || isLoading}>
        <Sparkles className="h-4 w-4 mr-2" />
        {isLoading ? "Generating..." : "Generate Post"}
      </Button>
    </form>
  )
}
