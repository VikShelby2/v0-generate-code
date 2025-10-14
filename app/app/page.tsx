"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { CloneCard } from "@/components/clone-card"
import { EmptyState } from "@/components/empty-state"
import type { Clone } from "@/lib/types"
import { listClones, deleteClone } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth" // Assuming you have a useAuth hook

export default function DashboardPage() {
  const [clones, setClones] = useState<Clone[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      listClones()
        .then((response) => {
          const data = response.data as Clone[]
          setClones(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching clones:", error)
          setLoading(false)
        })
    }
  }, [user])

  const handleDelete = async (id: string) => {
    try {
      await deleteClone({ id })
      setClones(clones.filter((clone) => clone.id !== id))
    } catch (error) {
      console.error("Error deleting clone:", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
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
