"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Loader2,
  Search,
  TrendingUp,
  BarChart3,
  Lightbulb,
  AlertCircle,
  Globe,
  Target,
  Zap,
  Eye,
  Share2,
  Settings,
} from "lucide-react"

interface Competitor {
  name: string
  domain: string
  size: string
  strengths: string[]
  weaknesses: string[]
  marketShare: string
}

interface CompetitorAnalysis {
  domainAnalysis: {
    domain: string
    industry: string
    marketSize: string
    position: string
    strengths: string[]
    weaknesses: string[]
  }
  competitors: Competitor[]
  seoAnalysis: {
    competitorKeywords: string[]
    contentGaps: string[]
    linkingOpportunities: string[]
    rankingOpportunities: string[]
  }
  contentAnalysis: {
    contentTypes: string[]
    publishingFrequency: string
    popularTopics: string[]
    contentGaps: string[]
  }
  socialMediaAnalysis: {
    platforms: string[]
    engagementLevel: string
    contentStrategy: string[]
    opportunities: string[]
  }
  technicalAnalysis: {
    siteSpeed: string
    userExperience: string
    designQuality: string
    improvements: string[]
  }
  recommendations: {
    opportunities: string[]
    differentiationStrategy: string[]
    investmentAreas: string[]
    actionPlan: {
      shortTerm: string[]
      longTerm: string[]
    }
  }
}

