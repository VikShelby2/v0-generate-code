"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

interface EditorPreviewProps {
  draft: string
  alts: string[]
  onAcceptAlt: (index: number) => void
  onChangeDraft: (text: string) => void
}

export function EditorPreview({ draft, alts, onAcceptAlt, onChangeDraft }: EditorPreviewProps) {
  const [activeTab, setActiveTab] = useState("draft")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="draft">Draft</TabsTrigger>
        <TabsTrigger value="alts">Alt Options ({alts.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="draft" className="mt-4">
        <Textarea
          value={draft}
          onChange={(e) => onChangeDraft(e.target.value)}
          rows={12}
          className="font-mono text-sm"
          placeholder="Your generated content will appear here..."
        />
      </TabsContent>

      <TabsContent value="alts" className="mt-4 space-y-3">
        {alts.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            <p>No alternative versions yet. Generate content to see options.</p>
          </Card>
        ) : (
          alts.map((alt, index) => (
            <Card key={index} className="p-4 bg-card border-border hover:border-accent/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-mono flex-1 whitespace-pre-wrap">{alt}</p>
                <Button size="sm" variant="ghost" onClick={() => onAcceptAlt(index)}>
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </TabsContent>
    </Tabs>
  )
}
