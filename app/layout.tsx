import { ToastProvider } from "@/components/ui/use-toast"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}


import './globals.css'

