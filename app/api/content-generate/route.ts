import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { contentType, topic, keywords, tone, length, targetAudience, additionalInfo } = await request.json()

    if (!contentType || !topic) {
      return NextResponse.json({ error: "Content type and topic are required" }, { status: 400 })
    }

    const apiKey = process.env.X_AI_API_KEY
    if (!apiKey) {
      console.error("X_AI_API_KEY not found in environment variables")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    console.log("Sending content generation request to X.AI API...")

    const contentPrompt = createContentPrompt(
      contentType,
      topic,
      keywords,
      tone,
      length,
      targetAudience,
      additionalInfo,
    )

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-3-beta",
        messages: [
          {
            role: "system",
            content: `אתה כותב תוכן מקצועי ומומחה בשיווק דיגיטלי. אתה מתמחה ביצירת תוכן איכותי בעברית שמותאם לקידום SEO ומעורר עניין בקוראים. 
            תמיד תכתוב תוכן מקורי, מעניין ומותאם לקהל היעד. התוכן שלך יהיה מובנה היטב, קל לקריאה ומותאם למנועי חיפוש.`,
          },
          {
            role: "user",
            content: contentPrompt,
          },
        ],
        max_tokens: getMaxTokensByLength(length),
        temperature: 0.7,
      }),
    })

    console.log("X.AI API Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("X.AI API Error:", response.status, errorText)
      return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
    }

    const data = await response.json()
    console.log("X.AI API Response data:", data)

    const generatedContent = data.choices?.[0]?.message?.content

    if (!generatedContent) {
      console.error("No content generated:", data)
      return NextResponse.json({ error: "No content generated" }, { status: 500 })
    }

    // ניתוח התוכן שנוצר
    const analysis = analyzeGeneratedContent(generatedContent, keywords)

    return NextResponse.json({
      content: generatedContent,
      analysis,
      metadata: {
        contentType,
        topic,
        keywords,
        tone,
        length,
        targetAudience,
      },
    })
  } catch (error) {
    console.error("Content Generation API Error:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}

function createContentPrompt(
  contentType: string,
  topic: string,
  keywords: string,
  tone: string,
  length: string,
  targetAudience: string,
  additionalInfo: string,
): string {
  const basePrompt = `צור תוכן איכותי בעברית עבור:

**סוג התוכן:** ${contentType}
**נושא:** ${topic}
${keywords ? `**מילות מפתח:** ${keywords}` : ""}
${tone ? `**טון כתיבה:** ${tone}` : ""}
${length ? `**אורך:** ${length}` : ""}
${targetAudience ? `**קהל יעד:** ${targetAudience}` : ""}
${additionalInfo ? `**מידע נוסף:** ${additionalInfo}` : ""}

`

  switch (contentType) {
    case "article":
      return (
        basePrompt +
        `
כתב מאמר מקצועי ומעמיק שכולל:
- כותרת מושכת ומותאמת SEO
- מבוא שמעורר עניין
- תוכן מובנה עם כותרות משנה (H2, H3)
- פסקאות קצרות וקריאות
- סיכום או קריאה לפעולה
- שילוב טבעי של מילות המפתח
- תוכן שמספק ערך אמיתי לקוראים

הקפד על כתיבה זורמת ומקצועית שתעניין את הקוראים ותעזור לקידום במנועי חיפוש.`
      )

    case "product-description":
      return (
        basePrompt +
        `
כתב תיאור מוצר מושך ומשכנע שכולל:
- כותרת מוצר ברורה ומושכת
- תיאור קצר ומרתק של המוצר
- יתרונות ותכונות עיקריות
- פתרון לבעיות הלקוח
- קריאה לפעולה ברורה
- שילוב מילות מפתח רלוונטיות
- דגש על הערך הייחודי של המוצר

הקפד על כתיבה שמעוררת רצון לרכישה ומשכנעת את הלקוח הפוטנציאלי.`
      )

    case "social-media":
      return (
        basePrompt +
        `
צור תוכן לרשתות חברתיות שכולל:
- טקסט קצר ומושך תשומת לב
- שימוש בהאשטגים רלוונטיים
- קריאה לפעולה ברורה
- תוכן שמעודד שיתוף ואינטראקציה
- טון מתאים לרשתות חברתיות
- שילוב מילות מפתח באופן טבעי

הקפד על תוכן שיעורר עניין ויגרום לאנשים לרצות לשתף ולהגיב.`
      )

    case "email-marketing":
      return (
        basePrompt +
        `
כתב אימייל שיווקי אפקטיבי שכולל:
- שורת נושא מושכת שמעוררת לפתיחה
- פתיחה אישית ומעניינת
- תוכן ממוקד וקצר לעניין
- יתרונות ברורים ללקוח
- קריאה לפעולה חזקה ובולטת
- סגירה מקצועית
- שפה שיווקית משכנעת

הקפד על אימייל שיגרום לקוראים לבצע את הפעולה הרצויה.`
      )

    case "landing-page":
      return (
        basePrompt +
        `
כתב תוכן לעמוד נחיתה שכולל:
- כותרת ראשית מושכת וברורה
- תת-כותרת שמסבירה את הערך
- תיאור היתרונות העיקריים
- עדויות או נתונים משכנעים
- קריאות לפעולה מרובות וברורות
- תוכן מובנה ונגיש
- מיקוד בפתרון בעיות הלקוח

הקפד על תוכן שמוביל להמרות גבוהות ומשכנע מבקרים לבצע פעולה.`
      )

    case "seo-content":
      return (
        basePrompt +
        `
כתב תוכן מותאם SEO שכולל:
- כותרת עם מילת מפתח ראשית
- שילוב טבעי של מילות מפתח
- תוכן איכותי ומעמיק
- מבנה ברור עם כותרות משנה
- אורך מתאים לנושא
- תוכן שעונה על שאלות המשתמשים
- קישורים פנימיים רלוונטיים (הצע מקומות)

הקפד על תוכן שיעזור לדירוג גבוה במנועי חיפוש ויספק ערך אמיתי.`
      )

    default:
      return (
        basePrompt +
        `
צור תוכן איכותי ומקצועי שמתאים לסוג התוכן הנבחר. הקפד על:
- תוכן מקורי ומעניין
- שפה ברורה וזורמת
- מבנה לוגי ומובן
- שילוב מילות מפתח באופן טבעי
- תוכן שמספק ערך לקוראים`
      )
  }
}

function getMaxTokensByLength(length: string): number {
  switch (length) {
    case "short":
      return 500
    case "medium":
      return 1000
    case "long":
      return 2000
    case "very-long":
      return 3000
    default:
      return 1000
  }
}

function analyzeGeneratedContent(content: string, keywords?: string) {
  const wordCount = content.split(/\s+/).length
  const charCount = content.length
  const paragraphs = content.split("\n\n").filter((p) => p.trim()).length

  // ניתוח מילות מפתח
  let keywordAnalysis = null
  if (keywords) {
    const keywordList = keywords.split(",").map((k) => k.trim().toLowerCase())
    const contentLower = content.toLowerCase()
    const foundKeywords = keywordList.filter((keyword) => contentLower.includes(keyword))

    keywordAnalysis = {
      total: keywordList.length,
      found: foundKeywords.length,
      missing: keywordList.filter((k) => !foundKeywords.includes(k)),
      coverage: Math.round((foundKeywords.length / keywordList.length) * 100),
    }
  }

  // ניתוח מבנה
  const hasHeadings = /^#+\s/.test(content) || content.includes("**")
  const hasBulletPoints = content.includes("•") || content.includes("-") || content.includes("*")

  return {
    wordCount,
    charCount,
    paragraphs,
    estimatedReadingTime: Math.ceil(wordCount / 200), // 200 words per minute
    keywordAnalysis,
    structure: {
      hasHeadings,
      hasBulletPoints,
      score: (hasHeadings ? 50 : 0) + (hasBulletPoints ? 30 : 0) + (paragraphs > 2 ? 20 : 0),
    },
    seoScore: calculateSEOScore(content, keywords),
  }
}

function calculateSEOScore(content: string, keywords?: string): number {
  let score = 0

  // בדיקת אורך תוכן
  const wordCount = content.split(/\s+/).length
  if (wordCount >= 300) score += 20
  if (wordCount >= 500) score += 10

  // בדיקת מבנה
  if (/^#+\s/.test(content) || content.includes("**")) score += 20
  if (content.includes("•") || content.includes("-")) score += 15

  // בדיקת מילות מפתח
  if (keywords) {
    const keywordList = keywords.split(",").map((k) => k.trim().toLowerCase())
    const contentLower = content.toLowerCase()
    const foundKeywords = keywordList.filter((keyword) => contentLower.includes(keyword))
    score += Math.min(30, (foundKeywords.length / keywordList.length) * 30)
  }

  // בדיקת קריאות
  const avgWordsPerSentence = wordCount / (content.split(/[.!?]+/).length - 1)
  if (avgWordsPerSentence <= 20) score += 15

  return Math.min(100, Math.round(score))
}
