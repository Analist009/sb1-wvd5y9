"use client"

import { useEffect, useRef } from "react"

interface AudioManagerProps {
  isPlaying: boolean
  soundType: "thinking" | "success" | "error" | "idle"
  volume?: number
}

export function AudioManager({ isPlaying, soundType, volume = 0.3 }: AudioManagerProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  useEffect(() => {
    // יצירת AudioContext רק אם נדרש
    if (isPlaying && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch (error) {
        console.log("AudioContext not supported")
        return
      }
    }

    if (isPlaying && audioContextRef.current) {
      playSound(soundType)
    } else {
      stopSound()
    }

    return () => {
      stopSound()
    }
  }, [isPlaying, soundType])

  const playSound = (type: string) => {
    if (!audioContextRef.current) return

    stopSound() // עצירת צליל קודם

    const audioContext = audioContextRef.current
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillatorRef.current = oscillator
    gainNodeRef.current = gainNode

    // הגדרת פרמטרי הצליל לפי הסוג
    switch (type) {
      case "thinking":
        // צליל חשיבה עדין - תדרים משתנים
        oscillator.type = "sine"
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(330, audioContext.currentTime + 2)
        oscillator.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 4)

        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(volume * 0.1, audioContext.currentTime + 0.5)
        gainNode.gain.linearRampToValueAtTime(volume * 0.05, audioContext.currentTime + 2)
        gainNode.gain.linearRampToValueAtTime(volume * 0.1, audioContext.currentTime + 4)
        break

      case "success":
        // צליל הצלחה - אקורד עולה
        oscillator.type = "triangle"
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(660, audioContext.currentTime + 0.3)

        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(volume * 0.2, audioContext.currentTime + 0.1)
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5)
        break

      case "error":
        // צליל שגיאה עדין - תדר יורד
        oscillator.type = "square"
        oscillator.frequency.setValueAtTime(330, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 0.3)

        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(volume * 0.15, audioContext.currentTime + 0.1)
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
    if (type !== "thinking") {
      oscillator.stop(audioContext.currentTime + 1)
    }
  }

  const stopSound = () => {
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
