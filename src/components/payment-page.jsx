import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { PaymentActions } from "./payment-actions";
import { PaymentTimer } from "./payment-timer";
import UpiDetails from "./payment-methods/upi-details";
import PhonePeDetails from "./payment-methods/phonepe-details";
import BankTransferDetails from "./payment-methods/bank-transfer-details";

export default function PaymentPage({
  isValidated,
  showExpiredModal,
  upi,
  phonePay,
  bank,
  amount,
  remainingTime
}) {
  const [currentTab, setCurrentTab] = useState(null);

  if (!isValidated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 max-w-md mx-auto">
      <PaymentTimer initialMinutes={10} />
      
      <div className="w-full mt-4">
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-3">
            {upi && <TabsTrigger value="upi">UPI</TabsTrigger>}
            {phonePay && <TabsTrigger value="phonepe">PhonePe</TabsTrigger>}
            {bank && <TabsTrigger value="bank">Bank Transfer</TabsTrigger>}
          </TabsList>
        </Tabs>
      </div>

      <div className="w-full mt-4 p-4 border rounded-lg">
        {currentTab === "upi" && <UpiDetails />}
        {currentTab === "phonepe" && <PhonePeDetails />}
        {currentTab === "bank" && <BankTransferDetails />}
        {!currentTab && (
          <p className="text-center text-gray-500">
            Select a payment method above
          </p>
        )}
      </div>

      <PaymentActions amount={amount} merchantOrderId={bank.merchantOrderId} />
    </div>
  );
}
