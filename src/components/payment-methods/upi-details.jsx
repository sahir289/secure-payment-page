import Image from "next/image";
import { useEffect, useState } from "react";
import QrGenerator from "../qr-code/page";

export default function UpiDetails() {
  // Simulate an API call to fetch UPI details
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="text-center space-y-4">
      {/* <h2 className="text-xl font-semibold text-gray-800">Pay with UPI</h2> */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-medium">
          UPI ID:{" "}
          <span className="font-bold text-green-600">yourname@bankupi</span>
        </p>
        <div className="relative w-48 h-48 border p-2 rounded-lg bg-white shadow-sm">
          <QrGenerator className="object-contain"
            upi_id={"abc@hdfc"}
            ac_name={"sbi"}
            amount={"500"}
            size={"170"}
            code={"yguye"}
          />
          <p className="text-xs text-gray-500 mt-1">Scan to Pay</p>
        </div>
      </div>
      <p className="text-sm text-gray-600">
        Please use your preferred UPI app to scan the QR or enter the UPI ID.
      </p>
    </div>
  );
}
