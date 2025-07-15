import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  ArrowLeft,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Code,
  Search,
  BarChart3,
  Sparkles,
  Zap,
  Globe,
  Rocket,
  Star,
  LayoutTemplate,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { AiChatbot } from "@/components/ai-chatbot"
import { SitePlansCarousel } from "@/components/site-plans-carousel"
import { ImageGeneratorWidget } from "@/components/image-generator-widget"
import { SEOAnalyzerWidget } from "@/components/seo-analyzer-widget"
import { ContentGeneratorWidget } from "@/components/content-generator-widget"
import { PortfolioSection } from "@/components/portfolio-section"
import { TeamSection } from "@/components/team-section"
import { ContactSection } from "@/components/contact-section"

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <AiSection />
        <AiToolsSection />
        <SitePlansSection />
        <PortfolioSection />
        <TeamSection />
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">ווב-מאסטר</span>
        </div>

        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
            תכונות
          </Link>
          <Link href="#ai" className="text-sm font-medium transition-colors hover:text-primary">
            בינה מלאכותית
          </Link>
          <Link href="/ai-tools" className="text-sm font-medium transition-colors hover:text-primary">
            כלי AI
          </Link>
          <Link href="#site-plans" className="text-sm font-medium transition-colors hover:text-primary">
            תוכניות אתר
          </Link>
          <Link href="#portfolio" className="text-sm font-medium transition-colors hover:text-primary">
            העבודות שלנו
          </Link>
          <Link href="#team" className="text-sm font-medium transition-colors hover:text-primary">
            הצוות
          </Link>
          <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
            המלצות
          </Link>
          <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
            מחירים
          </Link>
          <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
            צור קשר
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="#" className="hidden md:block text-sm font-medium transition-colors hover:text-primary">
            התחברות
          </Link>
          <Button asChild>
            <Link href="#contact">התחל עכשיו</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge className="inline-flex">חדש! בינה מלאכותית משולבת</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                בניית אתרים מקצועית וקידום SEO בקליק אחד
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                פלטפורמה מתקדמת המשלבת כלי בניית אתרים מקצועיים, קידום SEO חכם ובינה מלאכותית שתעזור לך להגיע לתוצאות
                מהירות.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="gap-1">
                <Link href="#contact">
                  התחל לבנות עכשיו <Rocket className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features" className="flex items-center gap-1">
                  גלה עוד <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex -space-x-2">
                <Image
                  src="/images/marco.png"
                  alt="משתמש מרוצה"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-background"
                />
                <Image
                  src="/images/vittorio.png"
                  alt="משתמש מרוצה"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-background"
                />
                <Image
                  src="/images/lorem-2.png"
                  alt="משתמש מרוצה"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-background"
                />
              </div>
              <div className="text-muted-foreground">
                מעל <span className="font-medium text-foreground">1,500+</span> אתרים נבנו החודש
              </div>
            </div>
          </div>
          <div className="relative mx-auto aspect-video overflow-hidden rounded-xl border bg-background shadow-xl sm:w-full lg:order-last">
            <Image
              src="/images/hero-stats.png"
              width={550}
              height={550}
              alt="כבר נבנו 1,500 אתרים - סטטיסטיקות מרשימות"
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 p-4">
              <Badge className="bg-primary text-primary-foreground">בינה מלאכותית משולבת</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 relative">
      <div className="absolute inset-0 opacity-5">
        <Image src="/images/vision.png" fill alt="רשת כלים מחוברים" className="object-cover" />
      </div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge className="inline-flex">תכונות מתקדמות</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">כל הכלים שאתה צריך במקום אחד</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              ווב-מאסטר מספקת את כל הכלים הדרושים לבניית אתר מקצועי וקידומו בצורה יעילה ומהירה.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">בונה אתרים מתקדם</CardTitle>
              <CardDescription>
                בנה אתר מקצועי ללא ידע בתכנות. ממשק גרירה ושחרור אינטואיטיבי, תבניות מוכנות מראש ואפשרויות התאמה אישית.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_00000000982461f787889883501f2a1e-Sc7w5fJmYjUdtuqJq49ItrmYlDRXgl.png"
                width={500}
                height={300}
                alt="בונה אתרים מתקדם עם בינה מלאכותית"
                className="rounded-md mb-4"
              />
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>ממשק גרירה ושחרור אינטואיטיבי</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>מאות תבניות מוכנות מראש</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>תמיכה מלאה בעברית ובשפות נוספות</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>50+ תבניות תוכן מוכנות</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">כלי קידום SEO חכמים</CardTitle>
              <CardDescription>
                קדם את האתר שלך במנועי החיפוש עם כלי SEO מתקדמים. ניתוח מילות מפתח, אופטימיזציה אוטומטית ודוחות ביצועים.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-hidden rounded-xl mb-4 group">
                <Image
                  src="/images/seo-ai-advanced.png"
                  width={500}
                  height={300}
                  alt="כלי SEO חכמים עם בינה מלאכותית מתקדמת"
                  className="rounded-xl object-cover w-full transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1 shadow-lg hover:shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <div className="absolute inset-0 bg-blue-500/10 animate-pulse rounded-xl"></div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  <div className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs rounded-md backdrop-blur-sm">
                    AI מתקדם
                  </div>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>ניתוח מילות מפתח מתקדם</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>אופטימיזציה אוטומטית לדפים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>דוחות ביצועים מפורטים</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">ניתוח נתונים מתקדם</CardTitle>
              <CardDescription>
                קבל תובנות מעמיקות על ביצועי האתר שלך. עקוב אחר התנועה, ההמרות והמעורבות כדי לשפר את האסטרטגיה שלך.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image src="/images/vision.png" width={500} height={300} alt="ניתוח נתונים" className="rounded-md mb-4" />
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>לוחות מחוונים מותאמים אישית</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>מעקב אחר המרות ומכירות</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>דוחות תקופתיים אוטומטיים</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">ביצועים מהירים</CardTitle>
              <CardDescription>
                אתרים מהירים וביצועיים שנטענים במהירות ומספקים חוויית משתמש מעולה. אחסון מהיר, CDN גלובלי ואופטימיזציה
                אוטומטית.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src="/images/solution-ai.png"
                width={500}
                height={300}
                alt="ביצועים מהירים"
                className="rounded-md mb-4"
              />
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>אחסון מהיר בענן</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>רשת CDN גלובלית</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>אופטימיזציה אוטומטית לתמונות</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function AiSection() {
  return (
    <section id="ai" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge className="inline-flex">בינה מלאכותית</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">העוזר האישי החכם שלך</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                הכירו את העוזר האישי החכם שלנו המבוסס על בינה מלאכותית מתקדמת. הוא יעזור לך לבנות אתר מקצועי, לכתוב תוכן
                איכותי ולקדם את האתר שלך במנועי החיפוש.
              </p>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-base">יצירת תוכן איכותי בלחיצת כפתור</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-base">המלצות לשיפור ה-SEO בזמן אמת</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-base">עיצוב אתר מותאם אישית לפי הצרכים שלך</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-base">ניתוח נתונים וזיהוי הזדמנויות לשיפור</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-base">אינטגרציה עם פלטפורמות ענן מובילות</span>
              </li>
            </ul>
            <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
              <Button asChild size="lg" className="gap-1">
                <Link href="#contact">
                  נסה את הבינה המלאכותית <Sparkles className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto rounded-xl border bg-background p-4 shadow-xl">
            <div className="mb-4 overflow-hidden rounded-lg">
              <Image
                src="/images/ai-bot-integrations.png"
                width={500}
                height={400}
                alt="העוזר האישי החכם עם אינטגרציות לשירותי ענן"
                className="rounded-lg object-cover w-full transition-transform duration-500 hover:scale-105"
              />
            </div>
            <AiChatbot />
          </div>
        </div>
      </div>
    </section>
  )
}

