"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  Book,
  Scale,
  Coins,
  Car,
  Palette,
  ClubIcon as Football,
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
  tags?: string[]
}

interface ContentTemplatesProps {
  onSelectTemplate: (template: ContentTemplate) => void
}

const categoryIcons: { [key: string]: React.ReactNode } = {
  טכנולוגיה: <FileText className="h-5 w-5 text-blue-500" />,
  עסקים: <Briefcase className="h-5 w-5 text-green-500" />,
  בריאות: <Heart className="h-5 w-5 text-red-500" />,
  אופנה: <ShoppingBag className="h-5 w-5 text-pink-500" />,
  מזון: <Utensils className="h-5 w-5 text-yellow-500" />,
  "רשתות חברתיות": <Share2 className="h-5 w-5 text-purple-500" />,
  שיווק: <TrendingUp className="h-5 w-5 text-orange-500" />,
  חינוך: <GraduationCap className="h-5 w-5 text-teal-500" />,
  "עסקים מקומיים": <Home className="h-5 w-5 text-stone-500" />,
  תיירות: <Plane className="h-5 w-5 text-sky-500" />,
  כושר: <Dumbbell className="h-5 w-5 text-amber-500" />,
  הורות: <Baby className="h-5 w-5 text-rose-500" />,
  מוזיקה: <Music className="h-5 w-5 text-lime-500" />,
  'נדל"ן': <Building className="h-5 w-5 text-emerald-500" />,
  משפטי: <Scale className="h-5 w-5 text-indigo-500" />,
  פיננסים: <Coins className="h-5 w-5 text-yellow-600" />,
  רכב: <Car className="h-5 w-5 text-gray-600" />,
  יופי: <Palette className="h-5 w-5 text-fuchsia-500" />,
  ספורט: <Football className="h-5 w-5 text-orange-600" />,
  משחקים: <Gamepad2 className="h-5 w-5 text-cyan-500" />,
}

