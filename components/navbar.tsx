import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <span className="text-lg font-bold text-accent-foreground">SC</span>
          </div>
          <span className="text-xl font-bold">StoryCloner</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/app">Log in</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
