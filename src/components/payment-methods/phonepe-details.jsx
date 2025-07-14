import Image from "next/image"
import { useEffect, useState } from "react";
import QrGenerator from "../qr-code/page";

export default function PhonePeDetails() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])
  
  if (loading) return <div>Loading...</div>

  return (
    <div className="text-center space-y-4">
      {/* <h2 className="text-2xl font-semibold text-gray-800">Pay with PhonePe</h2> */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-medium">
          PhonePe Number: <span className="font-bold text-green-600">+91 98765 43210</span>
        </p>
        <div className="relative w-48 h-48 border p-2 rounded-lg bg-white shadow-sm">
          {/* <Image
            src="/placeholder.svg?height=192&width=192"
            alt="PhonePe QR Code"
            width={192}
            height={192}
            className="object-contain"
          /> */}
          <QrGenerator upi_id = {"abc@hdfc"} ac_name = {"sbi"} amount={"500"} size={"170"} code={"yguye"} />
          <p className="text-xs text-gray-500 mt-1">Scan to Pay with PhonePe</p>
        </div>
      </div>
      <p className="text-sm text-gray-600">Open your PhonePe app and pay to the provided number or scan the QR code.</p>
    </div>
  )
}