export function ContentTemplates({ onSelectTemplate }: ContentTemplatesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null)
  const [sortBy, setSortBy] = useState<"popularity" | "newest" | "alphabetical">("popularity")

  const templates: ContentTemplate[] = [
    // מאמרים מקצועיים
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
      tags: ["פופולרי"],
    },
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
      tags: ["מומלץ"],
    },
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
      tags: ["חדש"],
    },

    // תיאורי מוצרים
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
    },
    {
      id: "tech-product",
      title: "מוצר טכנולוגי",
      description: "תיאור מפורט למוצר טכנולוגי",
      category: "טכנולוגיה",
      contentType: "product-description",
      icon: <Gamepad2 className="h-5 w-5" />,
      topic: "אוזניות אלחוטיות עם ביטול רעשים מתקדם",
      keywords: "אוזניות, אלחוטי, ביטול רעשים, איכות שמע",
      tone: "professional",
      length: "medium",
      targetAudience: "חובבי טכנולוגיה ומוזיקה",
      additionalInfo: "הדגש על התכונות הטכניות והיתרונות",
      preview: "חווית שמע מהפכנית עם טכנולוגיית ביטול רעשים מתקדמת...",
    },
    {
      id: "food-product",
      title: "מוצר מזון",
      description: "תיאור מפתה למוצר מזון",
      category: "מזון",
      contentType: "product-description",
      icon: <Utensils className="h-5 w-5" />,
      topic: "דבש טבעי מפרחי בר ישראליים",
      keywords: "דבש, טבעי, ישראלי, אורגני, בריאות",
      tone: "friendly",
      length: "short",
      targetAudience: "אנשים המעוניינים במזון טבעי ובריא",
      additionalInfo: "הדגש על המקור הטבעי והטעם הייחודי",
      preview: "דבש זהוב וטעים שנאסף מפרחי הבר הישראליים...",
    },

    // תוכן לרשתות חברתיות
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
    },
    {
      id: "facebook-event",
      title: "אירוע פייסבוק",
      description: "הזמנה לאירוע בפייסבוק",
      category: "רשתות חברתיות",
      contentType: "social-media",
      icon: <Share2 className="h-5 w-5" />,
      topic: "סדנת יוגה בחוף הים - רגיעה ושקיעה",
      keywords: "יוגה, חוף הים, סדנה, רגיעה, אירוע",
      tone: "friendly",
      length: "short",
      targetAudience: "אנשים המתעניינים ביוגה ורווחה",
      additionalInfo: "כלול פרטי מקום, זמן ומחיר",
      preview: "🧘‍♀️ הצטרפו אלינו לסדנת יוגה מיוחדת על חוף הים...",
    },

    // אימיילים שיווקיים
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
    },

    // עמודי נחיתה
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
    },
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
    },

    // תוכן SEO
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
    },
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
    },

    // תוכן נוסף
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
    },
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
    },
    {
      id: "music-review",
      title: "ביקורת מוזיקה",
      description: "ביקורת על אלבום או אמן",
      category: "מוזיקה",
      contentType: "article",
      icon: <Music className="h-5 w-5" />,
      topic: "ביקורת: האלבום החדש של הזמר הישראלי המוביל",
      keywords: "מוזיקה, ביקורת, אלבום, זמר ישראלי, ביקורת",
      tone: "creative",
      length: "medium",
      targetAudience: "חובבי מוזיקה ישראלית",
      additionalInfo: "כלול ניתוח מוזיקלי והשוואה לעבודות קודמות",
      preview: "האלבום החדש מציג צד חדש ומפתיע של האמן...",
    },
    {
      id: "real-estate-investment",
      title: 'מאמר השקעה בנדל"ן',
      description: 'מאמר על השקעות נדל"ן',
      category: 'נדל"ן',
      contentType: "article",
      icon: <Building className="h-5 w-5" />,
      topic: 'השקעה בנדל"ן מניב בישראל - הזדמנויות ואתגרים',
      keywords: 'נדל"ן, השקעה, מניב, ישראל, הזדמנויות',
      tone: "professional",
      length: "long",
      targetAudience: 'משקיעים פוטנציאליים בנדל"ן',
      additionalInfo: "ניתוח שוק, טיפים לבחירת נכס, ניהול סיכונים",
      preview: 'השקעה בנדל"ן מניב בישראל יכולה להיות אפיק רווחי...',
      tags: ["מומלץ"],
    },
    {
      id: "property-description",
      title: "תיאור נכס",
      description: "תיאור נכס למכירה או השכרה",
      category: 'נדל"ן',
      contentType: "product-description",
      icon: <Building className="h-5 w-5" />,
      topic: "דירת 4 חדרים חדשה בפרויקט יוקרה בתל אביב",
      keywords: "דירה, תל אביב, יוקרה, חדשה, למכירה",
      tone: "persuasive",
      length: "medium",
      targetAudience: "מחפשי דירות בתל אביב",
      additionalInfo: "פירוט היתרונות, מיקום, מחיר, פרטי קשר",
      preview: "למכירה דירת 4 חדרים מדהימה בפרויקט יוקרה...",
      tags: ["חדש"],
    },
    {
      id: "online-course-description",
      title: "תיאור קורס מקוון",
      description: "תיאור קורס מקוון",
      category: "חינוך",
      contentType: "landing-page",
      icon: <Book className="h-5 w-5" />,
      topic: "קורס תכנות Python למתחילים",
      keywords: "קורס, תכנות, Python, מתחילים, מקוון",
      tone: "friendly",
      length: "medium",
      targetAudience: "אנשים שרוצים ללמוד תכנות",
      additionalInfo: "תכנית לימודים, דרישות קדם, מחיר",
      preview: "למדו לתכנת בפייתון בקלות ובכיף!",
    },
    {
      id: "legal-rights-article",
      title: "מאמר זכויות משפטיות",
      description: "מאמר על זכויות משפטיות",
      category: "משפטי",
      contentType: "article",
      icon: <Scale className="h-5 w-5" />,
      topic: "זכויות עובדים במקרה פיטורים",
      keywords: "זכויות, עובדים, פיטורים, משפטי, חוק",
      tone: "professional",
      length: "long",
      targetAudience: "עובדים שפוטרו או עומדים בפני פיטורים",
      additionalInfo: "פירוט הזכויות, מה לעשות במקרה של הפרה",
      preview: "מהן הזכויות שלך במקרה של פיטורים?...",
    },
    {
      id: "investment-guide",
      title: "מדריך השקעות",
      description: "מדריך השקעות למתחילים",
      category: "פיננסים",
      contentType: "article",
      icon: <Coins className="h-5 w-5" />,
      topic: "איך להתחיל להשקיע בשוק ההון",
      keywords: "השקעות, שוק ההון, מדריך, פיננסים, מתחילים",
      tone: "friendly",
      length: "medium",
      targetAudience: "אנשים שרוצים להתחיל להשקיע",
      additionalInfo: "מושגים בסיסיים, סוגי השקעות, ניהול סיכונים",
      preview: "רוצים להתחיל להשקיע אבל לא יודעים מאיפה להתחיל?...",
    },
    {
      id: "car-review",
      title: "ביקורת רכב",
      description: "ביקורת על רכב חדש",
      category: "רכב",
      contentType: "article",
      icon: <Car className="h-5 w-5" />,
      topic: "סקירה מקיפה על טויוטה קורולה החדשה",
      keywords: "רכב, טויוטה, קורולה, ביקורת, חדש",
      tone: "professional",
      length: "long",
      targetAudience: "מתעניינים ברכישת רכב חדש",
      additionalInfo: "יתרונות, חסרונות, ביצועים, צריכת דלק",
      preview: "האם טויוטה קורולה החדשה היא הבחירה הנכונה עבורכם?...",
    },
    {
      id: "beauty-product-description",
      title: "תיאור מוצר יופי",
      description: "תיאור מוצר קוסמטיקה",
      category: "יופי",
      contentType: "product-description",
      icon: <Palette className="h-5 w-5" />,
      topic: "קרם לחות אנטי אייג'ינג עם חומצה היאלורונית",
      keywords: "קרם לחות, אנטי אייג'ינג, חומצה היאלורונית, יופי, קוסמטיקה",
      tone: "persuasive",
      length: "short",
      targetAudience: "נשים בגילאי 30+",
      additionalInfo: "מרכיבים פעילים, יתרונות, הוראות שימוש",
      preview: "השיגו עור צעיר וזוהר עם קרם הלחות שלנו!...",
    },
    {
      id: "sports-article",
      title: "מאמר ספורט",
      description: "מאמר על אימון כושר",
      category: "ספורט",
      contentType: "article",
      icon: <Football className="h-5 w-5" />,
      topic: "5 תרגילים לחיזוק שרירי הליבה",
      keywords: "ספורט, כושר, אימון, שרירי ליבה, תרגילים",
      tone: "friendly",
      length: "medium",
      targetAudience: "מתאמנים בכל הרמות",
      additionalInfo: "הסברים מפורטים, תמונות, טיפים",
      preview: "חזקו את שרירי הליבה שלכם עם 5 תרגילים פשוטים!...",
    },
    {
      id: "game-review",
      title: "ביקורת משחק",
      description: "ביקורת על משחק וידאו חדש",
      category: "משחקים",
      contentType: "article",
      icon: <Gamepad2 className="h-5 w-5" />,
      topic: "ביקורת: The Legend of Zelda: Tears of the Kingdom",
      keywords: "משחק, וידאו, זלדה, ביקורת, נינטנדו",
      tone: "creative",
      length: "long",
      targetAudience: "גיימרים וחובבי זלדה",
      additionalInfo: "גרפיקה, משחקיות, עלילה, פסקול",
      preview: "האם The Legend of Zelda: Tears of the Kingdom מצדיק את ההייפ?...",
    },
  ]

  const categories = ["all", ...Array.from(new Set(templates.map((t) => t.category)))]

  const filteredTemplates = templates
    .filter((template) => {
      const matchesSearch =
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "popularity") {
        // Sort by popularity (e.g., number of times used - placeholder)
        return 0
      } else if (sortBy === "newest") {
        // Sort by newest (e.g., based on ID or creation date - placeholder)
        return b.id.localeCompare(a.id)
      } else {
        // Sort alphabetically
        return a.title.localeCompare(b.title)
      }
    })

  const handleSelectTemplate = (template: ContentTemplate) => {
    onSelectTemplate(template)
  }

  return (
    <div className="space-y-6">
      {/* חיפוש וסינון */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="חפש תבניות..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === "all" ? "הכל" : category}
            </Button>
          ))}
        </div>

        {/* Sort By */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm font-medium">
            מיין לפי:
          </label>
          <select
            id="sort"
            className="border rounded px-2 py-1 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "popularity" | "newest" | "alphabetical")}
          >
            <option value="popularity">פופולריות</option>
            <option value="newest">הכי חדש</option>
            <option value="alphabetical">א-ב</option>
          </select>
        </div>
      </div>

      {/* רשת תבניות */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {categoryIcons[template.category] || <FileText className="h-5 w-5" />}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <div className="flex gap-1 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {template.category}
                      </Badge>
                      {template.tags?.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <CardDescription className="text-sm">{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="font-medium">נושא: </span>
                  <span className="text-muted-foreground">{template.topic}</span>
                </div>
                <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded italic">"{template.preview}"</div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    <Badge variant="outline" className="text-xs">
                      {template.contentType === "article" && "מאמר"}
                      {template.contentType === "product-description" && "מוצר"}
                      {template.contentType === "social-media" && "רשתות"}
                      {template.contentType === "email-marketing" && "אימייל"}
                      {template.contentType === "landing-page" && "נחיתה"}
                      {template.contentType === "seo-content" && "SEO"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSelectTemplate(template)}
                      className="gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      השתמש
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedTemplate(template)}>
                          פרטים
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {categoryIcons[template.category] || <FileText className="h-5 w-5" />}
                            {template.title}
                          </DialogTitle>
                          <DialogDescription>{template.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
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
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <span className="text-sm font-medium">תצוגה מקדימה:</span>
                            <p className="text-sm text-muted-foreground italic mt-1">"{template.preview}"</p>
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
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">לא נמצאו תבניות</h3>
          <p className="text-muted-foreground">נסה לשנות את מונחי החיפוש או הקטגוריה</p>
        </div>
      )}
    </div>
  )
}
