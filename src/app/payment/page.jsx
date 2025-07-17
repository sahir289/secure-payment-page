"use client";

import { PaymentActions } from "@/components/payment-actions";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import BankTransferDetails from "@/components/payment-methods/bank-transfer-details";
import PhonePeDetails from "@/components/payment-methods/phonepe-details";
import UpiDetails from "@/components/payment-methods/upi-details";
import { PaymentTimer } from "@/components/payment-timer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense, useEffect, useState } from "react";

export function PaymentPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const [currentTab, setCurrentTab] = useState("tab");

  useEffect(() => {
    // This code runs only on the client side after the component mounts
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setCurrentTab(params.get("tab"));
    }
  }, []);

  const handleTabChange = (value) => {
    router.push(`${pathname}?tab=${value}`);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-2 w-full max-w-md">
        <PaymentTimer initialMinutes={10} />
      </div>
      <Tabs
        value={currentTab || undefined}
        onValueChange={handleTabChange}
        className="w-full max-w-md"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upi">UPI</TabsTrigger>
          <TabsTrigger value="phonepe">PhonePe</TabsTrigger>
          <TabsTrigger value="bank-transfer">Bank Transfer</TabsTrigger>
        </TabsList>
      </Tabs>

      <div
        className={`mt-2 border rounded-lg p-6 bg-white shadow-md w-full max-w-md transition-all duration-300 ${
          currentTab
            ? "min-h-[200px] flex flex-col items-center justify-center text-muted-foreground"
            : ""
        }`}
      >
        <Suspense fallback={<p>Loading payment details...</p>}>
          {currentTab === "upi" && <UpiDetails />}
          {currentTab === "phonepe" && <PhonePeDetails />}
          {currentTab === "bank-transfer" && <BankTransferDetails />}
          {!currentTab && (
            <p className="text-sm text-center text-muted-foreground">
              Select a payment method above to view details.
            </p>
          )}
        </Suspense>
      </div>

      <PaymentActions />

      <footer className="w-full  text-gray-600 py-4 text-center text-sm border-t border-gray-200">
        &copy; {new Date().getFullYear()} SecurePay. All rights reserved.
      </footer>
    </div>
  );
}
