"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Loader2,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  FileText,
  Settings,
  Target,
  Lightbulb,
  Clock,
  BarChart3,
  Zap,
} from "lucide-react"

interface SEOAnalysis {
  overallScore: number
  keywordAnalysis: {
    foundKeywords: string[]
    keywordDensity: Record<string, number>
    suggestedKeywords: string[]
    longTailKeywords: string[]
  }
  contentAnalysis: {
    quality: string
    wordCount: number
    readability: string
    structure: string
  }
  technicalAnalysis: {
    titleTag: { status: string; score: number }
    metaDescription: { status: string; score: number }
    headings: { status: string; score: number }
    images: { status: string; score: number }
  }
  issues: {
    critical: string[]
    medium: string[]
    opportunities: string[]
  }
  recommendations: {
    immediate: string[]
    mediumTerm: string[]
    longTerm: string[]
  }
  impact: {
    rankingImprovement: string
    timeframe: string
  }
}

export function SEOAnalyzer() {
  const [content, setContent] = useState("")
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [targetKeywords, setTargetKeywords] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!content.trim() && !url.trim()) {
      setError("אנא הזן תוכן או כתובת אתר לניתוח")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/seo-analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          url,
          title,
          metaDescription,
          targetKeywords,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze content")
      }

      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (error) {
      console.error("Error analyzing content:", error)
      setError(error instanceof Error ? error.message : "Failed to analyze content")
    } finally {
      setIsAnalyzing(false)
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
          <Search className="h-8 w-8 text-primary" />
          מנתח SEO חכם
        </h1>
        <p className="text-muted-foreground">נתח את התוכן שלך וקבל המלצות מקצועיות לשיפור דירוג במנועי החיפוש</p>
      </div>

      {/* טופס ניתוח */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            הזן תוכן לניתוח
          </CardTitle>
          <CardDescription>הזן את התוכן שלך או כתובת אתר לקבלת ניתוח SEO מקיף</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">כתובת אתר (אופציונלי)</label>
              <Input placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">מילות מפתח יעד (אופציונלי)</label>
              <Input
                placeholder="קידום אתרים, SEO, שיווק דיגיטלי"
                value={targetKeywords}
                onChange={(e) => setTargetKeywords(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">כותרת הדף (אופציונלי)</label>
              <Input placeholder="כותרת הדף שלך" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">תיאור מטא (אופציונלי)</label>
              <Input
                placeholder="תיאור קצר של הדף"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">תוכן לניתוח *</label>
            <Textarea
              placeholder="הדבק כאן את התוכן שלך לניתוח SEO..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="resize-none"
            />
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || (!content.trim() && !url.trim())}
            className="w-full gap-2"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                מנתח תוכן...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                נתח SEO
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* תוצאות הניתוח */}
      {analysis && (
        <div className="space-y-6">
          {/* ציון כללי */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  ציון SEO כללי
                </span>
                <Badge variant={getScoreBadgeVariant(analysis.overallScore)} className="text-lg px-3 py-1">
                  {analysis.overallScore}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={analysis.overallScore} className="h-3 mb-2" />
              <p className="text-sm text-muted-foreground">
                {analysis.overallScore >= 80 && "מעולה! האתר שלך מותאם היטב למנועי חיפוש"}
                {analysis.overallScore >= 60 && analysis.overallScore < 80 && "טוב, אבל יש מקום לשיפור"}
                {analysis.overallScore < 60 && "זקוק לשיפורים משמעותיים"}
              </p>
            </CardContent>
          </Card>

          {/* טאבים לתוצאות מפורטות */}
          <Tabs defaultValue="keywords" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="keywords">מילות מפתח</TabsTrigger>
              <TabsTrigger value="content">תוכן</TabsTrigger>
              <TabsTrigger value="technical">טכני</TabsTrigger>
              <TabsTrigger value="issues">בעיות</TabsTrigger>
              <TabsTrigger value="recommendations">המלצות</TabsTrigger>
            </TabsList>

            <TabsContent value="keywords" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    ניתוח מילות מפתח
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">מילות מפתח שזוהו:</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordAnalysis.foundKeywords.map((keyword, index) => (
                        <Badge key={index} variant="outline">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">צפיפות מילות מפתח:</h4>
                    <div className="space-y-2">
                      {Object.entries(analysis.keywordAnalysis.keywordDensity).map(([keyword, density]) => (
                        <div key={keyword} className="flex items-center justify-between">
                          <span className="text-sm">{keyword}</span>
                          <span className="text-sm font-medium">{density}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">מילות מפתח מוצעות:</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordAnalysis.suggestedKeywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">מילות מפתח ארוכות:</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordAnalysis.longTailKeywords.map((keyword, index) => (
                        <Badge key={index} className="bg-primary/10 text-primary hover:bg-primary/20">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    ניתוח תוכן
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">איכות התוכן:</span>
                        <span className="text-sm">{analysis.contentAnalysis.quality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">מספר מילים:</span>
                        <span className="text-sm">{analysis.contentAnalysis.wordCount}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">קריאות:</span>
                        <span className="text-sm">{analysis.contentAnalysis.readability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">מבנה:</span>
                        <span className="text-sm">{analysis.contentAnalysis.structure}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    ניתוח טכני
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">כותרת דף</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{analysis.technicalAnalysis.titleTag.status}</span>
                          <Badge variant={getScoreBadgeVariant(analysis.technicalAnalysis.titleTag.score)}>
                            {analysis.technicalAnalysis.titleTag.score}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">תיאור מטא</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{analysis.technicalAnalysis.metaDescription.status}</span>
                          <Badge variant={getScoreBadgeVariant(analysis.technicalAnalysis.metaDescription.score)}>
                            {analysis.technicalAnalysis.metaDescription.score}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">כותרות</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{analysis.technicalAnalysis.headings.status}</span>
                          <Badge variant={getScoreBadgeVariant(analysis.technicalAnalysis.headings.score)}>
                            {analysis.technicalAnalysis.headings.score}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">תמונות</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{analysis.technicalAnalysis.images.status}</span>
                          <Badge variant={getScoreBadgeVariant(analysis.technicalAnalysis.images.score)}>
                            {analysis.technicalAnalysis.images.score}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="issues" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      בעיות קריטיות
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.issues.critical.map((issue, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                          {issue}
                        </li>
                      ))}
                      {analysis.issues.critical.length === 0 && (
                        <li className="text-sm text-muted-foreground">אין בעיות קריטיות</li>
                      )}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-600">
                      <AlertTriangle className="h-5 w-5" />
                      בעיות בינוניות
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.issues.medium.map((issue, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                          {issue}
                        </li>
                      ))}
                      {analysis.issues.medium.length === 0 && (
                        <li className="text-sm text-muted-foreground">אין בעיות בינוניות</li>
                      )}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <TrendingUp className="h-5 w-5" />
                      הזדמנויות
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.issues.opportunities.map((opportunity, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <Zap className="h-5 w-5" />
                      פעולות מיידיות
                    </CardTitle>
                    <CardDescription>עדיפות גבוהה</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.recommendations.immediate.map((rec, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-600">
                      <Clock className="h-5 w-5" />
                      טווח בינוני
                    </CardTitle>
                    <CardDescription>שיפורים לשבועיים הקרובים</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.recommendations.mediumTerm.map((rec, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <TrendingUp className="h-5 w-5" />
                      טווח ארוך
                    </CardTitle>
                    <CardDescription>אסטרטגיה לחודשים הקרובים</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.recommendations.longTerm.map((rec, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* תחזית השפעה */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    תחזית השפעה
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <span className="text-sm font-medium">שיפור צפוי בדירוג:</span>
                    <p className="text-lg font-bold text-primary">{analysis.impact.rankingImprovement}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">זמן לתוצאות:</span>
                    <p className="text-lg font-bold text-primary">{analysis.impact.timeframe}</p>
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
