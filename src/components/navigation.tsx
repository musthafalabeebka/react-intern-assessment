import { Link, useLocation } from "react-router-dom"
import { Home, PlusCircle, Archive } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const location = useLocation()
  
  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/create", label: "Create", icon: PlusCircle },
    { to: "/archive", label: "Archive", icon: Archive },
  ]

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">👵</span>
            <span className="font-bold text-xl">Grandma's Recipes</span>
          </Link>
          
          <div className="flex items-center space-x-1">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.to
              
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}