function AiToolsSection() {
  return (
    <section id="ai-tools" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <Badge className="inline-flex">כלי AI</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">כלי בינה מלאכותית מתקדמים</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              הפלטפורמה שלנו מציעה מגוון כלי בינה מלאכותית שיעזרו לך ליצור תוכן, לעצב אתרים ולקדם את העסק שלך.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ContentGeneratorWidget />

          <SEOAnalyzerWidget />

          <ImageGeneratorWidget />
        </div>
      </div>
    </section>
  )
}

function SitePlansSection() {
  return (
    <section id="site-plans" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <Badge className="inline-flex">תוכניות אתר</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">תוכניות אתר מוכנות מראש</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              העוזר האישי החכם שלנו יכול לבנות עבורך תוכנית אתר מותאמת אישית בהתאם לצרכים שלך. הנה כמה דוגמאות לתוכניות
              אתר שהבוט יכול ליצור:
            </p>
          </div>
          <div className="flex items-center gap-2">
            <LayoutTemplate className="h-5 w-5 text-primary" />
            <span className="text-sm">החלק ימינה ושמאלה לצפייה בתוכניות נוספות</span>
          </div>
        </div>

        <SitePlansCarousel />

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            לא מצאת את התוכנית המתאימה לך? העוזר האישי החכם שלנו יכול ליצור תוכנית מותאמת אישית לפי הצרכים הספציפיים
            שלך.
          </p>
          <Button asChild size="lg" className="gap-1">
            <Link href="#ai">
              צור תוכנית מותאמת אישית <Sparkles className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge className="inline-flex">המלצות</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">לקוחות מרוצים מספרים</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              אלפי לקוחות כבר בנו אתרים מדהימים וקידמו את העסק שלהם עם ווב-מאסטר.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image src="/images/marco.png" alt="רונית לוי" width={60} height={60} className="rounded-full" />
                <div>
                  <CardTitle className="text-lg">רונית לוי</CardTitle>
                  <CardDescription>בעלת חנות אופנה מקוונת</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "ווב-מאסטר שינתה את העסק שלי לחלוטין. בניתי אתר מדהים בתוך יומיים, והכלים לקידום SEO עזרו לי להגיע
                ללקוחות חדשים. העוזר האישי החכם חסך לי שעות של עבודה!"
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image src="/images/vittorio.png" alt="יוסי כהן" width={60} height={60} className="rounded-full" />
                <div>
                  <CardTitle className="text-lg">יוסי כהן</CardTitle>
                  <CardDescription>מנכ"ל חברת הייטק</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "כמנכ"ל חברת הייטק, חיפשתי פתרון מקצועי ומהיר לבניית אתר החברה. ווב-מאסטר סיפקה לנו את כל הכלים הדרושים,
                והתוצאה היא אתר מרשים שמושך לקוחות חדשים."
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image src="/images/lorem-2.png" alt="מיכל אברהם" width={60} height={60} className="rounded-full" />
                <div>
                  <CardTitle className="text-lg">מיכל אברהם</CardTitle>
                  <CardDescription>יועצת שיווק דיגיטלי</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "כיועצת שיווק דיגיטלי, אני ממליצה ללקוחות שלי על ווב-מאסטר. הכלים לקידום SEO הם הטובים ביותר שראיתי,
                והבינה המלאכותית מספקת תובנות מדהימות שעוזרות לשפר את הביצועים."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge className="inline-flex">מחירים</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">תוכניות מחיר שקופות</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              בחר את התוכנית המתאימה לצרכים שלך. כל התוכניות כוללות את כל הכלים הדרושים לבניית אתר מקצועי וקידומו.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">בסיסי</CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">₪1,500</span>
                <span className="text-muted-foreground">/חודש</span>
              </div>
              <CardDescription>מושלם לעסקים קטנים ובינוניים.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>בונה אתרים מתקדם</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>כלי SEO בסיסיים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>5 דפים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>אחסון בענן</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>תמיכה בדוא"ל</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>גישה מוגבלת לעוזר AI</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" asChild>
                <Link href="#contact">התחל עכשיו</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="border-none shadow-lg relative">
            <div className="absolute top-0 right-0 left-0 mx-auto w-fit -translate-y-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              הכי פופולרי
            </div>
            <CardHeader>
              <CardTitle className="text-xl">מקצועי</CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">₪2,000</span>
                <span className="text-muted-foreground">/חודש</span>
              </div>
              <CardDescription>אידיאלי לעסקים צומחים עם צרכים מורכבים.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>כל התכונות של התוכנית הבסיסית</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>כלי SEO מתקדמים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>20 דפים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>ניתוח נתונים מתקדם</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>תמיכה בצ'אט ובדוא"ל</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>גישה מלאה לעוזר AI</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="#contact">התחל עכשיו</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">פרימיום</CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">₪3,000</span>
                <span className="text-muted-foreground">/חודש</span>
              </div>
              <CardDescription>לעסקים גדולים עם דרישות מורכבות.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>כל התכונות של התוכנית המקצועית</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>כלי SEO מותאמים אישית</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>דפים ללא הגבלה</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>אינטגרציות מותאמות אישית</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>תמיכה 24/7 בטלפון, צ'אט ודוא"ל</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>גישה מלאה לעוזר AI עם תכונות מתקדמות</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>מנהל חשבון אישי</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" asChild>
                <Link href="#contact">התחל עכשיו</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted relative">
      <div className="absolute inset-0 opacity-10">
        <Image src="/images/stars.png" fill alt="כוכבים" className="object-cover" />
      </div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">מוכן לבנות את האתר המושלם?</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              הצטרף לאלפי לקוחות מרוצים שכבר בנו אתרים מדהימים וקידמו את העסק שלהם עם ווב-מאסטר.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild size="lg" className="gap-1">
              <Link href="#contact">
                התחל לבנות עכשיו <Rocket className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#team" className="flex items-center gap-1">
                הכירו את הצוות <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-12">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">ווב-מאסטר</span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            אודות
          </Link>
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            תכונות
          </Link>
          <Link href="#portfolio" className="text-sm font-medium hover:underline underline-offset-4">
            העבודות שלנו
          </Link>
          <Link href="#team" className="text-sm font-medium hover:underline underline-offset-4">
            הצוות
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
            מחירים
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
            צור קשר
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            בלוג
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">טוויטר</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <Facebook className="h-5 w-5" />
            <span className="sr-only">פייסבוק</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">אינסטגרם</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">לינקדאין</span>
          </Link>
        </div>
      </div>
      <div className="container mt-4 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} ווב-מאסטר. כל הזכויות שמורות.</p>
        <p className="mt-1">פותח על ידי יוסף אל ישר - מתכנת פול סטק | 058-442342</p>
      </div>
    </footer>
  )
}
