import Link from "next/link"
import "./globals.css"
import { Comfortaa } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"

const comfortaa = Comfortaa({ subsets: ["latin"] })

export const metadata = {
  title: "DiscoveryNotes",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${comfortaa.className}`}
      >
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between">
                <nav className="ml-auto text-sm font-medium space-x-6">
                  <Link className="font-bold" href="/">DiscoveryNotes</Link>
                  <Link href="/dev">Dev Log</Link>
                  <Link href="/about">About</Link>
                </nav>
              </div>
            </header>
            <main>{children}</main>
          </div>
          <Analytics />
      </body>
    </html>
  )
}
