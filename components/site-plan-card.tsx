import { CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowLeft } from "lucide-react"

interface SitePlanCardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  features: string[]
  pages: string[]
  popular?: boolean
  ctaText?: string
  ctaLink?: string
}

export function SitePlanCard({
  title,
  description,
  imageSrc,
  imageAlt,
  features,
  pages,
  popular = false,
  ctaText = "בחר תוכנית זו",
  ctaLink = "#pricing",
}: SitePlanCardProps) {
  // Generate appropriate placeholder image based on title
  const getPlaceholderImage = () => {
    if (title.includes("חנות")) {
      return "/placeholder.svg?height=300&width=500&text=E-Commerce+Store"
    } else if (title.includes("תדמית")) {
      return "/placeholder.svg?height=300&width=500&text=Business+Website"
    } else if (title.includes("בלוג")) {
      return "/placeholder.svg?height=300&width=500&text=Professional+Blog"
    } else if (title.includes("פורטפוליו")) {
      return "/placeholder.svg?height=300&width=500&text=Portfolio+Site"
    } else if (title.includes("שירותים")) {
      return "/placeholder.svg?height=300&width=500&text=Services+Website"
    }
    return "/placeholder.svg?height=300&width=500&text=Website+Template"
  }

  const finalImageSrc = imageSrc || getPlaceholderImage()

  return (
    <Card className={`border-none shadow-lg overflow-hidden h-full ${popular ? "ring-2 ring-primary" : ""}`}>
      <CardHeader className="space-y-1 pb-3">
        {popular && <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">פופולרי</Badge>}
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-hidden rounded-md">
          <Image
            src={finalImageSrc || "/placeholder.svg"}
            width={500}
            height={300}
            alt={imageAlt}
            className="w-full h-[180px] object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">תכונות מרכזיות:</h4>
          <ul className="space-y-1 text-sm">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">דפים כלולים:</h4>
          <div className="flex flex-wrap gap-1">
            {pages.map((page, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {page}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full gap-1">
          <Link href={ctaLink}>
            {ctaText} <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
