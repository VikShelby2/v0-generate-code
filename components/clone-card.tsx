"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Sparkles, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import type { Clone } from "@/lib/types"

interface CloneCardProps {
  clone: Clone
  onDelete?: (id: string) => void
}

const platformIcons = {
  x: "𝕏",
  threads: "◈",
  instagram: "◉",
  tiktok: "♪",
}

export function CloneCard({ clone, onDelete }: CloneCardProps) {
  return (
    <Card className="p-6 bg-card border-border hover:border-accent/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent font-bold text-xl">
            {clone.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{clone.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              {clone.platforms.map((platform) => (
                <span key={platform} className="text-muted-foreground text-sm">
                  {platformIcons[platform]}
                </span>
              ))}
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onDelete?.(clone.id)} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Badge variant={clone.status === "ready" ? "default" : "secondary"} className="text-xs">
          {clone.status}
        </Badge>
        <span className="text-xs text-muted-foreground">Updated {new Date(clone.updatedAt).toLocaleDateString()}</span>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1" size="sm" asChild>
          <Link href={`/app/clone/${clone.id}`}>
            <Sparkles className="h-4 w-4 mr-2" />
            Generate
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/app/clone/${clone.id}`}>Open</Link>
        </Button>
      </div>
    </Card>
  )
}
