"use client"

import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useState, useEffect } from "react" // Import useState and useEffect

export default function PaymentResultDialog({ status, message, onReset }) {
  let icon, title, description, buttonText, buttonVariant, titleColor, iconColor

  const [countdown, setCountdown] = useState(5) // New state for countdown

  useEffect(() => {
    if (status === "success" && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (status === "success" && countdown === 0) {
      // Redirect after countdown
      window.location.href = "https://www.fb.com"
    }
  }, [status, countdown]) // Depend on status and countdown

  switch (status) {
    case "success":
      icon = <CheckCircle className="h-16 w-16 mx-auto mb-4" />
      title = "Payment Confirmation Submitted!"
      description =
        message || "Your payment details have been successfully submitted. We are now verifying your transaction."
      // buttonText = "Go Back to Payment Options"
      buttonVariant = "default"
      titleColor = "text-green-700"
      iconColor = "text-green-500"
      break
    case "failure":
      icon = <XCircle className="h-16 w-16 mx-auto mb-4" />
      title = "Submission Failed!"
      description =
        message || "There was an issue submitting your payment details. Please check your input and try again."
      // buttonText = "Try Again"
      buttonVariant = "destructive"
      titleColor = "text-red-700"
      iconColor = "text-red-500"
      break
    case "warning":
      icon = <AlertTriangle className="h-16 w-16 mx-auto mb-4" />
      title = "Payment Review Needed!"
      description = message || "There might be an issue with your payment details. Please review and try again."
      // buttonText = "Go Back"
      buttonVariant = "outline"
      titleColor = "text-yellow-700"
      iconColor = "text-yellow-500"
      break
    default:
      icon = <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-gray-500" />
      title = "Unknown Status"
      description = "An unexpected error occurred. Please try again."
      // buttonText = "Close"
      buttonVariant = "outline"
      titleColor = "text-gray-700"
      iconColor = "text-gray-500"
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <DialogHeader>
        <div className={iconColor}>{icon}</div>
        <DialogTitle className={`text-2xl font-bold ${titleColor}`}>{title}</DialogTitle>
        <DialogDescription className="text-gray-600">{description}</DialogDescription>
      </DialogHeader>

      {status === "success" && (
        <p className="text-sm text-gray-500">
          Redirecting to Facebook in <span className="font-bold text-green-600">{countdown}</span> seconds...
        </p>
      )}
      {status === "warning" && (
        <p className="text-sm text-gray-500">
          Our team will review your submission. For urgent matters, please contact support.
        </p>
      )}
      {status === "failure" && (
        <p className="text-sm text-gray-500">If the problem persists, please contact support.</p>
      )}

    </div>
  )
}
