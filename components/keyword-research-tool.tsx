"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Loader2,
  Target,
  TrendingUp,
  BarChart3,
  Lightbulb,
  AlertCircle,
  HelpCircle,
  Calendar,
  DollarSign,
  Eye,
  Zap,
} from "lucide-react"

interface KeywordData {
  keyword: string
  searchVolume: number
  competition: string
  difficulty: number
  intent?: string
  cpc?: number
}

interface KeywordResearch {
  mainKeyword: KeywordData & { intent: string; cpc: number }
  relatedKeywords: KeywordData[]
  competitorKeywords: Array<{ keyword: string; searchVolume: number; opportunity: string }>
  questions: string[]
  recommendations: {
    contentStrategy: string[]
    contentTypes: string[]
    longTermStrategy: string
  }
  seasonality: {
    isSeasonsal: boolean
    peakMonths: string[]
    insights: string
  }
}

export function KeywordResearchTool() {
  const [keyword, setKeyword] = useState("")
  const [language, setLanguage] = useState("he")
  const [country, setCountry] = useState("IL")
  const [isResearching, setIsResearching] = useState(false)
  const [research, setResearch] = useState<KeywordResearch | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleResearch = async () => {
    if (!keyword.trim()) {
      setError("אנא הזן מילת מפתח לחיפוש")
      return
    }

    setIsResearching(true)
    setError(null)

    try {
      const response = await fetch("/api/keyword-research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword: keyword.trim(),
          language,
          country,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to research keywords")
      }

      const data = await response.json()
      setResearch(data.research)
    } catch (error) {
      console.error("Error researching keywords:", error)
      setError(error instanceof Error ? error.message : "Failed to research keywords")
    } finally {
      setIsResearching(false)
    }
  }

  const getCompetitionColor = (competition: string) => {
    switch (competition.toLowerCase()) {
      case "נמוכה":
        return "text-green-600"
      case "בינונית":
        return "text-yellow-600"
      case "גבוהה":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getCompetitionBadge = (competition: string) => {
    switch (competition.toLowerCase()) {
      case "נמוכה":
        return "default"
      case "בינונית":
        return "secondary"
      case "גבוהה":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return "text-green-600"
    if (difficulty <= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* כותרת */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Target className="h-8 w-8 text-primary" />
          מחקר מילות מפתח חכם
        </h1>
        <p className="text-muted-foreground">
          גלה מילות מפתח רווחיות, נתח תחרותיות וקבל המלצות אסטרטגיות לשיפור דירוג האתר שלך
        </p>
      </div>

      {/* טופס חיפוש */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            הזן מילת מפתח לחיפוש
          </CardTitle>
          <CardDescription>הזן מילת מפתח או ביטוי שתרצה לחקור ולקבל ניתוח מקיף</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">מילת מפתח *</label>
              <Input
                placeholder="לדוגמה: בניית אתרים"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleResearch()}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">שפה</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="he">עברית</SelectItem>
                  <SelectItem value="en">אנגלית</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">מדינה</label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IL">ישראל</SelectItem>
                  <SelectItem value="US">ארצות הברית</SelectItem>
                  <SelectItem value="GB">בריטניה</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            onClick={handleResearch}
            disabled={isResearching || !keyword.trim()}
            className="w-full gap-2"
            size="lg"
          >
            {isResearching ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                חוקר מילות מפתח...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                חקור מילות מפתח
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* תוצאות המחקר */}
      {research && (
        <div className="space-y-6">
          {/* ניתוח מילת המפתח הראשית */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  ניתוח מילת המפתח הראשית
                </span>
                <Badge className="text-lg px-3 py-1">{research.mainKeyword.keyword}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">נפח חיפושים חודשי</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatNumber(research.mainKeyword.searchVolume)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">תחרותיות</span>
                  </div>
                  <Badge variant={getCompetitionBadge(research.mainKeyword.competition)}>
                    {research.mainKeyword.competition}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">קושי דירוג</span>
                  </div>
                  <div className="space-y-1">
                    <div className={`text-xl font-bold ${getDifficultyColor(research.mainKeyword.difficulty)}`}>
                      {research.mainKeyword.difficulty}/100
                    </div>
                    <Progress value={research.mainKeyword.difficulty} className="h-2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">CPC משוער</span>
                  </div>
                  <div className="text-xl font-bold text-green-600">${research.mainKeyword.cpc}</div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">כוונת חיפוש</span>
                </div>
                <Badge variant="outline">{research.mainKeyword.intent}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* טאבים לתוצאות מפורטות */}
          <Tabs defaultValue="related" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="related">מילות מפתח קשורות</TabsTrigger>
              <TabsTrigger value="competitors">מתחרים</TabsTrigger>
              <TabsTrigger value="questions">שאלות נפוצות</TabsTrigger>
              <TabsTrigger value="recommendations">המלצות</TabsTrigger>
              <TabsTrigger value="seasonality">עונתיות</TabsTrigger>
            </TabsList>

            <TabsContent value="related" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    מילות מפתח קשורות
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {research.relatedKeywords.map((kw, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{kw.keyword}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatNumber(kw.searchVolume)} חיפושים חודשיים
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={getCompetitionBadge(kw.competition)}>{kw.competition}</Badge>
                          <div className={`text-sm font-medium ${getDifficultyColor(kw.difficulty)}`}>
                            {kw.difficulty}/100
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competitors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    מילות מפתח של מתחרים
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {research.competitorKeywords.map((kw, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{kw.keyword}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatNumber(kw.searchVolume)} חיפושים חודשיים
                          </div>
                        </div>
                        <Badge variant="outline">{kw.opportunity}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    שאלות נפוצות
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    {research.questions.map((question, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <HelpCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm">{question}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <Lightbulb className="h-5 w-5" />
                      אסטרטגיית תוכן
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {research.recommendations.contentStrategy.map((strategy, index) => (
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
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <Target className="h-5 w-5" />
                      סוגי תוכן מומלצים
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {research.recommendations.contentTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-600">
                      <TrendingUp className="h-5 w-5" />
                      אסטרטגיה לטווח ארוך
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{research.recommendations.longTermStrategy}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="seasonality" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    ניתוח עונתיות
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">עונתיות:</span>
                      <Badge variant={research.seasonality.isSeasonsal ? "default" : "secondary"}>
                        {research.seasonality.isSeasonsal ? "קיימת" : "לא קיימת"}
                      </Badge>
                    </div>
                  </div>

                  {research.seasonality.peakMonths.length > 0 && (
                    <div>
                      <span className="text-sm font-medium mb-2 block">חודשי שיא:</span>
                      <div className="flex flex-wrap gap-1">
                        {research.seasonality.peakMonths.map((month, index) => (
                          <Badge key={index} variant="outline">
                            {month}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium mb-2 block">תובנות:</span>
                    <p className="text-sm text-muted-foreground">{research.seasonality.insights}</p>
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
