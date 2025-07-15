import { CompetitorAnalysisTool } from "@/components/competitor-analysis-tool"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CompetitorAnalysisPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <CompetitorAnalysisTool />

        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/ai-tools" className="flex items-center gap-2">
              חזרה לכלי AI
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
