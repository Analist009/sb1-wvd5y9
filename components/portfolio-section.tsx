"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ExternalLink, Eye, Code, Sparkles, Car, Brain, Users, Zap } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  category: string
  image: string
  technologies: string[]
  features: string[]
  link?: string
  status: "completed" | "in-progress" | "coming-soon"
}

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: "ai-simulations",
      title: "סימולציות AI מתקדמות",
      description: "פלטפורמה מתקדמת לסימולציות בינה מלאכותית עם תמיכה במגוון שפות תכנות ומדדי ביצועים",
      category: "בינה מלאכותית",
      image: "/images/ai-simulations-project.png",
      technologies: ["Python", "JavaScript", "TypeScript", "Java", "AI/ML"],
      features: [
        "סימולציות AI בזמן אמת",
        "תמיכה במגוון שפות תכנות",
        "מדדי ביצועים מתקדמים",
        "ממשק משתמש אינטואיטיבי",
        "אינטגרציה עם מודלי AI מובילים",
      ],
      status: "completed",
    },
    {
      id: "networkjo-agency",
      title: "NetworkJo AI Agency",
      description: "סוכנות AI מתקדמת המציעה פתרונות טכנולוגיים חדשניים עם ממשק עיצוב מודרני",
      category: "עיצוב ופיתוח",
      image: "/images/networkjo-ai-agency.png",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "AI Integration"],
      features: [
        "עיצוב מודרני וחדשני",
        "אינטגרציה עם פתרונות AI",
        "ממשק משתמש רספונסיבי",
        "אנימציות מתקדמות",
        "אופטימיזציה לביצועים",
      ],
      status: "completed",
    },
    {
      id: "ai-taxi",
      title: "NetworkJo AI Taxi",
      description: "פלטפורמת הזמנת מוניות חכמה עם טכנולוגיית AI לאופטימיזציה של נסיעות",
      category: "אפליקציות מובייל",
      image: "/images/networkjo-ai-taxi.png",
      technologies: ["React Native", "Node.js", "AI Routing", "Real-time GPS", "Payment Integration"],
      features: [
        "הזמנת מוניות בזמן אמת",
        "ניתוב חכם עם AI",
        "מעקב GPS מדויק",
        "מערכת תשלומים מאובטחת",
        "ממשק נהג ונוסע",
      ],
      status: "completed",
    },
    {
      id: "projects-portfolio",
      title: "פורטפוליו פרויקטים",
      description: "דף הצגת פרויקטים מקצועי עם חבילות שירותים מגוונות ועיצוב אטרקטיבי",
      category: "פורטפוליו",
      image: "/images/our-projects-portfolio.png",
      technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Responsive Design"],
      features: [
        "הצגת פרויקטים אינטראקטיבית",
        "חבילות שירותים מגוונות",
        "עיצוב רספונסיבי",
        "אנימציות חלקות",
        "ממשק ניהול תוכן",
      ],
      status: "completed",
    },
    {
      id: "team-page",
      title: "דף הצוות המקצועי",
      description: "דף הצגת צוות עם עיצוב מקצועי ומידע מפורט על חברי הצוות והמומחיות שלהם",
      category: "עיצוב אתרים",
      image: "/images/our-team-page.png",
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX"],
      features: [
        "הצגת פרופילי צוות",
        "עיצוב מקצועי ונקי",
        "מידע מפורט על מומחיות",
        "ממשק רספונסיבי",
        "אינטגרציה עם רשתות חברתיות",
      ],
      status: "completed",
    },
  ]

  const categories = ["הכל", ...Array.from(new Set(projects.map((p) => p.category)))]
  const [selectedCategory, setSelectedCategory] = useState("הכל")

  const filteredProjects =
    selectedCategory === "הכל" ? projects : projects.filter((p) => p.category === selectedCategory)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">הושלם</Badge>
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-800">בפיתוח</Badge>
      case "coming-soon":
        return <Badge className="bg-blue-100 text-blue-800">בקרוב</Badge>
      default:
        return null
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "בינה מלאכותית":
        return <Brain className="h-4 w-4" />
      case "עיצוב ופיתוח":
        return <Code className="h-4 w-4" />
      case "אפליקציות מובייל":
        return <Car className="h-4 w-4" />
      case "פורטפוליו":
        return <Eye className="h-4 w-4" />
      case "עיצוב אתרים":
        return <Users className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <Badge className="inline-flex">העבודות שלנו</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">פרויקטים שביצענו בהצלחה</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              הכירו את הפרויקטים המרשימים שפיתחנו ללקוחותינו. כל פרויקט מציג את המומחיות והחדשנות שלנו בתחומים שונים.
            </p>
          </div>
        </div>

        {/* סינון קטגוריות */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="gap-2"
            >
              {category !== "הכל" && getCategoryIcon(category)}
              {category}
            </Button>
          ))}
        </div>

        {/* רשת פרויקטים */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3">{getStatusBadge(project.status)}</div>
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary" onClick={() => setSelectedProject(project)}>
                          <Eye className="h-4 w-4 ml-1" />
                          פרטים
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    {project.link && (
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 ml-1" />
                          צפייה
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="gap-1">
                    {getCategoryIcon(project.category)}
                    {project.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">טכנולוגיות:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* דיאלוג פרטי פרויקט */}
        <Dialog>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {getCategoryIcon(selectedProject.category)}
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription>{selectedProject.description}</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={selectedProject.image || "/placeholder.svg"}
                      alt={selectedProject.title}
                      width={800}
                      height={500}
                      className="w-full h-64 object-cover"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">טכנולוגיות שנעשה בהן שימוש:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">תכונות עיקריות:</h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Sparkles className="h-4 w-4 text-primary shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="gap-1">
                        {getCategoryIcon(selectedProject.category)}
                        {selectedProject.category}
                      </Badge>
                      {getStatusBadge(selectedProject.status)}
                    </div>
                    {selectedProject.link && (
                      <Button asChild>
                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 ml-1" />
                          צפה בפרויקט
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* סטטיסטיקות */}
        <div className="mt-16 grid gap-6 md:grid-cols-4 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">{projects.length}</div>
            <div className="text-sm text-muted-foreground">פרויקטים הושלמו</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">{categories.length - 1}</div>
            <div className="text-sm text-muted-foreground">תחומי מומחיות</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">שביעות רצון לקוחות</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">תמיכה טכנית</div>
          </div>
        </div>
      </div>
    </section>
  )
}
