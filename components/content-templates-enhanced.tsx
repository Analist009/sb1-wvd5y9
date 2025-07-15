"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Search,
  ShoppingBag,
  Share2,
  Mail,
  Globe,
  TrendingUp,
  Users,
  Heart,
  Briefcase,
  GraduationCap,
  Home,
  Utensils,
  Gamepad2,
  Music,
  Camera,
  Plane,
  Dumbbell,
  Baby,
  Sparkles,
  Building,
  Scale,
  DollarSign,
  Car,
  Palette,
  Trophy,
  Joystick,
  Star,
  ArrowUpDown,
  Filter,
} from "lucide-react"

interface ContentTemplate {
  id: string
  title: string
  description: string
  category: string
  contentType: string
  icon: React.ReactNode
  topic: string
  keywords: string
  tone: string
  length: string
  targetAudience: string
  additionalInfo: string
  preview: string
  tags: string[]
  popularity: number
}

interface ContentTemplatesEnhancedProps {
  onSelectTemplate: (template: ContentTemplate) => void
}

export function ContentTemplatesEnhanced({ onSelectTemplate }: ContentTemplatesEnhancedProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null)

  const templates: ContentTemplate[] = [
    // טכנולוגיה
    {
      id: "tech-article",
      title: "מאמר טכנולוגיה",
      description: "מאמר מקצועי על טרנדים טכנולוגיים",
      category: "טכנולוגיה",
      contentType: "article",
      icon: <FileText className="h-5 w-5" />,
      topic: "הטרנדים הטכנולוגיים החמים של 2024",
      keywords: "טכנולוגיה, חדשנות, בינה מלאכותית, דיגיטל",
      tone: "professional",
      length: "long",
      targetAudience: "אנשי טכנולוגיה ומנהלים",
      additionalInfo: "התמקד בהשפעה על העסקים והחברה",
      preview: "בעידן הדיגיטלי המתפתח, טכנולוגיות חדשות משנות את פני התעשייה...",
      tags: ["פופולרי", "מומלץ"],
      popularity: 95,
    },
    {
      id: "ai-guide",
      title: "מדריך בינה מלאכותית",
      description: "מדריך מקיף להבנת בינה מלאכותית",
      category: "טכנולוגיה",
      contentType: "article",
      icon: <Sparkles className="h-5 w-5" />,
      topic: "מדריך למתחילים: מה זה בינה מלאכותית ואיך היא משפיעה עלינו",
      keywords: "בינה מלאכותית, AI, למידת מכונה, עתיד",
      tone: "friendly",
      length: "medium",
      targetAudience: "קהל רחב המתעניין בטכנולוגיה",
      additionalInfo: "הסבר פשוט ונגיש ללא מונחים טכניים מורכבים",
      preview: "בינה מלאכותית נשמעת כמו מדע בדיוני, אבל היא כבר כאן...",
      tags: ["חדש", "מומלץ"],
      popularity: 88,
    },

    // עסקים ופיננסים
    {
      id: "business-guide",
      title: "מדריך עסקי",
      description: "מדריך מקיף לניהול עסק",
      category: "עסקים",
      contentType: "article",
      icon: <Briefcase className="h-5 w-5" />,
      topic: "איך לבנות אסטרטגיית שיווק דיגיטלי מנצחת",
      keywords: "שיווק דיגיטלי, אסטרטגיה, עסקים, ROI",
      tone: "professional",
      length: "very-long",
      targetAudience: "בעלי עסקים ומנהלי שיווק",
      additionalInfo: "כלול דוגמאות מעשיות ומקרי בוחן",
      preview: "שיווק דיגיטלי הוא המפתח להצלחה בעידן המודרני...",
      tags: ["פופולרי"],
      popularity: 92,
    },
    {
      id: "startup-pitch",
      title: "מצגת סטארט-אפ",
      description: "מצגת משכנעת למשקיעים",
      category: "עסקים",
      contentType: "landing-page",
      icon: <TrendingUp className="h-5 w-5" />,
      topic: "מצגת פיץ' לסטארט-אפ טכנולוגי חדשני",
      keywords: "סטארט-אפ, משקיעים, חדשנות, טכנולוגיה",
      tone: "persuasive",
      length: "medium",
      targetAudience: "יזמים ומשקיעים",
      additionalInfo: "כלול נתונים, תחזיות ויתרון תחרותי",
      preview: "אנחנו פותחים מהפכה בתחום הטכנולוגיה...",
      tags: ["חדש"],
      popularity: 76,
    },
    {
      id: "investment-guide",
      title: "מדריך השקעות",
      description: "מדריך להשקעות חכמות",
      category: "פיננסים",
      contentType: "article",
      icon: <DollarSign className="h-5 w-5" />,
      topic: "המדריך המלא להשקעות בבורסה למתחילים",
      keywords: "השקעות, בורסה, פיננסים, תיק השקעות",
      tone: "professional",
      length: "long",
      targetAudience: "משקיעים מתחילים",
      additionalInfo: "כלול אסטרטגיות וניהול סיכונים",
      preview: "השקעה חכמה מתחילה בהבנת העקרונות הבסיסיים...",
      tags: ["מומלץ"],
      popularity: 84,
    },

    // נדל"ן
    {
      id: "real-estate-listing",
      title: "תיאור נכס",
      description: "תיאור מושך לנכס למכירה",
      category: 'נדל"ן',
      contentType: "product-description",
      icon: <Building className="h-5 w-5" />,
      topic: "דירת 4 חדרים יוקרתית בלב תל אביב",
      keywords: "נדלן, דירה, תל אביב, יוקרה, מכירה",
      tone: "persuasive",
      length: "medium",
      targetAudience: "קונים פוטנציאליים",
      additionalInfo: "הדגש על מיקום, מצב ופוטנציאל",
      preview: "דירה יוקרתית עם נוף מרהיב בלב השכונה הנחשקת...",
      tags: ["פופולרי"],
      popularity: 79,
    },
    {
      id: "real-estate-investment",
      title: 'מאמר השקעות נדל"ן',
      description: 'מדריך להשקעה בנדל"ן',
      category: 'נדל"ן',
      contentType: "article",
      icon: <Home className="h-5 w-5" />,
      topic: 'האם כדאי להשקיע בנדל"ן ב-2024? מדריך מקיף',
      keywords: "נדלן, השקעה, שוק הדיור, רווחיות",
      tone: "professional",
      length: "long",
      targetAudience: 'משקיעים בנדל"ן',
      additionalInfo: "כלול ניתוח שוק וסיכונים",
      preview: 'שוק הנדל"ן עובר שינויים דרמטיים השנה...',
      tags: ["חדש", "מומלץ"],
      popularity: 82,
    },

    // בריאות ורפואה
    {
      id: "health-article",
      title: "מאמר בריאות",
      description: "מאמר מקצועי על נושאי בריאות",
      category: "בריאות",
      contentType: "article",
      icon: <Heart className="h-5 w-5" />,
      topic: "10 דרכים טבעיות לשיפור איכות השינה",
      keywords: "שינה, בריאות, רווחה, טיפים טבעיים",
      tone: "friendly",
      length: "medium",
      targetAudience: "אנשים המתעניינים בבריאות טבעית",
      additionalInfo: "הקפד על מידע מדעי מבוסס מחקר",
      preview: "שינה איכותית היא אחד הגורמים החשובים ביותר לבריאות טובה...",
      tags: ["פופולרי", "מומלץ"],
      popularity: 91,
    },
    {
      id: "nutrition-guide",
      title: "מדריך תזונה",
      description: "מדריך תזונה בריאה",
      category: "בריאות",
      contentType: "article",
      icon: <Utensils className="h-5 w-5" />,
      topic: "התזונה הים-תיכונית: מדריך שלב אחר שלב",
      keywords: "תזונה, דיאטה ים תיכונית, בריאות, מתכונים",
      tone: "friendly",
      length: "long",
      targetAudience: "אנשים המעוניינים בתזונה בריאה",
      additionalInfo: "כלול רשימת קניות ומתכונים",
      preview: "הדיאטה הים-תיכונית נחשבת לאחת הבריאות בעולם...",
      tags: ["מומלץ"],
      popularity: 87,
    },

    // אופנה ויופי
    {
      id: "fashion-product",
      title: "מוצר אופנה",
      description: "תיאור מושך למוצר אופנה",
      category: "אופנה",
      contentType: "product-description",
      icon: <ShoppingBag className="h-5 w-5" />,
      topic: "חולצת כותנה אורגנית בעיצוב מינימליסטי",
      keywords: "אופנה, כותנה אורגנית, מינימליזם, איכות",
      tone: "creative",
      length: "short",
      targetAudience: "צעירים המתעניינים באופנה בת קיימא",
      additionalInfo: "הדגש על איכות החומרים והעיצוב הייחודי",
      preview: "חולצה שמשלבת נוחות מקסימלית עם סטייל מינימליסטי...",
      tags: ["פופולרי"],
      popularity: 73,
    },
    {
      id: "beauty-review",
      title: "ביקורת מוצר יופי",
      description: "ביקורת מפורטת על מוצר יופי",
      category: "יופי",
      contentType: "article",
      icon: <Palette className="h-5 w-5" />,
      topic: "ביקורת: הקרם החדש שמבטיח לחסל קמטים תוך 30 יום",
      keywords: "יופי, קרם אנטי אייג'ינג, קוסמטיקה, ביקורת",
      tone: "friendly",
      length: "medium",
      targetAudience: "נשים המתעניינות בקוסמטיקה",
      additionalInfo: "כלול בדיקה מקצועית ותוצאות אמיתיות",
      preview: "בדקנו את הקרם החדש שכולם מדברים עליו...",
      tags: ["חדש"],
      popularity: 68,
    },

    // רכב
    {
      id: "car-review",
      title: "ביקורת רכב",
      description: "ביקורת מקצועית על רכב חדש",
      category: "רכב",
      contentType: "article",
      icon: <Car className="h-5 w-5" />,
      topic: "ביקורת: הרכב החשמלי החדש שמשנה את כללי המשחק",
      keywords: "רכב חשמלי, ביקורת, טכנולוגיה, סביבה",
      tone: "professional",
      length: "long",
      targetAudience: "חובבי רכב ונהגים",
      additionalInfo: "כלול נתוני ביצועים, בטיחות ומחיר",
      preview: "הרכב החשמלי החדש מציב סטנדרט חדש בתעשייה...",
      tags: ["חדש", "מומלץ"],
      popularity: 75,
    },

    // משפטי
    {
      id: "legal-guide",
      title: "מדריך משפטי",
      description: "מדריך לזכויות המשתמש",
      category: "משפטי",
      contentType: "article",
      icon: <Scale className="h-5 w-5" />,
      topic: "המדריך המלא לזכויות העובד בישראל",
      keywords: "זכויות עובד, חוק עבודה, משפט, הגנה",
      tone: "professional",
      length: "very-long",
      targetAudience: "עובדים ומעסיקים",
      additionalInfo: "כלול דוגמאות ומקרי מבחן",
      preview: "כל עובד בישראל זכאי למגוון זכויות שחשוב להכיר...",
      tags: ["מומלץ"],
      popularity: 71,
    },

    // חינוך
    {
      id: "course-landing",
      title: "עמוד נחיתה לקורס",
      description: "תוכן לעמוד נחיתה של קורס מקוון",
      category: "חינוך",
      contentType: "landing-page",
      icon: <GraduationCap className="h-5 w-5" />,
      topic: "קורס שיווק דיגיטלי מקיף - מאפס ועד מקצוען",
      keywords: "קורס, שיווק דיגיטלי, הכשרה, מקוון, תעודה",
      tone: "persuasive",
      length: "long",
      targetAudience: "אנשים המעוניינים בקריירה בשיווק דיגיטלי",
      additionalInfo: "כלול עדויות, תכנית לימודים ומחיר מיוחד",
      preview: "הפוך למומחה שיווק דיגיטלי תוך 8 שבועות בלבד...",
      tags: ["פופולרי"],
      popularity: 89,
    },
    {
      id: "educational-content",
      title: "תוכן לימודי",
      description: "חומר לימודי אינטראקטיבי",
      category: "חינוך",
      contentType: "article",
      icon: <FileText className="h-5 w-5" />,
      topic: "מדריך ללימוד שפות זרות בשיטה יעילה",
      keywords: "לימוד שפות, שיטות לימוד, חינוך, הישגים",
      tone: "friendly",
      length: "medium",
      targetAudience: "תלמידים ומבוגרים הלומדים שפות",
      additionalInfo: "כלול טכניקות מעשיות וכלים דיגיטליים",
      preview: "לימוד שפה זרה לא חייב להיות משימה מפחידה...",
      tags: ["מומלץ"],
      popularity: 77,
    },

    // ספורט וכושר
    {
      id: "fitness-blog",
      title: "פוסט בלוג כושר",
      description: "מאמר על כושר ובריאות",
      category: "כושר",
      contentType: "article",
      icon: <Dumbbell className="h-5 w-5" />,
      topic: "תוכנית אימונים ביתית ל-30 דקות ביום",
      keywords: "כושר, אימון ביתי, תוכנית, בריאות, 30 דקות",
      tone: "friendly",
      length: "medium",
      targetAudience: "אנשים המעוניינים להתחיל להתאמן בבית",
      additionalInfo: "כלול תמונות הדגמה ורשימת ציוד נדרש",
      preview: "רוצים להתחיל להתאמן אבל אין זמן לחדר כושר? הנה הפתרון...",
      tags: ["פופולרי"],
      popularity: 85,
    },
    {
      id: "sports-news",
      title: "חדשות ספורט",
      description: "כתבה ספורטיבית עדכנית",
      category: "ספורט",
      contentType: "article",
      icon: <Trophy className="h-5 w-5" />,
      topic: "ניתוח: איך הקבוצה הישראלית הצליחה להדהים את אירופה",
      keywords: "ספורט, כדורגל, הישג, ישראל, אירופה",
      tone: "creative",
      length: "medium",
      targetAudience: "אוהדי ספורט ישראלים",
      additionalInfo: "כלול סטטיסטיקות ודעות מומחים",
      preview: "ההישג המדהים של הקבוצה הישראלית הלילה...",
      tags: ["חדש"],
      popularity: 72,
    },

    // משחקים
    {
      id: "game-review",
      title: "ביקורת משחק",
      description: "ביקורת מקצועية על משחק חדש",
      category: "משחקים",
      contentType: "article",
      icon: <Joystick className="h-5 w-5" />,
      topic: "ביקורת: המשחק החדש שכולם מחכים לו",
      keywords: "משחקי וידאו, ביקורת, גיימינג, בידור",
      tone: "casual",
      length: "long",
      targetAudience: "גיימרים וחובבי משחקי וידאו",
      additionalInfo: "כלול ציונים, יתרונות וחסרונות",
      preview: "המשחק החדש הגיע סוף סוף ואנחנו בדקנו אותו בפירוט...",
      tags: ["חדש"],
      popularity: 69,
    },

    // תיירות ונסיעות
    {
      id: "travel-seo",
      title: "תוכן SEO תיירות",
      description: "מדריך תיירות מותאם SEO",
      category: "תיירות",
      contentType: "seo-content",
      icon: <Plane className="h-5 w-5" />,
      topic: "המדריך המלא לטיול בירושלים - אטרקציות חובה",
      keywords: "ירושלים, טיול, אטרקציות, תיירות, מדריך",
      tone: "friendly",
      length: "long",
      targetAudience: "תיירים המתכננים ביקור בירושלים",
      additionalInfo: "כלול מפות, מחירים וטיפים מעשיים",
      preview: "ירושלים היא עיר מרתקת עם היסטוריה עשירה...",
      tags: ["פופולרי", "מומלץ"],
      popularity: 86,
    },

    // הורות ומשפחה
    {
      id: "parenting-tips",
      title: "טיפים להורים",
      description: "מאמר עם טיפים מעשיים להורים",
      category: "הורות",
      contentType: "article",
      icon: <Baby className="h-5 w-5" />,
      topic: "איך להתמודד עם התקפי זעם של ילדים",
      keywords: "הורות, ילדים, התקפי זעם, חינוך, טיפים",
      tone: "friendly",
      length: "medium",
      targetAudience: "הורים צעירים",
      additionalInfo: "כלול דוגמאות מעשיות ועצות מומחים",
      preview: "התקפי זעם הם חלק טבעי מהתפתחות הילד...",
      tags: ["פופולרי"],
      popularity: 83,
    },

    // מוזיקה ואמנות
    {
      id: "music-review",
      title: "ביקורת מוזיקה",
      description: "ביקורת על אלבום או אמן",
      category: "מוזיקה",
      contentType: "article",
      icon: <Music className="h-5 w-5" />,
      topic: "ביקורת: האלבום החדש של הזמר הישראלי המוביל",
      keywords: "מוזיקה, ביקורת, אלבום, זמר ישראלי",
      tone: "creative",
      length: "medium",
      targetAudience: "חובבי מוזיקה ישראלית",
      additionalInfo: "כלול ניתוח מוזיקלי והשוואה לעבודות קודמות",
      preview: "האלבום החדש מציג צד חדש ומפתיע של האמן...",
      tags: ["חדש"],
      popularity: 74,
    },

    // רשתות חברתיות (עוד תבניות)
    {
      id: "instagram-post",
      title: "פוסט אינסטגרם",
      description: "פוסט מושך לאינסטגרם",
      category: "רשתות חברתיות",
      contentType: "social-media",
      icon: <Camera className="h-5 w-5" />,
      topic: "טיפים לצילום מוצרים בבית",
      keywords: "צילום, מוצרים, טיפים, DIY, אינסטגרם",
      tone: "casual",
      length: "short",
      targetAudience: "יזמים צעירים ובלוגרים",
      additionalInfo: "כלול קריאה לפעולה ואמוג'ים",
      preview: "📸 רוצים לצלם את המוצרים שלכם כמו מקצוענים? הנה 5 טיפים פשוטים...",
      tags: ["פופולרי"],
      popularity: 81,
    },
    {
      id: "linkedin-post",
      title: "פוסט לינקדאין",
      description: "פוסט מקצועי ללינקדאין",
      category: "רשתות חברתיות",
      contentType: "social-media",
      icon: <Users className="h-5 w-5" />,
      topic: "השיעור החשוב שלמדתי מהכישלון הגדול שלי",
      keywords: "קריירה, למידה, כישלון, הצלחה, מנהיגות",
      tone: "professional",
      length: "medium",
      targetAudience: "אנשי מקצוע ומנהלים",
      additionalInfo: "שתף סיפור אישי עם לקח מקצועי",
      preview: "לפני 3 שנים עשיתי את הטעות הגדולה ביותר בקריירה שלי...",
      tags: ["מומלץ"],
      popularity: 88,
    },

    // שיווק ומכירות (עוד תבניות)
    {
      id: "welcome-email",
      title: "אימייל ברוכים הבאים",
      description: "אימייל קבלת פנים ללקוחות חדשים",
      category: "שיווק",
      contentType: "email-marketing",
      icon: <Mail className="h-5 w-5" />,
      topic: "ברוכים הבאים למשפחת החנות שלנו!",
      keywords: "ברוכים הבאים, לקוח חדש, הטבה, קהילה",
      tone: "friendly",
      length: "medium",
      targetAudience: "לקוחות חדשים",
      additionalInfo: "כלול הטבה ללקוח חדש וקישורים חשובים",
      preview: "שלום וברוכים הבאים! אנחנו כל כך שמחים שהצטרפתם אלינו...",
      tags: ["פופולרי"],
      popularity: 90,
    },
    {
      id: "sale-email",
      title: "אימייל מבצע",
      description: "אימייל לקידום מבצע מיוחד",
      category: "שיווק",
      contentType: "email-marketing",
      icon: <TrendingUp className="h-5 w-5" />,
      topic: "מבצע סוף שבוע - 50% הנחה על כל המוצרים!",
      keywords: "מבצע, הנחה, סוף שבוע, חיסכון, מוגבל",
      tone: "persuasive",
      length: "short",
      targetAudience: "לקוחות קיימים",
      additionalInfo: "צור תחושת דחיפות ומגבל זמן",
      preview: "⏰ רק 48 שעות! המבצע הגדול של השנה כאן...",
      tags: ["פופולרי"],
      popularity: 87,
    },

    // עסקים מקומיים
    {
      id: "local-seo",
      title: "תוכן SEO מקומי",
      description: "תוכן מותאם לחיפוש מקומי",
      category: "עסקים מקומיים",
      contentType: "seo-content",
      icon: <Home className="h-5 w-5" />,
      topic: "המדריך המלא לבחירת קבלן שיפוצים בתל אביב",
      keywords: "קבלן שיפוצים, תל אביב, שיפוצים, בנייה, מקומי",
      tone: "professional",
      length: "very-long",
      targetAudience: "תושבי תל אביב המתכננים שיפוצים",
      additionalInfo: "כלול טיפים מקומיים ורשימת בדיקות",
      preview: "מחפשים קבלן שיפוצים אמין בתל אביב? הנה המדריך המלא...",
      tags: ["מומלץ"],
      popularity: 78,
    },

    // טכנולוגיה ואפליקציות
    {
      id: "app-landing",
      title: "עמוד נחיתה לאפליקציה",
      description: "תוכן לעמוד נחיתה של אפליקציה",
      category: "טכנולוגיה",
      contentType: "landing-page",
      icon: <Globe className="h-5 w-5" />,
      topic: "אפליקציית ניהול כספים אישיים חכמה",
      keywords: "אפליקציה, כספים, ניהול, חכם, חיסכון",
      tone: "professional",
      length: "medium",
      targetAudience: "אנשים המעוניינים בניהול כספים טוב יותר",
      additionalInfo: "הדגש על הבטיחות והפשטות",
      preview: "נהל את הכספים שלך בצורה חכמה ובטוחה...",
      tags: ["חדש", "מומלץ"],
      popularity: 80,
    },
  ]

  const categoryIcons = {
    all: <FileText className="h-4 w-4" />,
    טכנולוגיה: <Gamepad2 className="h-4 w-4 text-blue-500" />,
    עסקים: <Briefcase className="h-4 w-4 text-green-500" />,
    פיננסים: <DollarSign className="h-4 w-4 text-yellow-500" />,
    'נדל"ן': <Building className="h-4 w-4 text-gray-500" />,
    בריאות: <Heart className="h-4 w-4 text-red-500" />,
    אופנה: <ShoppingBag className="h-4 w-4 text-pink-500" />,
    יופי: <Palette className="h-4 w-4 text-purple-500" />,
    רכב: <Car className="h-4 w-4 text-blue-600" />,
    משפטי: <Scale className="h-4 w-4 text-gray-600" />,
    חינוך: <GraduationCap className="h-4 w-4 text-indigo-500" />,
    כושר: <Dumbbell className="h-4 w-4 text-orange-500" />,
    ספורט: <Trophy className="h-4 w-4 text-amber-500" />,
    משחקים: <Joystick className="h-4 w-4 text-violet-500" />,
    תיירות: <Plane className="h-4 w-4 text-sky-500" />,
    הורות: <Baby className="h-4 w-4 text-rose-500" />,
    מוזיקה: <Music className="h-4 w-4 text-emerald-500" />,
    "רשתות חברתיות": <Share2 className="h-4 w-4 text-blue-400" />,
    שיווק: <TrendingUp className="h-4 w-4 text-green-600" />,
    "עסקים מקומיים": <Home className="h-4 w-4 text-brown-500" />,
  }

  const categories = ["all", ...Array.from(new Set(templates.map((t) => t.category)))]

  const sortedAndFilteredTemplates = templates
    .filter((template) => {
      const matchesSearch =
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity - a.popularity
        case "newest":
          return a.tags.includes("חדש") ? -1 : b.tags.includes("חדש") ? 1 : 0
        case "alphabetical":
          return a.title.localeCompare(b.title, "he")
        default:
          return 0
      }
    })

  const handleSelectTemplate = (template: ContentTemplate) => {
    onSelectTemplate(template)
  }

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "פופולרי":
        return "bg-red-100 text-red-800 border-red-200"
      case "חדש":
        return "bg-green-100 text-green-800 border-green-200"
      case "מומלץ":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* כותרת ונתונים */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">תבניות תוכן מוכנות</h2>
          <p className="text-muted-foreground">
            {templates.length} תבניות ב-{categories.length - 1} קטגוריות שונות
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">חסוך זמן עם תבניות מוכנות</span>
        </div>
      </div>

      {/* חיפוש וסינון */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="חפש תבניות לפי שם, תיאור או תגיות..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <ArrowUpDown className="h-4 w-4 ml-2" />
              <SelectValue placeholder="מיון לפי" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">פופולריות</SelectItem>
              <SelectItem value="newest">החדשות ביותר</SelectItem>
              <SelectItem value="alphabetical">א-ב</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* קטגוריות */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="gap-2 transition-all duration-200"
            >
              {categoryIcons[category] || <FileText className="h-4 w-4" />}
              {category === "all" ? "הכל" : category}
              <span className="text-xs opacity-70">
                ({category === "all" ? templates.length : templates.filter((t) => t.category === category).length})
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* רשת תבניות */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedAndFilteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
          >
            {/* תגיות בפינה */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1 z-10">
              {template.tags.map((tag, index) => (
                <Badge
                  key={index}
                  className={`text-xs px-2 py-1 border ${getTagColor(tag)} transition-all duration-200`}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* ציון פופולריות */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 z-10">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-xs font-medium">{template.popularity}</span>
            </div>

            <CardHeader className="pb-3 pt-12">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{template.title}</CardTitle>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {template.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardDescription className="text-sm mt-2">{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">נושא: </span>
                  <span className="text-muted-foreground line-clamp-2">{template.topic}</span>
                </div>
                <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg italic border-r-2 border-primary/20">
                  "{template.preview}..."
                </div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <div className="flex gap-1 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {template.contentType === "article" && "מאמר"}
                    {template.contentType === "product-description" && "מוצר"}
                    {template.contentType === "social-media" && "רשתות"}
                    {template.contentType === "email-marketing" && "אימייל"}
                    {template.contentType === "landing-page" && "נחיתה"}
                    {template.contentType === "seo-content" && "SEO"}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedTemplate(template)}>
                        פרטים
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          {template.icon}
                          {template.title}
                        </DialogTitle>
                        <DialogDescription>{template.description}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        {/* תגיות וציון */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {template.tags.map((tag, index) => (
                              <Badge key={index} className={`text-xs ${getTagColor(tag)}`}>
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{template.popularity}/100</span>
                          </div>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                          <div>
                            <span className="text-sm font-medium">קטגוריה:</span>
                            <p className="text-sm text-muted-foreground">{template.category}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium">סוג תוכן:</span>
                            <p className="text-sm text-muted-foreground">
                              {template.contentType === "article" && "מאמר מקצועי"}
                              {template.contentType === "product-description" && "תיאור מוצר"}
                              {template.contentType === "social-media" && "תוכן לרשתות חברתיות"}
                              {template.contentType === "email-marketing" && "אימייל שיווקי"}
                              {template.contentType === "landing-page" && "עמוד נחיתה"}
                              {template.contentType === "seo-content" && "תוכן SEO"}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm font-medium">טון כתיבה:</span>
                            <p className="text-sm text-muted-foreground">
                              {template.tone === "professional" && "מקצועי"}
                              {template.tone === "friendly" && "ידידותי"}
                              {template.tone === "casual" && "רגיל"}
                              {template.tone === "creative" && "יצירתי"}
                              {template.tone === "persuasive" && "משכנע"}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm font-medium">אורך:</span>
                            <p className="text-sm text-muted-foreground">
                              {template.length === "short" && "קצר"}
                              {template.length === "medium" && "בינוני"}
                              {template.length === "long" && "ארוך"}
                              {template.length === "very-long" && "מאוד ארוך"}
                            </p>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium">נושא:</span>
                          <p className="text-sm text-muted-foreground">{template.topic}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">מילות מפתח:</span>
                          <p className="text-sm text-muted-foreground">{template.keywords}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">קהל יעד:</span>
                          <p className="text-sm text-muted-foreground">{template.targetAudience}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">מידע נוסף:</span>
                          <p className="text-sm text-muted-foreground">{template.additionalInfo}</p>
                        </div>
                        <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-4 rounded-lg border-r-4 border-primary">
                          <span className="text-sm font-medium">תצוגה מקדימה:</span>
                          <p className="text-sm text-muted-foreground italic mt-1">"{template.preview}..."</p>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button onClick={() => handleSelectTemplate(template)} className="flex-1 gap-2">
                            <Sparkles className="h-4 w-4" />
                            השתמש בתבנית
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    onClick={() => handleSelectTemplate(template)}
                    className="gap-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-200"
                  >
                    <Sparkles className="h-3 w-3" />
                    השתמש
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* הודעה במקרה של אין תוצאות */}
      {sortedAndFilteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">לא נמצאו תבניות</h3>
          <p className="text-muted-foreground mb-4">נסה לשנות את מונחי החיפוש או הקטגוריה</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
            }}
          >
            <Filter className="h-4 w-4 ml-2" />
            נקה פילטרים
          </Button>
        </div>
      )}

      {/* סטטיסטיקות */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{templates.length}</div>
            <div className="text-sm text-muted-foreground">תבניות זמינות</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{categories.length - 1}</div>
            <div className="text-sm text-muted-foreground">קטגוריות</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(templates.reduce((acc, t) => acc + t.popularity, 0) / templates.length)}
            </div>
            <div className="text-sm text-muted-foreground">ציון איכות ממוצע</div>
          </div>
        </div>
      </div>
    </div>
  )
}
