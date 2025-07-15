import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  FileText,
  Search,
  ImageIcon,
  Target,
  Users,
  TrendingUp,
  Zap,
  Star,
  ArrowRight,
  Sparkles,
  BarChart3,
  Globe,
} from "lucide-react"

export const metadata: Metadata = {
  title: "כלי AI מתקדמים | Streamline",
  description: "גלה את מגוון כלי הבינה המלאכותית המתקדמים שלנו - יוצר תוכן, מנתח SEO, יוצר תמונות ועוד",
}

const aiTools = [
  {
    id: "content-generator",
    title: "יוצר תוכן חכם",
    description: "צור תוכן איכותי ומקצועי עם 50+ תבניות מוכנות",
    icon: <FileText className="h-8 w-8" />,
    href: "/content-generator",
    color: "bg-blue-500",
    features: ["50+ תבניות", "תוכן מותאם אישית", "טונים שונים", "אופטימיזציה לSEO"],
    stats: { users: "10K+", rating: 4.9 },
    badge: "פופולרי",
  },
  {
    id: "seo-analyzer",
    title: "מנתח SEO מתקדם",
    description: "נתח ושפר את ביצועי האתר שלך עם המלצות מותאמות אישית",
    icon: <Search className="h-8 w-8" />,
    href: "/seo-analyzer",
    color: "bg-green-500",
    features: ["ניתוח מקיף", "המלצות מעשיות", "מעקב ביצועים", "דוחות מפורטים"],
    stats: { users: "8K+", rating: 4.8 },
    badge: "מומלץ",
  },
  {
    id: "image-generator",
    title: "יוצר תמונות AI",
    description: "צור תמונות מדהימות ואיכותיות באמצעות בינה מלאכותית",
    icon: <ImageIcon className="h-8 w-8" />,
    href: "/image-generator",
    color: "bg-purple-500",
    features: ["איכות גבוהה", "סגנונות מגוונים", "יצירה מהירה", "רזולוציות שונות"],
    stats: { users: "12K+", rating: 4.7 },
    badge: "חדש",
  },
  {
    id: "keyword-research",
    title: "מחקר מילות מפתח",
    description: "גלה מילות מפתח רווחיות ונתח את התחרותיות בשוק",
    icon: <Target className="h-8 w-8" />,
    href: "/keyword-research",
    color: "bg-orange-500",
    features: ["נפח חיפושים", "ניתוח תחרותיות", "מילות מפתח קשורות", "טרנדים עונתיים"],
    stats: { users: "6K+", rating: 4.6 },
    badge: "חדש",
  },
  {
    id: "competitor-analysis",
    title: "ניתוח מתחרים",
    description: "נתח את המתחרים שלך וגלה הזדמנויות חדשות לצמיחה",
    icon: <Users className="h-8 w-8" />,
    href: "/competitor-analysis",
    color: "bg-red-500",
    features: ["זיהוי מתחרים", "ניתוח SEO", "פערי תוכן", "אסטרטגיות שיווק"],
    stats: { users: "4K+", rating: 4.5 },
    badge: "חדש",
  },
]

const stats = [
  { label: "משתמשים פעילים", value: "40K+", icon: <Users className="h-5 w-5" /> },
  { label: "תוכן שנוצר", value: "500K+", icon: <FileText className="h-5 w-5" /> },
  { label: "דירוג ממוצע", value: "4.8/5", icon: <Star className="h-5 w-5" /> },
  { label: "זמן חיסכון", value: "80%", icon: <TrendingUp className="h-5 w-5" /> },
]

export default function AIToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            כלי AI מתקדמים
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            כלי בינה מלאכותית
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              לעסק המודרני
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            גלה את מגוון כלי הבינה המלאכותית המתקדמים שלנו שיעזרו לך ליצור תוכן איכותי, לשפר את ביצועי האתר ולהגדיל את
            העסק שלך
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
                  {stat.icon}
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">הכלים שלנו</h2>
            <p className="text-lg text-gray-600">בחר את הכלי המתאים לצרכים שלך</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {aiTools.map((tool) => (
              <Card
                key={tool.id}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${tool.color} text-white group-hover:scale-110 transition-transform duration-300`}
                    >
                      {tool.icon}
                    </div>
                    {tool.badge && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {tool.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl mb-2">{tool.title}</CardTitle>
                  <CardDescription className="text-gray-600">{tool.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-700">תכונות עיקריות:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                          <div className="w-1 h-1 bg-blue-500 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {tool.stats.users}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {tool.stats.rating}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href={tool.href}>
                    <Button className="w-full group-hover:bg-blue-600 transition-colors duration-300">
                      התחל עכשיו
                      <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">למה לבחור בכלים שלנו?</h2>
            <p className="text-lg text-gray-600">יתרונות שיעזרו לך להצליח</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: "מהיר ויעיל",
                description: "תוצאות מיידיות וחיסכון בזמן משמעותי",
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "מבוסס נתונים",
                description: "החלטות מבוססות על נתונים אמיתיים וניתוחים מדויקים",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "תמיכה בעברית",
                description: "כלים מותאמים לשוק הישראלי ולשפה העברית",
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "איכות גבוהה",
                description: "תוצאות מקצועיות ברמה הגבוהה ביותר",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-white/20"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">מוכן להתחיל?</h2>
            <p className="text-xl mb-6 opacity-90">הצטרף לאלפי עסקים שכבר משתמשים בכלים שלנו להגדלת הצמיחה</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/content-generator">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  התחל עם יוצר התוכן
                  <Sparkles className="h-5 w-5 mr-2" />
                </Button>
              </Link>
              <Link href="/seo-analyzer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  נתח את האתר שלך
                  <Search className="h-5 w-5 mr-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
