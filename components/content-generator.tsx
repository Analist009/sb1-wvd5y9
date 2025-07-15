"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ContentTemplatesEnhanced } from "@/components/content-templates-enhanced"
import {
  Sparkles,
  Loader2,
  Copy,
  Download,
  RefreshCw,
  FileText,
  Target,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Wand2,
  LayoutTemplate,
} from "lucide-react"

interface ContentAnalysis {
  wordCount: number
  charCount: number
  paragraphs: number
  estimatedReadingTime: number
  keywordAnalysis?: {
    total: number
    found: number
    missing: string[]
    coverage: number
  }
  structure: {
    hasHeadings: boolean
    hasBulletPoints: boolean
    score: number
  }
  seoScore: number
}

interface GeneratedContent {
  content: string
  analysis: ContentAnalysis
  metadata: {
    contentType: string
    topic: string
    keywords?: string
    tone?: string
    length?: string
    targetAudience?: string
  }
}

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
}

export function ContentGenerator() {
  const [activeTab, setActiveTab] = useState("manual")
  const [contentType, setContentType] = useState("")
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState("")
  const [tone, setTone] = useState("")
  const [length, setLength] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [error, setError] = useState<string | null>(null)

  const contentTypes = [
    { value: "article", label: "מאמר מקצועי" },
    { value: "product-description", label: "תיאור מוצר" },
    { value: "social-media", label: "תוכן לרשתות חברתיות" },
    { value: "email-marketing", label: "אימייל שיווקי" },
    { value: "landing-page", label: "עמוד נחיתה" },
    { value: "seo-content", label: "תוכן SEO" },
  ]

  const tones = [
    { value: "professional", label: "מקצועי" },
    { value: "friendly", label: "ידידותי" },
    { value: "casual", label: "רגיל" },
    { value: "formal", label: "פורמלי" },
    { value: "creative", label: "יצירתי" },
    { value: "persuasive", label: "משכנע" },
  ]

  const lengths = [
    { value: "short", label: "קצר (עד 200 מילים)" },
    { value: "medium", label: "בינוני (200-500 מילים)" },
    { value: "long", label: "ארוך (500-1000 מילים)" },
    { value: "very-long", label: "מאוד ארוך (1000+ מילים)" },
  ]

  const handleSelectTemplate = (template: ContentTemplate) => {
    setContentType(template.contentType)
    setTopic(template.topic)
    setKeywords(template.keywords)
    setTone(template.tone)
    setLength(template.length)
    setTargetAudience(template.targetAudience)
    setAdditionalInfo(template.additionalInfo)
    setActiveTab("manual")
  }

  const handleGenerate = async () => {
    if (!contentType || !topic) {
      setError("אנא בחר סוג תוכן והזן נושא")
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/content-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentType,
          topic,
          keywords,
          tone,
          length,
          targetAudience,
          additionalInfo,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate content")
      }

      const data = await response.json()
      setGeneratedContent(data)
    } catch (error) {
      console.error("Error generating content:", error)
      setError(error instanceof Error ? error.message : "Failed to generate content")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent.content)
    }
  }

  const downloadContent = () => {
    if (generatedContent) {
      const blob = new Blob([generatedContent.content], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${topic.replace(/\s+/g, "-")}-content.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* כותרת */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8 text-primary" />
          יוצר התוכן החכם
        </h1>
        <p className="text-muted-foreground">צור תוכן איכותי ומקצועי בלחיצת כפתור עם בינה מלאכותית מתקדמת</p>
      </div>

      {/* טאבים ראשיים */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="templates" className="gap-2">
            <LayoutTemplate className="h-4 w-4" />
            תבניות מוכנות
          </TabsTrigger>
          <TabsTrigger value="manual" className="gap-2">
            <Wand2 className="h-4 w-4" />
            יצירה ידנית
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutTemplate className="h-5 w-5" />
                תבניות תוכן מוכנות מראש
              </CardTitle>
              <CardDescription>
                בחר מתוך מגוון תבניות מוכנות מראש לסוגי תוכן שונים. כל תבנית כוללת נושא, מילות מפתח והגדרות מותאמות.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContentTemplatesEnhanced onSelectTemplate={handleSelectTemplate} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="space-y-6">
          {/* טופס יצירת תוכן */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                הגדרות יצירת תוכן
              </CardTitle>
              <CardDescription>הזן את הפרטים ליצירת תוכן מותאם אישית</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">סוג תוכן *</label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="בחר סוג תוכן" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">טון כתיבה</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="בחר טון כתיבה" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((toneOption) => (
                        <SelectItem key={toneOption.value} value={toneOption.value}>
                          {toneOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">אורך תוכן</label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger>
                      <SelectValue placeholder="בחר אורך תוכן" />
                    </SelectTrigger>
                    <SelectContent>
                      {lengths.map((lengthOption) => (
                        <SelectItem key={lengthOption.value} value={lengthOption.value}>
                          {lengthOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">קהל יעד</label>
                  <Input
                    placeholder="למשל: צעירים, אנשי עסקים, הורים"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">נושא התוכן *</label>
                <Input
                  placeholder="הזן את הנושא שעליו תרצה ליצור תוכן"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">מילות מפתח (אופציונלי)</label>
                <Input
                  placeholder="הזן מילות מפתח מופרדות בפסיקים"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">מידע נוסף (אופציונלי)</label>
                <Textarea
                  placeholder="הוסף מידע נוסף שיעזור ליצירת תוכן מותאם יותר..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={3}
                />
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !contentType || !topic}
                className="w-full gap-2"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    יוצר תוכן...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    צור תוכן
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* תוצאות */}
      {generatedContent && (
        <div className="space-y-6">
          {/* כפתורי פעולה */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={copyToClipboard} className="gap-2">
              <Copy className="h-4 w-4" />
              העתק
            </Button>
            <Button variant="outline" onClick={downloadContent} className="gap-2">
              <Download className="h-4 w-4" />
              הורד
            </Button>
            <Button variant="outline" onClick={handleGenerate} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              צור מחדש
            </Button>
          </div>

          {/* טאבים לתוצאות */}
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">התוכן</TabsTrigger>
              <TabsTrigger value="analysis">ניתוח</TabsTrigger>
              <TabsTrigger value="metadata">פרטים</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    התוכן שנוצר
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {generatedContent.content}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      ציון SEO
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span>ציון כללי</span>
                      <Badge variant={getScoreBadgeVariant(generatedContent.analysis.seoScore)}>
                        {generatedContent.analysis.seoScore}/100
                      </Badge>
                    </div>
                    <Progress value={generatedContent.analysis.seoScore} className="h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      סטטיסטיקות
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">מילים:</span>
                      <span className="text-sm font-medium">{generatedContent.analysis.wordCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">תווים:</span>
                      <span className="text-sm font-medium">{generatedContent.analysis.charCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">פסקאות:</span>
                      <span className="text-sm font-medium">{generatedContent.analysis.paragraphs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">זמן קריאה:</span>
                      <span className="text-sm font-medium">{generatedContent.analysis.estimatedReadingTime} דקות</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {generatedContent.analysis.keywordAnalysis && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      ניתוח מילות מפתח
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">כיסוי מילות מפתח</span>
                          <Badge variant={getScoreBadgeVariant(generatedContent.analysis.keywordAnalysis.coverage)}>
                            {generatedContent.analysis.keywordAnalysis.coverage}%
                          </Badge>
                        </div>
                        <Progress value={generatedContent.analysis.keywordAnalysis.coverage} className="h-2" />
                        <div className="mt-2 text-xs text-muted-foreground">
                          {generatedContent.analysis.keywordAnalysis.found} מתוך{" "}
                          {generatedContent.analysis.keywordAnalysis.total} מילות מפתח נמצאו
                        </div>
                      </div>
                      {generatedContent.analysis.keywordAnalysis.missing.length > 0 && (
                        <div>
                          <span className="text-sm font-medium">מילות מפתח חסרות:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {generatedContent.analysis.keywordAnalysis.missing.map((keyword, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    מבנה התוכן
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ציון מבנה</span>
                      <Badge variant={getScoreBadgeVariant(generatedContent.analysis.structure.score)}>
                        {generatedContent.analysis.structure.score}/100
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {generatedContent.analysis.structure.hasHeadings ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm">כותרות משנה</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {generatedContent.analysis.structure.hasBulletPoints ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm">רשימות ונקודות</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metadata" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>פרטי התוכן</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <span className="text-sm font-medium">סוג תוכן:</span>
                      <p className="text-sm text-muted-foreground">
                        {contentTypes.find((t) => t.value === generatedContent.metadata.contentType)?.label}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">נושא:</span>
                      <p className="text-sm text-muted-foreground">{generatedContent.metadata.topic}</p>
                    </div>
                    {generatedContent.metadata.tone && (
                      <div>
                        <span className="text-sm font-medium">טון כתיבה:</span>
                        <p className="text-sm text-muted-foreground">
                          {tones.find((t) => t.value === generatedContent.metadata.tone)?.label}
                        </p>
                      </div>
                    )}
                    {generatedContent.metadata.length && (
                      <div>
                        <span className="text-sm font-medium">אורך:</span>
                        <p className="text-sm text-muted-foreground">
                          {lengths.find((l) => l.value === generatedContent.metadata.length)?.label}
                        </p>
                      </div>
                    )}
                    {generatedContent.metadata.targetAudience && (
                      <div>
                        <span className="text-sm font-medium">קהל יעד:</span>
                        <p className="text-sm text-muted-foreground">{generatedContent.metadata.targetAudience}</p>
                      </div>
                    )}
                    {generatedContent.metadata.keywords && (
                      <div className="md:col-span-2">
                        <span className="text-sm font-medium">מילות מפתח:</span>
                        <p className="text-sm text-muted-foreground">{generatedContent.metadata.keywords}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
