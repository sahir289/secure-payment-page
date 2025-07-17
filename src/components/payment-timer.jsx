"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export default function PaymentTimer({ initialMinutes = 10 }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60) // Time in seconds
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (isExpired) {
    return (
      <div className="flex items-center justify-center gap-2 text-red-600 font-semibold text-lg p-2 rounded-md bg-red-50 border border-red-200">
        <Clock className="h-5 w-5" />
        Payment Expired!
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-700 p-2 rounded-md bg-blue-50 border border-green-200">
      <Clock className="h-5 w-5 text-green-600" />
      Time remaining: <span className="text-green-600">{formatTime(timeLeft)}</span>
    </div>
  )
}
