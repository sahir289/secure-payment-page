import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, CheckCheck } from 'lucide-react';

export default function BankTransferDetails({ bankData }) {
  const [copied, setCopied] = useState({
    accNo: false,
    ifsc: false,
    amount: false,
    holderName: false,
    nickName: false
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

  if (!bankData) return <div>Loading bank details...</div>;

  return (
    <div className="w-full text-center space-y-3 mt-4">
      <h2 className="text-2xl font-semibold text-gray-800">
        Bank Transfer Details
      </h2>
        <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-medium">
          Amount:{" "}
          <span className="font-bold font-large text-green-600">{bankData.amount}</span>
        </p>
        </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        {/* Bank Name and Account Holder Name Row */}

        <div className="space-y-1">
          <label className="text-gray-600">Bank Name</label>
          <div className="bg-gray-50 p-2 rounded flex items-center">
            <span className="font-medium flex-1">{bankData.bank.nick_name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(bankData.bank.nick_name, 'nickName')}
              className="px-1 h-8"
            >
              {copied.nickName ? (
                <CheckCheck className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-gray-600">Account Holder</label>
          <div className="bg-gray-50 p-2 rounded flex items-center gap-2">
            <span className="font-medium flex-1">{bankData.bank.acc_holder_name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(bankData.bank.acc_holder_name, 'holderName')}
              className="px-1 h-8"
            >
              {copied.holderName ? (
                <CheckCheck className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </div>

        {/* Account Number and IFSC Row */}
        <div className="space-y-1">
          <label className="text-gray-600">Account Number</label>
          <div className="bg-gray-50 p-2 rounded flex items-center gap-2">
            <span className="font-medium flex-1">{bankData.bank.acc_no}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(bankData.bank.acc_no, 'accNo')}
              className="px-1 h-8"
            >
              {copied.accNo ? (
                <CheckCheck className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-gray-600">IFSC Code</label>
          <div className="bg-gray-50 p-2 rounded flex items-center gap-2">
            <span className="font-medium flex-1 uppercase">{bankData.bank.ifsc}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(bankData.bank.ifsc, 'ifsc')}
              className="px-1 h-8"
            >
              {copied.ifsc ? (
                <CheckCheck className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-4">
        Please transfer the amount to the bank details provided above.
      </p>
    </div>
  );
}
