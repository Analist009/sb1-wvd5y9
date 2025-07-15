"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Code, Database, Globe } from "lucide-react"

export function TeamSection() {
  const teamMembers = [
    {
      id: "yosef-al-yashar",
      name: "יוסף אל ישר",
      title: "מתכנת פול סטק",
      description: "מפתח מנוסה עם מומחיות בטכנולוגיות מתקדמות ופתרונות חדשניים",
      image: "/images/yosef-al-yashar.png",
      phone: "058-442342",
      email: "yosef@webmaster.co.il",
      address: "רחוב הרואה 197, רמת גן",
      skills: ["React", "Node.js", "Python", "TypeScript", "MongoDB", "PostgreSQL"],
      specialties: ["פיתוח Full Stack", "ארכיטקטורת מערכות", "בינה מלאכותית", "אופטימיזציה"],
      experience: "8+ שנות ניסיון",
      projects: 150,
    },
  ]

  const getSkillIcon = (skill: string) => {
    switch (skill.toLowerCase()) {
      case "react":
      case "typescript":
      case "javascript":
        return <Code className="h-4 w-4" />
      case "node.js":
      case "python":
        return <Database className="h-4 w-4" />
      case "mongodb":
      case "postgresql":
        return <Database className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <Badge className="inline-flex">הצוות שלנו</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">הכירו את המומחים שלנו</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              צוות מקצועי ומנוסה של מפתחים ומעצבים שמביאים את הטכנולוגיות החדשניות ביותר לפרויקטים שלכם.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="border-none shadow-xl overflow-hidden bg-gradient-to-br from-background to-muted/30"
            >
              <div className="grid gap-6 md:grid-cols-[300px_1fr] p-6">
                {/* תמונה ומידע בסיסי */}
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* פרטי קשר */}
                  <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold text-lg">פרטי קשר</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-primary" />
                        <a href={`tel:${member.phone}`} className="hover:text-primary transition-colors">
                          {member.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-primary" />
                        <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">
                          {member.email}
                        </a>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary mt-0.5" />
                        <span>{member.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* מידע מקצועי */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{member.name}</h1>
                    <h2 className="text-xl text-primary font-semibold mb-3">{member.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{member.description}</p>
                  </div>

                  {/* סטטיסטיקות */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{member.experience}</div>
                      <div className="text-sm text-muted-foreground">ניסיון</div>
                    </div>
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{member.projects}+</div>
                      <div className="text-sm text-muted-foreground">פרויקטים</div>
                    </div>
                  </div>

                  {/* כישורים טכניים */}
                  <div>
                    <h3 className="font-semibold mb-3">כישורים טכניים:</h3>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="gap-1">
                          {getSkillIcon(skill)}
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* התמחויות */}
                  <div>
                    <h3 className="font-semibold mb-3">התמחויות:</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {member.specialties.map((specialty, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          {specialty}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* כפתורי פעולה */}
                  <div className="flex gap-3 pt-4">
                    <Button asChild className="flex-1">
                      <a href={`tel:${member.phone}`}>
                        <Phone className="h-4 w-4 ml-1" />
                        התקשר עכשיו
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <a href={`mailto:${member.email}`}>
                        <Mail className="h-4 w-4 ml-1" />
                        שלח מייל
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* מידע נוסף על הצוות */}
        <div className="mt-16 text-center">
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">זמינות ותמיכה</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">מחויבות לאיכות</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">8+</div>
              <div className="text-sm text-muted-foreground">שנות ניסיון</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
