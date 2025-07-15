"use client"

import { useEffect, useRef } from "react"

interface SimpleAudioProps {
  isPlaying: boolean
  soundType: "thinking" | "success" | "error" | "idle"
  volume?: number
}

export function SimpleAudio({ isPlaying, soundType, volume = 0.2 }: SimpleAudioProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying && soundType !== "idle") {
      initAudioAndPlay()
    } else {
      stopSound()
    }

    return () => {
      stopSound()
    }
  }, [isPlaying, soundType])

  const initAudioAndPlay = async () => {
    try {
      // יצירת AudioContext רק אם נדרש
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      const audioContext = audioContextRef.current

      // אם ה-AudioContext במצב suspended, נסה להפעיל אותו
      if (audioContext.state === "suspended") {
        await audioContext.resume()
      }

      playSound(soundType)
    } catch (error) {
      console.log("Audio not supported or failed:", error)
    }
  }

  const playSound = (type: string) => {
    if (!audioContextRef.current) return

    stopSound() // עצירת צליל קודם

    const audioContext = audioContextRef.current

    try {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillatorRef.current = oscillator
      gainNodeRef.current = gainNode

      // הגדרת פרמטרי הצליל לפי הסוג
      switch (type) {
        case "thinking":
          // צליל חשיבה - תדר משתנה עדין
          oscillator.type = "sine"
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime)

          // יצירת תבנית תדרים משתנה
          let time = audioContext.currentTime
          for (let i = 0; i < 10; i++) {
            const freq = 200 + Math.sin(i * 0.5) * 50
            oscillator.frequency.exponentialRampToValueAtTime(freq, time + i * 0.5)
            time += 0.5
          }

          gainNode.gain.setValueAtTime(0, audioContext.currentTime)
          gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContext.currentTime + 0.1)
          break

        case "success":
          // צליל הצלחה - אקורד עולה
          oscillator.type = "triangle"
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime) // A4
          oscillator.frequency.exponentialRampToValueAtTime(660, audioContext.currentTime + 0.2) // E5

          gainNode.gain.setValueAtTime(0, audioContext.currentTime)
          gainNode.gain.linearRampToValueAtTime(volume * 0.4, audioContext.currentTime + 0.05)
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4)
          break

        case "error":
          // צליל שגיאה עדין - תדר יורד
          oscillator.type = "sawtooth"
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
          oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.3)

          gainNode.gain.setValueAtTime(0, audioContext.currentTime)
          gainNode.gain.linearRampToValueAtTime(volume * 0.2, audioContext.currentTime + 0.05)
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4)
          break

        default:
          return
      }

      // חיבור הרכיבים
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // התחלת הצליל
      oscillator.start()

      // עצירה אוטומטית לצלילים קצרים
      if (type === "success" || type === "error") {
        oscillator.stop(audioContext.currentTime + 0.5)
      } else if (type === "thinking") {
        // עצירה אוטומטית אחרי 5 שניות למקרה שהמשתמש שוכח
        oscillator.stop(audioContext.currentTime + 5)
      }
    } catch (error) {
      console.log("Error creating audio:", error)
    }
  }

  const stopSound = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop()
      } catch (error) {
        // הצליל כבר נעצר
      }
      oscillatorRef.current = null
    }

    if (gainNodeRef.current) {
      gainNodeRef.current = null
    }
  }

  return null // קומפוננט שקט שמנהל רק אודיו
}
