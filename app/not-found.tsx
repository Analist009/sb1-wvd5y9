import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">הדף לא נמצא</p>
      <p className="text-muted-foreground">הדף שאתה מחפש אינו קיים או הועבר.</p>
      <Button asChild>
        <Link href="/">חזרה לדף הבית</Link>
      </Button>
    </div>
  )
}
