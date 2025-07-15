import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const apiKey = process.env.X_AI_API_KEY
    if (!apiKey) {
      console.error("X_AI_API_KEY not found in environment variables")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    console.log("Sending request to X.AI API...")

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
            content: `אתה עוזר אישי חכם של ווב-מאסטר - פלטפורמה לבניית אתרים וקידום SEO. 
            אתה מומחה בבניית אתרים, קידום SEO, שיווק דיגיטלי ובינה מלאכותית.
            תמיד תענה בעברית בצורה ידידותית ומקצועית.
            תתמחה בנושאים הבאים:
            - בניית אתרים מקצועיים
            - קידום SEO וניתוח מילות מפתח
            - שיווק דיגיטלי ורשתות חברתיות
            - אופטימיזציה של ביצועי אתרים
            - יצירת תוכן איכותי
            - אנליטיקס ומדידת ביצועים
            
            אם נשאלת על נושאים שלא קשורים לתחום, הפנה בעדינות לנושאי המומחיות שלך.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    console.log("X.AI API Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("X.AI API Error:", response.status, errorText)

      // נסה עם fallback response אם יש בעיה עם ה-API
      const fallbackResponse = getFallbackResponse(message)
      return NextResponse.json({ message: fallbackResponse })
    }

    const data = await response.json()
    console.log("X.AI API Response data:", data)

    const aiMessage = data.choices?.[0]?.message?.content

    if (!aiMessage) {
      console.error("No message content in response:", data)
      const fallbackResponse = getFallbackResponse(message)
      return NextResponse.json({ message: fallbackResponse })
    }

    return NextResponse.json({ message: aiMessage })
  } catch (error) {
    console.error("Chat API Error:", error)

    // במקרה של שגיאה, נחזיר תשובה fallback
    const fallbackResponse = getFallbackResponse(request.body ? JSON.parse(await request.text()).message : "")
    return NextResponse.json({ message: fallbackResponse })
  }
}

function getFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes("seo") || lowerMessage.includes("קידום")) {
    return "אני מומחה בקידום SEO! אני יכול לעזור לך עם ניתוח מילות מפתח, אופטימיזציה של תוכן, שיפור מהירות האתר ועוד. איזה היבט של SEO מעניין אותך?"
  }

  if (lowerMessage.includes("אתר") || lowerMessage.includes("בניית") || lowerMessage.includes("עיצוב")) {
    return "בניית אתרים היא המומחיות שלי! אני יכול לעזור לך עם בחירת פלטפורמה, עיצוב רספונסיבי, UX/UI, ואופטימיזציה לביצועים. על איזה סוג אתר אתה חושב?"
  }

  if (lowerMessage.includes("שיווק") || lowerMessage.includes("פרסום") || lowerMessage.includes("רשתות חברתיות")) {
    return "שיווק דיגיטלי הוא תחום מרתק! אני יכול לעזור לך עם אסטרטגיית תוכן, פרסום ברשתות חברתיות, Google Ads, ואנליטיקס. איזה ערוץ שיווקי מעניין אותך?"
  }

  if (lowerMessage.includes("תוכן") || lowerMessage.includes("כתיבה") || lowerMessage.includes("בלוג")) {
    return "יצירת תוכן איכותי היא המפתח להצלחה! אני יכול לעזור לך עם כתיבת תוכן לאתר, תכנון לוח תוכן, אופטימיזציה למנועי חיפוש, ויצירת תוכן ויראלי. איזה סוג תוכן אתה רוצה ליצור?"
  }

  return "שלום! אני העוזר החכם של ווב-מאסטר. אני כאן לעזור לך עם בניית אתרים, קידום SEO, שיווק דיגיטלי ויצירת תוכן. איך אוכל לעזור לך היום?"
}
