export interface Clone {
  id: string
  name: string
  platforms: ("x" | "threads" | "instagram" | "tiktok")[]
  createdAt: Date
  updatedAt: Date
  status: "training" | "ready" | "error"
}

export interface GeneratedPost {
  id: string
  cloneId: string
  content: string
  type: "thread" | "caption" | "script"
  viralScore: number
  createdAt: Date
}
