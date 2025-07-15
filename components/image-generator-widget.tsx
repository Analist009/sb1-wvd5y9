"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function ImageGeneratorWidget() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="w-full border-none shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          יוצר התמונות החכם
        </CardTitle>
        <CardDescription>צור תמונות מדהימות באמצעות בינה מלאכותית</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-video w-full overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity duration-300 ${
              isHovered ? "opacity-70" : "opacity-40"
            }`}
          ></div>
          <Image
            src="/images/ai-image-generator.png"
            alt="יוצר תמונות AI"
            width={600}
            height={300}
            className={`object-cover w-full h-full transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <p className="text-white text-sm mb-2 drop-shadow-md">
              תאר את התמונה שתרצה ליצור וה-AI יצור אותה עבורך. תמונה אחת ליום לכל משתמש.
            </p>
            <Button
              asChild
              variant="default"
              className={`w-full transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-90"}`}
            >
              <Link href="/image-generator" className="flex items-center justify-center gap-2">
                נסה עכשיו
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
