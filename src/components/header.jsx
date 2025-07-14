import Link from "next/link"
import { Wallet } from "lucide-react" // Changed icon for a more general payment feel

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 py-3 px-6 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <Wallet className="h-6 w-6 text-green-600" />
          <span>Secure Pay</span> 
        </Link>
      </div>
    </header>
  )
}
