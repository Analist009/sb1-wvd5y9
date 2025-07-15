import { ImageGenerator } from "@/components/image-generator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ImageGeneratorPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">יוצר התמונות החכם</h1>
          <p className="text-muted-foreground">
            צור תמונות מדהימות באמצעות בינה מלאכותית מתקדמת. תאר את התמונה שתרצה ליצור וה-AI יצור אותה עבורך.
          </p>
        </div>

        <div className="mb-8">
          <ImageGenerator />
        </div>

        <div className="text-center">
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
