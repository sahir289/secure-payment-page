import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Payment Options",
  description: "Select your preferred payment method",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <header className="bg-white py-4 px-6 border-b shadow-sm lg:block hidden">
            <h1 className="text-2xl font-bold text-gray-800">Choose Payment Method</h1>
          </header>
          <main className="flex-1 p-6 max-w-3xl mx-auto w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
