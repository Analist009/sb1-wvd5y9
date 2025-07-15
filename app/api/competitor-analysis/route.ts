import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { domain, competitors = [], analysisType = "comprehensive" } = await request.json()

    if (!domain) {
      return NextResponse.json({ error: "Domain is required" }, { status: 400 })
    }

    const apiKey = process.env.X_AI_API_KEY
    if (!apiKey) {
      console.error("X_AI_API_KEY not found in environment variables")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    console.log("Sending competitor analysis request to X.AI API...")

    const analysisPrompt = `
אתה מומחה ניתוח מתחרים ואסטרטגיה דיגיטלית מוביל עם ניסיון של 15 שנים. בצע ניתוח מקיף של מתחרים עבור:

דומיין לניתוח: "${domain}"
${competitors.length > 0 ? `מתחרים ידועים: ${competitors.join(", ")}` : ""}
סוג ניתוח: ${analysisType}

אנא ספק ניתוח מקיף הכולל:

1. **ניתוח כללי של הדומיין:**
   - תחום העסק והתעשייה
   - גודל השוק המשוער
   - מיקום תחרותי (מוביל/מאתגר/חדש)
   - נקודות חוזק וחולשה עיקריות

2. **מתחרים ראשיים (5-7 מתחרים):**
   - שמות המתחרים העיקריים
   - גודל יחסי (גדול/בינוני/קטן)
   - נקודות חוזק של כל מתחרה
   - נקודות חולשה של כל מתחרה

3. **ניתוח SEO תחרותי:**
   - מילות מפתח שמתחרים מדרגים עליהן
   - פערי תוכן שניתן לנצל
   - אסטרטגיות קישורים של מתחרים
   - הזדמנויות לדירוג

4. **ניתוח תוכן:**
   - סוגי תוכן שמתחרים מייצרים
   - תדירות פרסום
   - נושאים פופולריים
   - פערי תוכן שניתן למלא

5. **ניתוח רשתות חברתיות:**
   - נוכחות ברשתות חברתיות
   - רמת מעורבות
   - אסטרטגיות תוכן ברשתות
   - הזדמנויות לשיפור

6. **ניתוח טכני:**
   - מהירות אתרים
   - חוויית משתמש
   - עיצוב ופונקציונליות
   - נקודות לשיפור טכני

7. **המלצות אסטרטגיות:**
   - הזדמנויות לניצול
   - אסטרטגיות התמיינות
   - תחומים להשקעה
   - תוכנית פעולה לטווח קצר וארוך

אנא ענה בעברית בפורמט JSON עם המבנה הבא:
{
  "domainAnalysis": {
    "domain": string,
    "industry": string,
    "marketSize": string,
    "position": string,
    "strengths": string[],
    "weaknesses": string[]
  },
  "competitors": [
    {
      "name": string,
      "domain": string,
      "size": string,
      "strengths": string[],
      "weaknesses": string[],
      "marketShare": string
    }
  ],
  "seoAnalysis": {
    "competitorKeywords": string[],
    "contentGaps": string[],
    "linkingOpportunities": string[],
    "rankingOpportunities": string[]
  },
  "contentAnalysis": {
    "contentTypes": string[],
    "publishingFrequency": string,
    "popularTopics": string[],
    "contentGaps": string[]
  },
  "socialMediaAnalysis": {
    "platforms": string[],
    "engagementLevel": string,
    "contentStrategy": string[],
    "opportunities": string[]
  },
  "technicalAnalysis": {
    "siteSpeed": string,
    "userExperience": string,
    "designQuality": string,
    "improvements": string[]
  },
  "recommendations": {
    "opportunities": string[],
    "differentiationStrategy": string[],
    "investmentAreas": string[],
    "actionPlan": {
      "shortTerm": string[],
      "longTerm": string[]
    }
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
              "אתה מומחה ניתוח מתחרים ואסטרטגיה דיגיטלית מוביל שמתמחה במתן תובנות מעמיקות ומעשיות. תמיד תענה בעברית ובפורמט JSON מובנה.",
          },
          {
            role: "user",
            content: analysisPrompt,
          },
        ],
        max_tokens: 3000,
        temperature: 0.3,
      }),
    })

    console.log("X.AI API Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("X.AI API Error:", response.status, errorText)
      return NextResponse.json({ error: "Failed to analyze competitors" }, { status: 500 })
    }

    const data = await response.json()
    console.log("X.AI API Response data:", data)

    const aiMessage = data.choices?.[0]?.message?.content

    if (!aiMessage) {
      console.error("No message content in response:", data)
      return NextResponse.json({ error: "No analysis data received" }, { status: 500 })
    }

    // נסה לחלץ JSON מהתשובה
    let analysisResult
    try {
      const jsonMatch = aiMessage.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No JSON found in response")
      }
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError)
      // אם לא הצלחנו לפרס JSON, ניצור תשובה מובנית
      analysisResult = createFallbackCompetitorAnalysis(domain)
    }

    return NextResponse.json({ analysis: analysisResult })
  } catch (error) {
    console.error("Competitor Analysis API Error:", error)
    return NextResponse.json({ error: "Failed to analyze competitors" }, { status: 500 })
  }
}

function createFallbackCompetitorAnalysis(domain: string) {
  return {
    domainAnalysis: {
      domain: domain,
      industry: "טכנולוגיה ושירותים דיגיטליים",
      marketSize: "בינוני-גדול",
      position: "מאתגר",
      strengths: ["טכנולוגיה מתקדמת", "שירות לקוחות איכותי", "מחירים תחרותיים"],
      weaknesses: ["מודעות מותג נמוכה", "נוכחות דיגיטלית מוגבלת", "תוכן SEO לא מספיק"],
    },
    competitors: [
      {
        name: "מתחרה A",
        domain: "competitor-a.com",
        size: "גדול",
        strengths: ["מותג חזק", "תקציב שיווק גדול", "נוכחות רחבה"],
        weaknesses: ["מחירים גבוהים", "שירות לקוחות איטי"],
        marketShare: "25%",
      },
      {
        name: "מתחרה B",
        domain: "competitor-b.com",
        size: "בינוני",
        strengths: ["חדשנות טכנולוגית", "צוות מקצועי"],
        weaknesses: ["שיווק חלש", "מוצרים מוגבלים"],
        marketShare: "15%",
      },
    ],
    seoAnalysis: {
      competitorKeywords: ["בניית אתרים", "עיצוב אתרים", "קידום SEO", "שיווק דיגיטלי"],
      contentGaps: ["מדריכים טכניים", "מקרי בוחן", "תוכן וידאו"],
      linkingOpportunities: ["בלוגים טכנולוגיים", "אתרי חדשות", "פורומים מקצועיים"],
      rankingOpportunities: ["מילות מפתח ארוכות", "חיפושים מקומיים", "נושאים ספציפיים"],
    },
    contentAnalysis: {
      contentTypes: ["מאמרים", "מדריכים", "וידאו", "אינפוגרפיקה"],
      publishingFrequency: "2-3 פוסטים בשבוע",
      popularTopics: ["טרנדים טכנולוגיים", "טיפים מעשיים", "מקרי הצלחה"],
      contentGaps: ["תוכן מתקדם", "ניתוחים עמוקים", "תוכן אינטראקטיבי"],
    },
    socialMediaAnalysis: {
      platforms: ["פייסבוק", "לינקדאין", "אינסטגרם", "יוטיוב"],
      engagementLevel: "בינוני",
      contentStrategy: ["תוכן חינוכי", "מקרי הצלחה", "טיפים מהירים"],
      opportunities: ["תוכן וידאו", "סטוריז", "לייבים", "תוכן אינטראקטיבי"],
    },
    technicalAnalysis: {
      siteSpeed: "בינוני (3-4 שניות)",
      userExperience: "טובה אבל ניתנת לשיפור",
      designQuality: "מקצועי אבל לא ייחודי",
      improvements: ["מהירות טעינה", "עיצוב מובייל", "ניווט משופר", "CTA ברורים יותר"],
    },
    recommendations: {
      opportunities: [
        "פיתוח תוכן וידאו איכותי",
        "שיפור נוכחות ברשתות חברתיות",
        "יצירת כלי AI ייחודיים",
        "פיתוח קהילה מקצועית",
      ],
      differentiationStrategy: [
        "התמחות בפתרונות AI",
        "שירות לקוחות מעולה",
        "מחירים שקופים ותחרותיים",
        "תוכן חינוכי איכותי",
      ],
      investmentAreas: ["פיתוח תוכן", "שיווק דיגיטלי", "שיפור טכני", "כלי AI"],
      actionPlan: {
        shortTerm: [
          "שיפור מהירות האתר",
          "יצירת תוכן SEO איכותי",
          "הגברת פעילות ברשתות חברתיות",
          "אופטימיזציה לחיפושים מקומיים",
        ],
        longTerm: ["פיתוח כלי AI ייחודיים", "בניית קהילה מקצועית", "הרחבה לשווקים חדשים", "פיתוח שותפויות אסטרטגיות"],
      },
    },
  }
}
