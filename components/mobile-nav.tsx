"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">תפריט</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <div className="flex items-center justify-between border-b pb-4">
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">סגור</span>
          </Button>
          <span className="font-bold">תפריט</span>
        </div>
        <nav className="flex flex-col gap-4 py-6">
          <Link
            href="#features"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            תכונות
          </Link>
          <Link
            href="#ai"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            בינה מלאכותית
          </Link>
          <Link
            href="#ai-tools"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            כלי AI
          </Link>
          <Link
            href="#site-plans"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            תוכניות אתר
          </Link>
          <Link
            href="#portfolio"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            העבודות שלנו
          </Link>
          <Link
            href="#team"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            הצוות
          </Link>
          <Link
            href="#testimonials"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            המלצות
          </Link>
          <Link
            href="#pricing"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            מחירים
          </Link>
          <Link
            href="#contact"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            צור קשר
          </Link>
          <Link
            href="#"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            בלוג
          </Link>
          <Link
            href="#"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            התחברות
          </Link>
        </nav>
        <div className="mt-auto">
          <Button asChild className="w-full" onClick={() => setOpen(false)}>
            <Link href="#contact">התחל עכשיו</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
