import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import QrGenerator from "../qr-code/page";
import { Copy, CheckCheck } from 'lucide-react'; // Add this import

export default function PhonePeDetails({ bankData }) {
  const [copied, setCopied] = useState({
    upiId: false,
    code: false
  });

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(prev => ({
      ...prev,
      [field]: true
    }));
    setTimeout(() => {
      setCopied(prev => ({
        ...prev,
        [field]: false
      }));
    }, 2000);
  };

  // Early return if no data or required fields
  if (!bankData || !bankData.bank.upi_id) {
    return <div>Loading PhonePe details...</div>;
  }

  // Generate QR code value
  const qrValue = bankData.upi_id || '';

  return (
    <div className="text-center space-y-4">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg w-full">
          <p className="flex-1 text-lg font-medium text-gray-700">
            UPI ID: <span className="font-bold text-gray-900">{bankData.bank.upi_id}</span>
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopy(bankData.bank.upi_id, 'upiId')}
            className="px-2"
          >
            {copied.upiId ? (
              <CheckCheck className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </div>
        <div className="relative w-48 h-48 border p-2 rounded-lg bg-white shadow-sm">
          <QrGenerator upi_id={bankData.bank.upi_id} ac_name={"sbi"} amount={"500"} size={"170"} code={bankData.bank.code} />
          <p className="text-xs text-gray-500 mt-1">Scan to Pay with PhonePe</p>
        </div>
      </div>
      <p className="text-sm text-gray-600">Open your PhonePe app and pay to the provided number or scan the QR code.</p>
    </div>
  )
}
