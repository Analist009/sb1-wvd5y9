"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"
import Image from "next/image"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // סימולציה של שליחת טופס
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // איפוס הטופס אחרי 3 שניות
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <Badge className="inline-flex">צור קשר</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">בואו נתחיל לעבוד יחד</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              מוכנים להתחיל את הפרויקט שלכם? צרו קשר עכשיו לקבלת ייעוץ חינם והצעת מחיר מותאמת אישית.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* פרטי קשר */}
          <div className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  פרטי קשר
                </CardTitle>
                <CardDescription>אנחנו כאן לעזור לכם בכל שאלה או בקשה</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">יוסף אל ישר - מתכנת פול סטק</div>
                      <a href="tel:058-442342" className="text-primary hover:underline">
                        058-442342
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">אימייל</div>
                      <a href="mailto:yosef@webmaster.co.il" className="text-primary hover:underline">
                        yosef@webmaster.co.il
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">כתובת</div>
                      <div className="text-muted-foreground">רחוב הרואה 197, רמת גן</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">שעות פעילות</div>
                      <div className="text-muted-foreground">ראשון-חמישי: 9:00-18:00</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* תמונה */}
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src="/images/contact-hero.png"
                alt="צור קשר - ווב מאסטר"
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">מוכנים להתחיל?</h3>
                <p className="text-sm opacity-90">בואו נבנה משהו מדהים יחד</p>
              </div>
            </div>
          </div>

          {/* טופס יצירת קשר */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>שלחו לנו הודעה</CardTitle>
              <CardDescription>מלאו את הפרטים ונחזור אליכם בהקדם האפשרי</CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">ההודעה נשלחה בהצלחה!</h3>
                  <p className="text-muted-foreground">נחזור אליכם בהקדם האפשרי</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">שם מלא *</label>
                      <Input
                        name="name"
                        placeholder="השם שלכם"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">טלפון</label>
                      <Input
                        name="phone"
                        placeholder="מספר הטלפון שלכם"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">אימייל *</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="האימייל שלכם"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">נושא</label>
                    <Input name="subject" placeholder="נושא ההודעה" value={formData.subject} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">הודעה *</label>
                    <Textarea
                      name="message"
                      placeholder="ספרו לנו על הפרויקט שלכם..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2" disabled={isSubmitting} size="lg">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        שולח...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        שלח הודעה
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
