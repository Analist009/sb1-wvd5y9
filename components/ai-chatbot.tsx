"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, Sparkles, User, Loader2, AlertCircle, Volume2, VolumeX, Play } from "lucide-react"
import Image from "next/image"
import { SimpleAudio } from "@/components/simple-audio"

type Message = {
  role: "user" | "assistant"
  content: string
}

export function AiChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "שלום! אני העוזר האישי החכם של ווב-מאסטר. אני כאן לעזור לך עם בניית אתרים, קידום SEO ושיווק דיגיטלי. איך אוכל לעזור לך היום?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [audioEnabled, setAudioEnabled] = useState(false) // התחלה במצב כבוי
  const [currentSound, setCurrentSound] = useState<"thinking" | "success" | "error" | "idle">("idle")
  const [audioInitialized, setAudioInitialized] = useState(false)

  useEffect(() => {
    // בדיקה אם האודיו מופעל בהגדרות המשתמש
    const savedAudioSetting = localStorage.getItem("chatbot-audio-enabled")
    if (savedAudioSetting !== null) {
      setAudioEnabled(JSON.parse(savedAudioSetting))
    }
  }, [])

  useEffect(() => {
    // שמירת הגדרת האודיו
    localStorage.setItem("chatbot-audio-enabled", JSON.stringify(audioEnabled))
  }, [audioEnabled])

  useEffect(() => {
    // ניהול צלילים לפי מצב
    if (isLoading) {
      setCurrentSound("thinking")
    } else if (error) {
      setCurrentSound("error")
      // חזרה למצב רגיל אחרי שנייה
      setTimeout(() => setCurrentSound("idle"), 1000)
    } else {
      setCurrentSound("idle")
    }
  }, [isLoading, error])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      console.log("Sending message to API:", currentInput)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInput }),
      })

      console.log("API Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        console.error("API Error:", errorData)
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const data = await response.json()
      console.log("API Response data:", data)

      const aiMessage: Message = {
        role: "assistant",
        content: data.message || "מצטער, לא הצלחתי לעבד את הבקשה שלך. אנא נסה שוב.",
      }

      setMessages((prev) => [...prev, aiMessage])

      // צליל הצלחה
      if (audioEnabled) {
        setCurrentSound("success")
        setTimeout(() => setCurrentSound("idle"), 1000)
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setError(error instanceof Error ? error.message : "Unknown error")

      const errorMessage: Message = {
        role: "assistant",
        content:
          "מצטער, נתקלתי בבעיה טכנית זמנית. אני עדיין כאן לעזור לך! אנא נסה שוב או שאל אותי על בניית אתרים, SEO או שיווק דיגיטלי.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearError = () => {
    setError(null)
  }

  const toggleAudio = async () => {
    const newState = !audioEnabled

    // אם מפעילים אודיו לראשונה, נדרש אינטראקציה של המשתמש
    if (newState && !audioInitialized) {
      try {
        // יצירת AudioContext זמני לבדיקה
        const tempContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        if (tempContext.state === "suspended") {
          await tempContext.resume()
        }
        await tempContext.close()
        setAudioInitialized(true)
      } catch (error) {
        console.log("Audio initialization failed:", error)
        return
      }
    }

    setAudioEnabled(newState)

    // הפעלת צליל קצר כדי לאשר שהאודיו עובד
    if (newState) {
      setCurrentSound("success")
      setTimeout(() => setCurrentSound("idle"), 500)
    }
  }

  return (
    <div className="flex h-[500px] w-full flex-col rounded-lg border bg-background shadow-lg">
      {/* מנהל האודיו */}
      <SimpleAudio isPlaying={audioEnabled && currentSound !== "idle"} soundType={currentSound} volume={0.3} />

      <div className="flex items-center justify-between border-b p-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 animate-pulse">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div>
            <span className="font-medium">העוזר האישי החכם</span>
            <div className="text-xs text-muted-foreground">{error ? "מצב לא מקוון" : "מופעל על ידי AI מתקדם"}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* כפתור השתקה/הפעלה */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleAudio}
            className="h-8 w-8 transition-all duration-200 hover:scale-110"
            title={audioEnabled ? "השתק צלילים" : "הפעל צלילים (דורש לחיצה)"}
          >
            {audioEnabled ? (
              <Volume2 className="h-4 w-4 text-primary" />
            ) : (
              <VolumeX className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>

          <div className="flex items-center gap-1">
            {error ? (
              <AlertCircle className="h-5 w-5 text-orange-500" />
            ) : (
              <>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              </>
            )}
          </div>
        </div>
      </div>

      {!audioInitialized && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 text-sm">
          <div className="flex items-center gap-2">
            <Play className="h-4 w-4 text-blue-500" />
            <span className="text-blue-700">לחץ על כפתור הרמקול כדי להפעיל צלילים</span>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-3 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <span className="text-orange-700">בעיה זמנית בחיבור - עובד במצב לא מקוון</span>
            </div>
            <Button variant="ghost" size="sm" onClick={clearError}>
              ✕
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/20">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex max-w-[85%] items-start gap-2 rounded-lg p-3 shadow-sm transition-all duration-300 hover:shadow-md ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground ml-4"
                  : "bg-card text-card-foreground border mr-4"
              }`}
            >
              {message.role === "assistant" && (
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Bot className="h-3 w-3 text-primary" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/20 shrink-0">
                  <User className="h-3 w-3" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[85%] items-start gap-3 rounded-lg p-4 bg-card text-card-foreground border mr-4">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
                <div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full animate-spin"
                  style={{ animationDuration: "8s" }}
                ></div>
                {/* אינדיקטור אודיו */}
                {audioEnabled && currentSound === "thinking" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-background">
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                )}
                <Image
                  src="/images/ai-robot-thinking-new.png"
                  width={60}
                  height={60}
                  alt="רובוט חושב"
                  className="ai-robot-thinking z-10"
                />
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <span className="text-sm font-medium text-primary">מעבד את השאלה שלך...</span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-pulse"></div>
                  <div
                    className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                  {audioEnabled && currentSound === "thinking" && (
                    <div className="mr-2 flex items-center gap-1">
                      <Volume2 className="h-3 w-3 text-primary/70" />
                      <div className="flex gap-0.5">
                        <div className="w-0.5 h-2 bg-primary/70 rounded-full animate-pulse"></div>
                        <div
                          className="w-0.5 h-3 bg-primary/70 rounded-full animate-pulse"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-0.5 h-2 bg-primary/70 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t p-4 bg-gradient-to-r from-background to-muted/20">
        <div className="flex gap-2">
          <Input
            placeholder="שאל את העוזר החכם על בניית אתרים, SEO או שיווק דיגיטלי..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            disabled={isLoading}
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="transition-all duration-200 hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">שלח</span>
          </Button>
        </div>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          {error ? "עובד במצב לא מקוון עם תשובות מוכנות מראש" : "מופעל על ידי בינה מלאכותית מתקדמת"}
          {audioEnabled && " • צלילים מופעלים"}
        </div>
      </div>
    </div>
  )
}
