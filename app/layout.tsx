import type React from "react"
import type { Metadata } from "next"
import { Rubik } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const rubik = Rubik({ subsets: ["hebrew"] })

export const metadata: Metadata = {
  title: "ווב-מאסטר | בניית אתרים מקצועית וקידום SEO",
  description: "פלטפורמה מתקדמת לבניית אתרים מקצועיים וקידום SEO עם כלי AI חכמים",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className="scroll-smooth">
      <body className={rubik.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
