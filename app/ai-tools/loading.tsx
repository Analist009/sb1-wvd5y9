import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AIToolsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section Skeleton */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-6" />
          <Skeleton className="h-16 w-full max-w-4xl mx-auto mb-6" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-8" />

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid Skeleton */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <div className="grid grid-cols-2 gap-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-3 w-full" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-8" />
                  </div>

                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
