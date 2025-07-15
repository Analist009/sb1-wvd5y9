"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ImageIcon, Sparkles, RefreshCw, AlertCircle } from "lucide-react"
import Image from "next/image"

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [hasGeneratedImage, setHasGeneratedImage] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)

  // בדיקה אם המשתמש כבר יצר תמונה בסשן הנוכחי
  useEffect(() => {
    const sessionData = localStorage.getItem("image-generator-session")
    if (sessionData) {
      try {
        const data = JSON.parse(sessionData)
        if (data.imageUrl) {
          setGeneratedImage(data.imageUrl)
          setHasGeneratedImage(true)
        }

        // בדיקת זמן נותר
        const expiryTime = data.expiryTime
        if (expiryTime && expiryTime > Date.now()) {
          setRemainingTime(Math.ceil((expiryTime - Date.now()) / 1000))
        }
      } catch (e) {
        console.error("Error parsing session data:", e)
        localStorage.removeItem("image-generator-session")
      }
    }
  }, [])

  // עדכון טיימר
  useEffect(() => {
    if (remainingTime <= 0) return

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // איפוס הסשן אחרי שהזמן נגמר
          if (localStorage.getItem("image-generator-session")) {
            setHasGeneratedImage(false)
            return 0
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [remainingTime])

  const handleGenerateImage = async () => {
    if (!prompt.trim() || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (!data.success || !data.imageUrl) {
        throw new Error("Invalid response from server")
      }

      setGeneratedImage(data.imageUrl)
      setHasGeneratedImage(true)

      // שמירת מידע בסשן - תמונה אחת ליום
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000 // 24 שעות
      localStorage.setItem(
        "image-generator-session",
        JSON.stringify({
          imageUrl: data.imageUrl,
          expiryTime,
        }),
      )
      setRemainingTime(24 * 60 * 60) // 24 שעות בשניות
    } catch (error) {
      console.error("Error generating image:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to generate image"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const resetSession = () => {
    localStorage.removeItem("image-generator-session")
    setGeneratedImage(null)
    setHasGeneratedImage(false)
    setRemainingTime(0)
    setPrompt("")
  }

  const formatRemainingTime = () => {
    if (remainingTime <= 0) return ""

    const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((remainingTime % 3600) / 60)
    const seconds = remainingTime % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            יוצר התמונות החכם
          </CardTitle>
          {hasGeneratedImage && remainingTime > 0 && (
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <RefreshCw className="h-3 w-3" />
              <span>זמן נותר: {formatRemainingTime()}</span>
            </div>
          )}
        </div>
        <CardDescription>
          {hasGeneratedImage && remainingTime > 0
            ? "יצרת תמונה בסשן הנוכחי. תוכל ליצור תמונה נוספת בעוד 24 שעות."
            : "תאר את התמונה שתרצה ליצור וה-AI יצור אותה עבורך."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {generatedImage ? (
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
            <Image
              src={generatedImage || "/placeholder.svg"}
              alt="תמונה שנוצרה על ידי AI"
              fill
              className="object-cover transition-all duration-300 hover:scale-105"
            />
            <div className="absolute bottom-2 right-2">
              <div className="bg-background/80 text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                נוצר על ידי X.AI Grok
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-square w-full flex items-center justify-center rounded-lg border bg-muted/50">
            {isLoading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">יוצר את התמונה שלך...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 p-4 text-center">
                <Sparkles className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  תאר את התמונה שתרצה ליצור, לדוגמה: "חתול יושב על עץ בשקיעה"
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Input
            placeholder="תאר את התמונה שתרצה ליצור..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading || (hasGeneratedImage && remainingTime > 0)}
            className="w-full"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {hasGeneratedImage && remainingTime > 0 ? (
          <Button variant="outline" onClick={resetSession} className="w-full">
            אפס מגבלת יצירה (לצורך הדגמה)
          </Button>
        ) : (
          <Button onClick={handleGenerateImage} disabled={!prompt.trim() || isLoading} className="w-full gap-2">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                יוצר תמונה...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                צור תמונה
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
