import { TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ViralScoreProps {
  score: number
}

export function ViralScore({ score }: ViralScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-orange-500"
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="secondary" className="gap-2 cursor-help">
            <TrendingUp className={`h-4 w-4 ${getScoreColor(score)}`} />
            <span className="font-semibold">Viral Score: {score}/100</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-sm">
            Heuristic predictor based on engagement patterns. Test and iterate for best results.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
