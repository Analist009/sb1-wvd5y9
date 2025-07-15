import { SEOAnalyzer } from "@/components/seo-analyzer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function SEOAnalyzerPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <SEOAnalyzer />

        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center gap-2">
              חזרה לדף הבית
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
