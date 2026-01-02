import { Button } from "~/shared/shadcn/button"
import { CheckCircle2 } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 group cursor-pointer transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-linear-to-br from-primary to-primary/80 group-hover:shadow-lg transition-shadow duration-300">
              <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MakeMeReady</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
            >
              Sign In
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
