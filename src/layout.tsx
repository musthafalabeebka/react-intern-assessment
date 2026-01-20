import { Outlet } from "react-router-dom"
import Navigation from "./components/navigation"
import { Toaster } from "@/components/ui/sonner"

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          classNames: {
            toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
            description: 'group-[.toast]:text-muted-foreground',
            actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
            cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
            error: 'group toast group-[.toaster]:bg-red-50 group-[.toaster]:text-red-900 group-[.toaster]:border-red-200 dark:group-[.toaster]:bg-red-950/30 dark:group-[.toaster]:text-red-200 dark:group-[.toaster]:border-red-800',
            success: 'group toast group-[.toaster]:bg-green-50 group-[.toaster]:text-green-900 group-[.toaster]:border-green-200 dark:group-[.toaster]:bg-green-950/30 dark:group-[.toaster]:text-green-200 dark:group-[.toaster]:border-green-800',
            warning: 'group toast group-[.toaster]:bg-amber-50 group-[.toaster]:text-amber-900 group-[.toaster]:border-amber-200 dark:group-[.toaster]:bg-amber-950/30 dark:group-[.toaster]:text-amber-200 dark:group-[.toaster]:border-amber-800',
            info: 'group toast group-[.toaster]:bg-blue-50 group-[.toaster]:text-blue-900 group-[.toaster]:border-blue-200 dark:group-[.toaster]:bg-blue-950/30 dark:group-[.toaster]:text-blue-200 dark:group-[.toaster]:border-blue-800',
          },
        }}
        expand={true}
        richColors
      />
    </div>
  )
}