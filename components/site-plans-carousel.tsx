"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SitePlanCard } from "@/components/site-plan-card"

export function SitePlansCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [maxIndex, setMaxIndex] = useState(0)

  const sitePlans = [
    {
      title: "חנות מקוונת",
      description: "אתר מסחר אלקטרוני מלא עם ניהול מוצרים, סל קניות ותשלומים",
      imageSrc: "/placeholder.svg?height=300&width=500&text=🛒+E-Commerce+Store",
      imageAlt: "תבנית אתר חנות מקוונת עם עגלת קניות ומוצרים",
      features: [
        "ממשק ניהול מוצרים",
        "סל קניות ותהליך רכישה",
        "אינטגרציה עם שערי תשלום",
        "ניהול מלאי אוטומטי",
        "דירוג וביקורות מוצרים",
      ],
      pages: ["דף בית", "חנות", "מוצר", "סל קניות", "תשלום", "חשבון", "צור קשר"],
      popular: true,
    },
    {
      title: "אתר תדמית לעסק",
      description: "אתר מקצועי להצגת העסק, השירותים והיתרונות שלך",
      imageSrc: "/placeholder.svg?height=300&width=500&text=🏢+Business+Website",
      imageAlt: "תבנית אתר תדמית עסקי מקצועי",
      features: [
        "עיצוב מותאם למיתוג",
        "הצגת שירותים ומוצרים",
        "אזור לקוחות ומקרי בוחן",
        "טופס יצירת קשר מתקדם",
        "אינטגרציה עם רשתות חברתיות",
      ],
      pages: ["דף בית", "אודות", "שירותים", "לקוחות", "בלוג", "צור קשר"],
    },
    {
      title: "בלוג מקצועי",
      description: "פלטפורמת תוכן עשירה להצגת מאמרים, חדשות ועדכונים",
      imageSrc: "/placeholder.svg?height=300&width=500&text=📝+Professional+Blog",
      imageAlt: "תבנית בלוג מקצועי עם מאמרים ותוכן",
      features: ["עורך תוכן עשיר", "קטגוריות ותגיות", "חיפוש מתקדם", "מערכת תגובות", "שיתוף ברשתות חברתיות"],
      pages: ["דף בית", "מאמרים", "קטגוריות", "עמוד מאמר", "אודות", "צור קשר"],
    },
    {
      title: "פורטפוליו",
      description: "הצגת העבודות והפרויקטים שלך בצורה מרשימה ומקצועית",
      imageSrc: "/placeholder.svg?height=300&width=500&text=🎨+Portfolio+Site",
      imageAlt: "תבנית פורטפוליו להצגת עבודות יצירתיות",
      features: [
        "גלריות פרויקטים",
        "סינון לפי קטגוריות",
        "עמודי פרויקט מפורטים",
        "קורות חיים מובנים",
        "טופס יצירת קשר",
      ],
      pages: ["דף בית", "פרויקטים", "עמוד פרויקט", "אודות", "קורות חיים", "צור קשר"],
    },
    {
      title: "אתר שירותים מקצועיים",
      description: "אתר לעסקים המספקים שירותים מקצועיים כמו ייעוץ, עריכת דין או רפואה",
      imageSrc: "/placeholder.svg?height=300&width=500&text=⚖️+Professional+Services",
      imageAlt: "תבנית אתר שירותים מקצועיים",
      features: ["הצגת שירותים מפורטת", "מערכת קביעת תורים", "פרופילי צוות", "מאמרים מקצועיים", "עדויות לקוחות"],
      pages: ["דף בית", "שירותים", "צוות", "מאמרים", "קביעת תור", "צור קשר"],
    },
    {
      title: "אתר מסעדה",
      description: "אתר מושך למסעדה עם תפריט דיגיטלי והזמנות מקוונות",
      imageSrc: "/placeholder.svg?height=300&width=500&text=🍽️+Restaurant+Website",
      imageAlt: "תבנית אתר מסעדה עם תפריט דיגיטלי",
      features: [
        "תפריט דיגיטלי אינטראקטיבי",
        "מערכת הזמנות מקוונות",
        "גלריית תמונות מנות",
        "מידע על המסעדה והשף",
        "מערכת הזמנת שולחנות",
      ],
      pages: ["דף בית", "תפריט", "אודות", "הזמנות", "גלריה", "צור קשר"],
    },
    {
      title: "אתר חדשות ומגזין",
      description: "פלטפורמת חדשות מתקדמת עם ניהול תוכן ומערכת כתבים",
      imageSrc: "/placeholder.svg?height=300&width=500&text=📰+News+Magazine",
      imageAlt: "תבנית אתר חדשות ומגזין",
      features: [
        "מערכת ניהול כתבות",
        "קטגוריות חדשות מרובות",
        "מערכת כתבים ועורכים",
        "ארכיון חדשות מתקדם",
        "ניוזלטר ועדכונים",
      ],
      pages: ["דף בית", "חדשות", "קטגוריות", "כתבה", "ארכיון", "צור קשר"],
    },
    {
      title: "אתר חינוכי",
      description: "פלטפורמה לימודית עם קורסים, מבחנים ומעקב התקדמות",
      imageSrc: "/placeholder.svg?height=300&width=500&text=🎓+Educational+Platform",
      imageAlt: "תבנית אתר חינוכי עם קורסים מקוונים",
      features: ["מערכת קורסים מקוונים", "מבחנים ותרגילים", "מעקב התקדמות תלמידים", "פורום דיונים", "ספרייה דיגיטלית"],
      pages: ["דף בית", "קורסים", "מבחנים", "פורום", "ספרייה", "צור קשר"],
    },
    {
      title: "אתר אירועים",
      description: "פלטפורמה לניהול ושיווק אירועים עם מכירת כרטיסים",
      imageSrc: "/placeholder.svg?height=300&width=500&text=🎪+Events+Platform",
      imageAlt: "תבנית אתר אירועים ומכירת כרטיסים",
      features: [
        "לוח אירועים אינטראקטיבי",
        "מערכת מכירת כרטיסים",
        "ניהול מקומות ומושבים",
        "אזור אירגון אירועים",
        "אינטגרציה עם לוחות שנה",
      ],
      pages: ["דף בית", "אירועים", "כרטיסים", "מקומות", "אירגון", "צור קשר"],
    },
    {
      title: "אתר כושר וספורט",
      description: "אתר למכון כושר או מאמן אישי עם תוכניות אימון",
      imageSrc: "/placeholder.svg?height=300&width=500&text=💪+Fitness+Website",
      imageAlt: "תבנית אתר כושר ואימונים",
      features: ["תוכניות אימון מותאמות", "מעקב התקדמות אישי", "הזמנת שיעורים", "חנות תוספי תזונה", "בלוג טיפים לכושר"],
      pages: ["דף בית", "תוכניות", "שיעורים", "חנות", "בלוג", "צור קשר"],
    },
  ]

  useEffect(() => {
    const updateMaxIndex = () => {
      if (!carouselRef.current) return

      const containerWidth = carouselRef.current.clientWidth
      const cardWidth =
        containerWidth >= 1024 ? containerWidth / 3 : containerWidth >= 768 ? containerWidth / 2 : containerWidth

      // Calculate how many cards can be displayed at once
      const visibleCards = Math.floor(containerWidth / cardWidth)

      // Calculate the maximum index (total cards - visible cards)
      setMaxIndex(Math.max(0, sitePlans.length - visibleCards))
    }

    updateMaxIndex()
    window.addEventListener("resize", updateMaxIndex)

    return () => {
      window.removeEventListener("resize", updateMaxIndex)
    }
  }, [sitePlans.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div className="relative">
      <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm"
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">הקודם</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm"
          onClick={nextSlide}
          disabled={currentIndex >= maxIndex}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">הבא</span>
        </Button>
      </div>

      <div ref={carouselRef} className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${(currentIndex * 100) / sitePlans.length}%)`,
            width: `${sitePlans.length * 100}%`,
          }}
        >
          {sitePlans.map((plan, index) => (
            <div
              key={index}
              className="px-3 w-full md:w-1/2 lg:w-1/3"
              style={{ flexBasis: `${100 / sitePlans.length}%` }}
            >
              <SitePlanCard {...plan} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 gap-1">
        {sitePlans.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`עבור לשקופית ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
