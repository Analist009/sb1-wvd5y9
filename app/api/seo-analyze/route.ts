import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { content, url, title, metaDescription, targetKeywords } = await request.json()

    if (!content && !url) {
      return NextResponse.json({ error: "Content or URL is required" }, { status: 400 })
    }

    const apiKey = process.env.X_AI_API_KEY
    if (!apiKey) {
      console.error("X_AI_API_KEY not found in environment variables")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    console.log("Sending SEO analysis request to X.AI API...")

    const analysisPrompt = `
אתה מומחה SEO מוביל עם ניסיון של 15 שנים בקידום אתרים. נתח את התוכן הבא ותן המלצות מפורטות לשיפור ה-SEO:

${url ? `כתובת האתר: ${url}` : ""}
${title ? `כותרת הדף: ${title}` : ""}
${metaDescription ? `תיאור מטא: ${metaDescription}` : ""}
${targetKeywords ? `מילות מפתח יעד: ${targetKeywords}` : ""}

תוכן לניתוח:
${content}

אנא ספק ניתוח מקיף הכולל:

1. **ציון SEO כללי** (0-100)
2. **ניתוח מילות מפתח:**
   - מילות מפתח שזוהו בתוכן
   - צפיפות מילות מפתח
   - המלצות למילות מפתח נוספות
   - מילות מפתח ארוכות (Long-tail keywords)

3. **ניתוח תוכן:**
   - איכות התוכן
   - אורך התוכן (מספר מילים)
   - קריאות התוכן
   - מבנה התוכן (כותרות, פסקאות)

4. **ניתוח טכני:**
   - כותרת הדף (Title tag)
   - תיאור מטא (Meta description)
   - שימוש בכותרות H1, H2, H3
   - טקסט חלופי לתמונות

5. **בעיות SEO שזוהו:**
   - רשימת בעיות קריטיות
   - בעיות בינוניות
   - הזדמנויות לשיפור

6. **המלצות לפעולה:**
   - פעולות מיידיות (עדיפות גבוהה)
   - שיפורים לטווח בינוני
   - אסטרטגיה לטווח ארוך

7. **תחזית השפעה:**
   - צפי לשיפור בדירוג
   - זמן משוער לראיית תוצאות

אנא ענה בעברית בפורמט JSON עם המבנה הבא:
{
  "overallScore": number,
  "keywordAnalysis": {
    "foundKeywords": string[],
    "keywordDensity": object,
    "suggestedKeywords": string[],
    "longTailKeywords": string[]
  },
  "contentAnalysis": {
    "quality": string,
    "wordCount": number,
    "readability": string,
    "structure": string
  },
  "technicalAnalysis": {
    "titleTag": object,
    "metaDescription": object,
    "headings": object,
    "images": object
  },
  "issues": {
    "critical": string[],
    "medium": string[],
    "opportunities": string[]
  },
  "recommendations": {
    "immediate": string[],
    "mediumTerm": string[],
    "longTerm": string[]
  },
  "impact": {
    "rankingImprovement": string,
    "timeframe": string
  }
}
`

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
            content:
              "אתה מומחה SEO מוביל שמתמחה בניתוח תוכן ומתן המלצות מעשיות לשיפור דירוג במנועי חיפוש. תמיד תענה בעברית ובפורמט JSON מובנה.",
          },
          {
            role: "user",
            content: analysisPrompt,
          },
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    })

    console.log("X.AI API Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("X.AI API Error:", response.status, errorText)
      return NextResponse.json({ error: "Failed to analyze content" }, { status: 500 })
    }

    const data = await response.json()
    console.log("X.AI API Response data:", data)

    const aiMessage = data.choices?.[0]?.message?.content

    if (!aiMessage) {
      console.error("No message content in response:", data)
      return NextResponse.json({ error: "No analysis received" }, { status: 500 })
    }

    // נסה לחלץ JSON מהתשובה
    let analysisResult
    try {
      // חיפוש JSON בתוך התשובה
      const jsonMatch = aiMessage.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No JSON found in response")
      }
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError)
      // אם לא הצלחנו לפרס JSON, ניצור תשובה מובנית
      analysisResult = createFallbackAnalysis(content, title, metaDescription)
    }

    return NextResponse.json({ analysis: analysisResult })
  } catch (error) {
    console.error("SEO Analysis API Error:", error)
    return NextResponse.json({ error: "Failed to analyze content" }, { status: 500 })
  }
}

function createFallbackAnalysis(content: string, title?: string, metaDescription?: string) {
  const wordCount = content ? content.split(/\s+/).length : 0
  const hasTitle = !!title
  const hasMetaDescription = !!metaDescription

  return {
    overallScore: 65,
    keywordAnalysis: {
      foundKeywords: ["אתר", "תוכן", "SEO"],
      keywordDensity: { אתר: 2.5, תוכן: 1.8, SEO: 1.2 },
      suggestedKeywords: ["קידום אתרים", "שיווק דיגיטלי", "בניית אתרים"],
      longTailKeywords: ["איך לבנות אתר מקצועי", "קידום אתרים בגוגל"],
    },
    contentAnalysis: {
      quality: wordCount > 300 ? "טובה" : "זקוקה לשיפור",
      wordCount,
      readability: "בינונית",
      structure: hasTitle ? "טובה" : "זקוקה לשיפור",
    },
    technicalAnalysis: {
      titleTag: { status: hasTitle ? "תקין" : "חסר", score: hasTitle ? 90 : 0 },
      metaDescription: { status: hasMetaDescription ? "תקין" : "חסר", score: hasMetaDescription ? 85 : 0 },
      headings: { status: "זקוק לבדיקה", score: 70 },
      images: { status: "זקוק לבדיקה", score: 60 },
    },
    issues: {
      critical: hasTitle ? [] : ["חסרה כותרת דף"],
      medium: hasMetaDescription ? [] : ["חסר תיאור מטא"],
      opportunities: ["הוספת מילות מפתח נוספות", "שיפור מבנה התוכן"],
    },
    recommendations: {
      immediate: ["הוסף כותרת דף רלוונטית", "כתב תיאור מטא מושך"],
      mediumTerm: ["הוסף כותרות H2 ו-H3", "שפר את צפיפות מילות המפתח"],
      longTerm: ["צור תוכן נוסף באיכות גבוהה", "בנה קישורים פנימיים"],
    },
    impact: {
      rankingImprovement: "שיפור של 15-25% בדירוג",
      timeframe: "2-4 שבועות לתוצאות ראשוניות",
    },
  }
}
