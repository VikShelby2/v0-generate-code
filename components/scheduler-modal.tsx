"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "lucide-react"

interface SchedulerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSchedule: (data: ScheduleData) => void
}

export interface ScheduleData {
  platforms: string[]
  datetime: string
}

const platforms = [
  { id: "x", name: "X (Twitter)" },
  { id: "threads", name: "Threads" },
  { id: "instagram", name: "Instagram" },
  { id: "tiktok", name: "TikTok" },
]

export function SchedulerModal({ open, onOpenChange, onSchedule }: SchedulerModalProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [datetime, setDatetime] = useState("")

  const handleTogglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((p) => p !== platformId) : [...prev, platformId],
    )
  }

  const handleSchedule = () => {
    onSchedule({ platforms: selectedPlatforms, datetime })
    onOpenChange(false)
    setSelectedPlatforms([])
    setDatetime("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <Label className="text-sm mb-3">Select Platforms</Label>
            <div className="space-y-2 mt-3">
              {platforms.map((platform) => (
                <div key={platform.id} className="flex items-center gap-3">
                  <Checkbox
                    id={platform.id}
                    checked={selectedPlatforms.includes(platform.id)}
                    onCheckedChange={() => handleTogglePlatform(platform.id)}
                  />
                  <Label htmlFor={platform.id} className="text-sm font-normal cursor-pointer">
                    {platform.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="datetime" className="text-sm mb-2">
              Date & Time
            </Label>
            <Input
              id="datetime"
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSchedule} disabled={selectedPlatforms.length === 0 || !datetime}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