export function CompetitorAnalysisTool() {
  const [domain, setDomain] = useState("")
  const [competitors, setCompetitors] = useState("")
  const [analysisType, setAnalysisType] = useState("comprehensive")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<CompetitorAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!domain.trim()) {
      setError("אנא הזן דומיין לניתוח")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const competitorsList = competitors
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c.length > 0)

      const response = await fetch("/api/competitor-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: domain.trim(),
          competitors: competitorsList,
          analysisType,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze competitors")
      }

      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (error) {
      console.error("Error analyzing competitors:", error)
      setError(error instanceof Error ? error.message : "Failed to analyze competitors")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getPositionColor = (position: string) => {
    switch (position.toLowerCase()) {
      case "מוביל":
        return "text-green-600"
      case "מאתגר":
        return "text-blue-600"
      case "חדש":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  const getSizeColor = (size: string) => {
    switch (size.toLowerCase()) {
      case "גדול":
        return "bg-red-100 text-red-800"
      case "בינוני":
        return "bg-yellow-100 text-yellow-800"
      case "קטן":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* כותרת */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          ניתוח מתחרים חכם
        </h1>
        <p className="text-muted-foreground">
          נתח את המתחרים שלך, גלה הזדמנויות חדשות וקבל המלצות אסטרטגיות לשיפור המיקום התחרותי שלך
        </p>
      </div>

      {/* טופס ניתוח */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            הזן פרטים לניתוח
          </CardTitle>
          <CardDescription>הזן את הדומיין שלך ופרטים נוספים לקבלת ניתוח מקיף של המתחרים</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">דומיין לניתוח *</label>
              <Input
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">סוג ניתוח</label>
              <Select value={analysisType} onValueChange={setAnalysisType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comprehensive">ניתוח מקיף</SelectItem>
                  <SelectItem value="seo">ניתוח SEO</SelectItem>
                  <SelectItem value="content">ניתוח תוכן</SelectItem>
                  <SelectItem value="technical">ניתוח טכני</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">מתחרים ידועים (אופציונלי)</label>
            <Input
              placeholder="competitor1.com, competitor2.com, competitor3.com"
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">הפרד בין מתחרים בפסיק</p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button onClick={handleAnalyze} disabled={isAnalyzing || !domain.trim()} className="w-full gap-2" size="lg">
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                מנתח מתחרים...
              </>
            ) : (
              <>
                <Users className="h-5 w-5" />
                נתח מתחרים
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* תוצאות הניתוח */}
      {analysis && (
        <div className="space-y-6">
          {/* ניתוח כללי */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  ניתוח כללי
                </span>
                <Badge className="text-lg px-3 py-1">{analysis.domainAnalysis.domain}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">תעשייה</span>
                  </div>
                  <div className="text-lg font-semibold">{analysis.domainAnalysis.industry}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">גודל שוק</span>
                  </div>
                  <div className="text-lg font-semibold">{analysis.domainAnalysis.marketSize}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">מיקום תחרותי</span>
                  </div>
                  <div className={`text-lg font-semibold ${getPositionColor(analysis.domainAnalysis.position)}`}>
                    {analysis.domainAnalysis.position}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">מתחרים זוהו</span>
                  </div>
                  <div className="text-lg font-semibold">{analysis.competitors.length}</div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2 text-green-600">נקודות חוזק:</h4>
                  <ul className="space-y-1">
                    {analysis.domainAnalysis.strengths.map((strength, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-red-600">נקודות חולשה:</h4>
                  <ul className="space-y-1">
                    {analysis.domainAnalysis.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"></div>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* טאבים לתוצאות מפורטות */}
          <Tabs defaultValue="competitors" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="competitors">מתחרים</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="content">תוכן</TabsTrigger>
              <TabsTrigger value="social">רשתות חברתיות</TabsTrigger>
              <TabsTrigger value="technical">טכני</TabsTrigger>
              <TabsTrigger value="recommendations">המלצות</TabsTrigger>
            </TabsList>

            <TabsContent value="competitors" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {analysis.competitors.map((competitor, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{competitor.name}</span>
                        <Badge className={getSizeColor(competitor.size)}>{competitor.size}</Badge>
                      </CardTitle>
                      <CardDescription>{competitor.domain}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <span className="text-sm font-medium">נתח שוק: </span>
                        <Badge variant="outline">{competitor.marketShare}</Badge>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium mb-2 text-green-600">נקודות חוזק:</h5>
                        <div className="space-y-1">
                          {competitor.strengths.map((strength, idx) => (
                            <div key={idx} className="text-xs flex items-start gap-2">
                              <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 shrink-0"></div>
                              {strength}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium mb-2 text-red-600">נקודות חולשה:</h5>
                        <div className="space-y-1">
                          {competitor.weaknesses.map((weakness, idx) => (
                            <div key={idx} className="text-xs flex items-start gap-2">
                              <div className="w-1 h-1 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                              {weakness}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      מילות מפתח של מתחרים
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysis.seoAnalysis.competitorKeywords.map((keyword, index) => (
                        <Badge key={index} variant="outline">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      הזדמנויות דירוג
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.seoAnalysis.rankingOpportunities.map((opportunity, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <Zap className="h-3 w-3 text-yellow-500 mt-1 shrink-0" />
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      פערי תוכן
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.seoAnalysis.contentGaps.map((gap, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                          {gap}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      הזדמנויות קישורים
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.seoAnalysis.linkingOpportunities.map((opportunity, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 shrink-0"></div>
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>סוגי תוכן פופולריים</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysis.contentAnalysis.contentTypes.map((type, index) => (
                        <Badge key={index} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>תדירות פרסום</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-semibold">{analysis.contentAnalysis.publishingFrequency}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>נושאים פופולריים</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysis.contentAnalysis.popularTopics.map((topic, index) => (
                        <Badge key={index} variant="outline">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>פערי תוכן</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.contentAnalysis.contentGaps.map((gap, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <Lightbulb className="h-3 w-3 text-yellow-500 mt-1 shrink-0" />
                          {gap}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      פלטפורמות פעילות
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysis.socialMediaAnalysis.platforms.map((platform, index) => (
                        <Badge key={index} variant="secondary">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>רמת מעורבות</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-semibold">{analysis.socialMediaAnalysis.engagementLevel}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>אסטרטגיית תוכן</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.socialMediaAnalysis.contentStrategy.map((strategy, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>הזדמנויות</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.socialMediaAnalysis.opportunities.map((opportunity, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <Zap className="h-3 w-3 text-yellow-500 mt-1 shrink-0" />
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      ביצועים טכניים
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <span className="text-sm font-medium">מהירות אתר: </span>
                      <span className="text-sm">{analysis.technicalAnalysis.siteSpeed}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">חוויית משתמש: </span>
                      <span className="text-sm">{analysis.technicalAnalysis.userExperience}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">איכות עיצוב: </span>
                      <span className="text-sm">{analysis.technicalAnalysis.designQuality}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>שיפורים מומלצים</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.technicalAnalysis.improvements.map((improvement, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <Settings className="h-3 w-3 text-blue-500 mt-1 shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <Lightbulb className="h-5 w-5" />
                      הזדמנויות
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.recommendations.opportunities.map((opportunity, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <Zap className="h-3 w-3 text-green-500 mt-1 shrink-0" />
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <Target className="h-5 w-5" />
                      אסטרטגיית התמיינות
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.recommendations.differentiationStrategy.map((strategy, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-600">
                      <TrendingUp className="h-5 w-5" />
                      תחומי השקעה
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysis.recommendations.investmentAreas.map((area, index) => (
                        <Badge key={index} variant="outline">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-600">
                      <BarChart3 className="h-5 w-5" />
                      תוכנית פעולה
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2">טווח קצר:</h5>
                      <ul className="space-y-1">
                        {analysis.recommendations.actionPlan.shortTerm.map((action, index) => (
                          <li key={index} className="text-xs flex items-start gap-2">
                            <div className="w-1 h-1 bg-orange-500 rounded-full mt-1.5 shrink-0"></div>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-2">טווח ארוך:</h5>
                      <ul className="space-y-1">
                        {analysis.recommendations.actionPlan.longTerm.map((action, index) => (
                          <li key={index} className="text-xs flex items-start gap-2">
                            <div className="w-1 h-1 bg-purple-500 rounded-full mt-1.5 shrink-0"></div>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
