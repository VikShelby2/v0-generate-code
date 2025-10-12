"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { CloneCard } from "@/components/clone-card"
import { EmptyState } from "@/components/empty-state"
import type { Clone } from "@/lib/types"

// Mock data - will be replaced with real data from API
const mockClones: Clone[] = [
  {
    id: "1",
    name: "Tech Influencer Style",
    platforms: ["x", "threads"],
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-15"),
    status: "ready",
  },
  {
    id: "2",
    name: "Fitness Coach Tone",
    platforms: ["instagram", "tiktok"],
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-14"),
    status: "ready",
  },
]

export default function DashboardPage() {
  const [clones, setClones] = useState<Clone[]>(mockClones)

  const handleDelete = (id: string) => {
    setClones(clones.filter((clone) => clone.id !== id))
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Your Clones</h1>
          <p className="text-muted-foreground">Manage and generate content from your style clones</p>
        </div>
        <Button asChild>
          <Link href="/app/new">
            <Plus className="h-4 w-4 mr-2" />
            New Clone
          </Link>
        </Button>
      </div>

      {clones.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clones.map((clone) => (
            <CloneCard key={clone.id} clone={clone} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
