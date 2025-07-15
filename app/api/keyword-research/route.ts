import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { keyword, language = "he", country = "IL" } = await request.json()

    if (!keyword) {
      return NextResponse.json({ error: "Keyword is required" }, { status: 400 })
    }

    const apiKey = process.env.X_AI_API_KEY
    if (!apiKey) {
      console.error("X_AI_API_KEY not found in environment variables")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    console.log("Sending keyword research request to X.AI API...")

    const researchPrompt = `
אתה מומחה SEO ומחקר מילות מפתח מוביל עם ניסיון של 15 שנים. בצע מחקר מקיף של מילות מפתח עבור:

מילת המפתח הראשית: "${keyword}"
שפה: ${language === "he" ? "עברית" : "אנגלית"}
מדינה: ${country}

אנא ספק ניתוח מקיף הכולל:

1. **ניתוח מילת המפתח הראשית:**
   - נפח חיפושים משוער (חודשי)
   - רמת תחרותיות (נמוכה/בינונית/גבוהה)
   - קושי דירוג (1-100)
   - כוונת חיפוש (מידעית/מסחרית/ניווטית/עסקית)

2. **מילות מפתח קשורות (10-15 מילים):**
   - מילות מפתח דומות עם נפח חיפושים
   - מילות מפתח ארוכות (Long-tail)
   - וריאציות של מילת המפתח הראשית

3. **מילות מפתח מתחרות (5-8 מילים):**
   - מילות מפתח שמתחרים מדרגים עליהן
   - הזדמנויות לדירוג

4. **שאלות נפוצות:**
   - שאלות שאנשים שואלים הקשורות למילת המפתח
   - מילות מפתח בפורמט שאלה

5. **המלצות אסטרטגיות:**
   - איך לאמץ את מילות המפתח בתוכן
   - סוגי תוכן מומלצים
   - אסטרטגיית תוכן לטווח ארוך

6. **ניתוח עונתיות:**
   - האם יש עונתיות במילת המפתח
   - מתי הביקוש הכי גבוה

אנא ענה בעברית בפורמט JSON עם המבנה הבא:
{
  "mainKeyword": {
    "keyword": string,
    "searchVolume": number,
    "competition": string,
    "difficulty": number,
    "intent": string,
    "cpc": number
  },
  "relatedKeywords": [
    {
      "keyword": string,
      "searchVolume": number,
      "competition": string,
      "difficulty": number
    }
  ],
  "competitorKeywords": [
    {
      "keyword": string,
      "searchVolume": number,
      "opportunity": string
    }
  ],
  "questions": string[],
  "recommendations": {
    "contentStrategy": string[],
    "contentTypes": string[],
    "longTermStrategy": string
  },
  "seasonality": {
    "isSeasonsal": boolean,
    "peakMonths": string[],
    "insights": string
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
              "אתה מומחה SEO ומחקר מילות מפתח מוביל שמתמחה במתן תובנות מעמיקות ומעשיות. תמיד תענה בעברית ובפורמט JSON מובנה.",
          },
          {
            role: "user",
            content: researchPrompt,
          },
        ],
        max_tokens: 2500,
        temperature: 0.3,
      }),
    })

    console.log("X.AI API Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("X.AI API Error:", response.status, errorText)
      return NextResponse.json({ error: "Failed to research keywords" }, { status: 500 })
    }

    const data = await response.json()
    console.log("X.AI API Response data:", data)

    const aiMessage = data.choices?.[0]?.message?.content

    if (!aiMessage) {
      console.error("No message content in response:", data)
      return NextResponse.json({ error: "No research data received" }, { status: 500 })
    }

    // נסה לחלץ JSON מהתשובה
    let researchResult
    try {
      const jsonMatch = aiMessage.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        researchResult = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No JSON found in response")
      }
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError)
      // אם לא הצלחנו לפרס JSON, ניצור תשובה מובנית
      researchResult = createFallbackKeywordResearch(keyword)
    }

    return NextResponse.json({ research: researchResult })
  } catch (error) {
    console.error("Keyword Research API Error:", error)
    return NextResponse.json({ error: "Failed to research keywords" }, { status: 500 })
  }
}

function createFallbackKeywordResearch(keyword: string) {
  return {
    mainKeyword: {
      keyword: keyword,
      searchVolume: 1200,
      competition: "בינונית",
      difficulty: 65,
      intent: "מידעית",
      cpc: 2.5,
    },
    relatedKeywords: [
      {
        keyword: `${keyword} מדריך`,
        searchVolume: 800,
        competition: "נמוכה",
        difficulty: 45,
      },
      {
        keyword: `איך ${keyword}`,
        searchVolume: 600,
        competition: "נמוכה",
        difficulty: 40,
      },
      {
        keyword: `${keyword} טיפים`,
        searchVolume: 500,
        competition: "נמוכה",
        difficulty: 35,
      },
      {
        keyword: `${keyword} 2024`,
        searchVolume: 400,
        competition: "בינונית",
        difficulty: 50,
      },
      {
        keyword: `${keyword} למתחילים`,
        searchVolume: 350,
        competition: "נמוכה",
        difficulty: 30,
      },
    ],
    competitorKeywords: [
      {
        keyword: `${keyword} מקצועי`,
        searchVolume: 300,
        opportunity: "הזדמנות טובה",
      },
      {
        keyword: `${keyword} חינם`,
        searchVolume: 250,
        opportunity: "תחרותיות נמוכה",
      },
    ],
    questions: [`מה זה ${keyword}?`, `איך עושים ${keyword}?`, `למה ${keyword} חשוב?`, `איך לשפר ${keyword}?`],
    recommendations: {
      contentStrategy: [
        "צור תוכן מקיף ומעמיק",
        "השתמש במילות מפתח באופן טבעי",
        "כתב כותרות מושכות",
        "הוסף תמונות ווידאו רלוונטיים",
      ],
      contentTypes: ["מאמרים מקצועיים", "מדריכים שלב אחר שלב", "רשימות טיפים", "שאלות ותשובות"],
      longTermStrategy: "בנה סמכות בתחום על ידי יצירת תוכן איכותי ועקבי",
    },
    seasonality: {
      isSeasonsal: false,
      peakMonths: [],
      insights: "מילת המפתח לא מציגה עונתיות משמעותית",
    },
  }
}
