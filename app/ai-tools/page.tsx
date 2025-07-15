import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Wand2, Search, BarChart3, Target, TrendingUp } from "lucide-react"
import { ContentGeneratorWidget } from "@/components/content-generator-widget"
import { SEOAnalyzerWidget } from "@/components/seo-analyzer-widget"
import { ImageGeneratorWidget } from "@/components/image-generator-widget"
import { KeywordResearchWidget } from "@/components/keyword-research-widget"
import { CompetitorAnalysisWidget } from "@/components/competitor-analysis-widget"

export default function AIToolsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* כותרת */}
        <div className="text-center space-y-4 mb-12">
          <Badge className="inline-flex">כלי AI מתקדמים</Badge>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">כלי בינה מלאכותית חכמים</h1>
          <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            מגוון כלי בינה מלאכותית מתקדמים שיעזרו לך ליצור תוכן איכותי, לנתח ולשפר את האתר שלך ולקדם את העסק שלך במנועי
            החיפוש.
          </p>
        </div>

        {/* סטטיסטיקות */}
        <div className="grid gap-4 md:grid-cols-4 mb-12 text-center">
          <div className="space-y-2 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
            <div className="text-3xl font-bold text-primary">5</div>
            <div className="text-sm text-muted-foreground">כלי AI מתקדמים</div>
          </div>
          <div className="space-y-2 p-4 bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-lg">
            <div className="text-3xl font-bold text-green-600">24/7</div>
            <div className="text-sm text-muted-foreground">זמינות מלאה</div>
          </div>
          <div className="space-y-2 p-4 bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">∞</div>
            <div className="text-sm text-muted-foreground">שימוש ללא הגבלה</div>
          </div>
          <div className="space-y-2 p-4 bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">AI</div>
            <div className="text-sm text-muted-foreground">טכנולוגיה מתקדמת</div>
          </div>
        </div>

        {/* רשת כלים */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <ContentGeneratorWidget />
          <SEOAnalyzerWidget />
          <ImageGeneratorWidget />
          <KeywordResearchWidget />
          <CompetitorAnalysisWidget />

          {/* כלי בקרוב */}
          <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">כלים נוספים בקרוב</h3>
              <p className="text-sm text-muted-foreground">
                אנחנו עובדים על כלי AI נוספים שיעזרו לך לשפר את האתר והעסק שלך
              </p>
            </div>
            <Badge variant="outline">בפיתוח</Badge>
          </div>
        </div>

        {/* קטגוריות כלים */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">קטגוריות כלים</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Wand2 className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold">יצירת תוכן</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">כלים ליצירת תוכן איכותי ומקצועי</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  יוצר תוכן
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  יוצר תמונות
                </Badge>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Search className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold">SEO ואופטימיזציה</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">כלים לשיפור דירוג במנועי חיפוש</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  מנתח SEO
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  מילות מפתח
                </Badge>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold">ניתוח ומחקר</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">כלים לניתוח מתחרים ומחקר שוק</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  ניתוח מתחרים
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  מחקר שוק
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* יתרונות */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">למה לבחור בכלי AI שלנו?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">טכנולוגיה מתקדמת</h3>
              <p className="text-sm text-muted-foreground">מבוסס על מודלי AI חדישים</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">דיוק גבוה</h3>
              <p className="text-sm text-muted-foreground">תוצאות מדויקות ואמינות</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">שיפור מתמיד</h3>
              <p className="text-sm text-muted-foreground">הכלים משתפרים כל הזמן</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wand2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">קל לשימוש</h3>
              <p className="text-sm text-muted-foreground">ממשק פשוט ואינטואיטיבי</p>
            </div>
          </div>
        </div>

        {/* קריאה לפעולה */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">מוכן להתחיל?</h2>
          <p className="text-muted-foreground mb-6">הצטרף לאלפי משתמשים שכבר משתמשים בכלי AI שלנו לשיפור העסק שלהם</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/#contact">
                התחל עכשיו
                <ArrowRight className="h-4 w-4 mr-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/">
                חזרה לדף הבית
                <ArrowRight className="h-4 w-4 mr-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
