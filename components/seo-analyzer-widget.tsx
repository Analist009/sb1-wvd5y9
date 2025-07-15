"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, ExternalLink, BarChart3, Target, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function SEOAnalyzerWidget() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="w-full border-none shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          מנתח SEO חכם
        </CardTitle>
        <CardDescription>נתח תוכן וקבל המלצות מקצועיות לשיפור דירוג</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-video w-full overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity duration-300 ${
              isHovered ? "opacity-70" : "opacity-40"
            }`}
          ></div>
          <Image
            src="/images/seo-ai-advanced.png"
            alt="מנתח SEO חכם"
            width={600}
            height={300}
            className={`object-cover w-full h-full transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />

          {/* אייקונים מרחפים */}
          <div className="absolute inset-0 z-20">
            <div
              className={`absolute top-4 right-4 transition-all duration-500 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            >
              <div className="bg-primary/90 text-primary-foreground p-2 rounded-full">
                <BarChart3 className="h-4 w-4" />
              </div>
            </div>
            <div
              className={`absolute top-4 left-4 transition-all duration-500 delay-100 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            >
              <div className="bg-green-500/90 text-white p-2 rounded-full">
                <Target className="h-4 w-4" />
              </div>
            </div>
            <div
              className={`absolute bottom-16 right-4 transition-all duration-500 delay-200 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            >
              <div className="bg-yellow-500/90 text-white p-2 rounded-full">
                <Zap className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-white text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>ניתוח מילות מפתח מתקדם</span>
              </div>
              <div className="flex items-center gap-2 text-white text-sm">
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span>המלצות מותאמות אישית</span>
              </div>
              <div className="flex items-center gap-2 text-white text-sm">
                <div
                  className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <span>תחזית שיפור דירוג</span>
              </div>
            </div>
            <Button
              asChild
              variant="default"
              className={`w-full transition-all duration-300 ${isHovered ? "opacity-100 scale-105" : "opacity-90"}`}
            >
              <Link href="/seo-analyzer" className="flex items-center justify-center gap-2">
                נתח עכשיו
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
