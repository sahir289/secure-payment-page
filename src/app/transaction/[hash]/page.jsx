"use client";

import { usePayment } from "@/hooks/usePayment";
import { useSearchParams, usePathname } from "next/navigation";
import { use, useState, useEffect, Suspense } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentTimer } from "@/components/payment-timer";
import { PaymentActions } from "@/components/payment-actions";
import UpiDetails from "@/components/payment-methods/upi-details";
import PhonePeDetails from "@/components/payment-methods/phonepe-details";
import BankTransferDetails from "@/components/payment-methods/bank-transfer-details";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PaymentPage from "@/components/payment-page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TransactionPage({ params }) {
  const resolvedParams = use(params);
  const hashCode = resolvedParams.hash;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const userId = searchParams.get("user_id");
  const code = searchParams.get("code");
  const ot = searchParams.get("ot");
  const key = searchParams.get("key");
  const orderParam = searchParams.get("order");
  const urlAmount = searchParams.get("amount");

  const [currentTab, setCurrentTab] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [inputAmount, setInputAmount] = useState(urlAmount || "");
  const [paymentType, setPaymentType] = useState("");
  const [ProceedToPay, setProceedToPay] = useState(false);
  const [error, setError] = useState("");

  const {
    state,
    actions: { handlePaymentInitialization, handleValidation },
  } = usePayment();

  const handleAmountSubmit = async (e) => {
    e.preventDefault();
    if (!paymentType) {
      setError("Please select a payment type.");
      return;
    }

    setProceedToPay(true);
    setCurrentTab(paymentType);

    const result = await handlePaymentInitialization({
      userId,
      code,
      ot,
      key,
      amount: inputAmount,
      hashCode,
    });

    if (result?.orderId) {
      await handleValidation(result.orderId, false);
    }
  };

  useEffect(() => {
    setIsClient(true);

    const initializePayment = async () => {
      try {
        if (orderParam) {
          await handleValidation(orderParam, true);
        } else if (userId && code && ot && key && hashCode) {
          console.log("Initializing payment...");
          const result = await handlePaymentInitialization({
            userId,
            code,
            ot,
            key,
            hashCode,
          });
          console.log("Payment initialization result:", result);

          if (result?.orderId) {
            await handleValidation(result.orderId, false);
          }
        }
      } catch (err) {
        console.error("Error initializing payment:", err);
      }
    };

    initializePayment();
  }, [orderParam, userId, code, ot, key, hashCode]);

  const handleTabChange = (value) => {
    const url = `${pathname}?tab=${value}`;
    window.history.pushState({}, "", url);
    setCurrentTab(value);
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  if (inputAmount && ProceedToPay) {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="mb-2 w-full max-w-md">
          <PaymentTimer initialMinutes={10} />
        </div>

        <Tabs
          value={currentTab || undefined}
          onValueChange={(val) => {
            if (!currentTab) handleTabChange(val);
          }}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-3">
            {!currentTab ? (
              <>
                <TabsTrigger value="upi">UPI</TabsTrigger>
                <TabsTrigger value="phonepe">PhonePe</TabsTrigger>
                <TabsTrigger value="bank-transfer">Bank Transfer</TabsTrigger>
              </>
            ) : (
              <TabsTrigger
                value={currentTab}
                className="col-span-3 pointer-events-none justify-center"
              >
                {currentTab === "upi" && "UPI"}
                {currentTab === "phonepe" && "PhonePe"}
                {currentTab === "bank-transfer" && "Bank Transfer"}
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>

        <div
          className={`mt-2 border rounded-lg p-6 bg-white shadow-md w-full max-w-md transition-all duration-300 ${
            currentTab
              ? "min-h-[200px] flex flex-col items-center justify-center"
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
        {/* <footer className="w-full text-gray-600 py-4 text-center text-sm border-t border-gray-200">
          &copy; {new Date().getFullYear()} SecurePay. All rights reserved.
        </footer> */}
      </div>
      //   <PaymentPage />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-1">
      <main className="flex-1 flex flex-col items-center justify-center p-2">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">
              Enter Payment Amount
            </CardTitle>
            <CardDescription className="text-gray-600">
              Please specify the amount you wish to pay.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAmountSubmit} className="space-y-6">
              <div>
                <label htmlFor="amount-input" className="sr-only">
                  Amount
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-500 text-3xl font-semibold">
                    ₹
                  </span>
                  <Input
                    id="amount-input"
                    type="number"
                    step="1"
                    placeholder="0.00"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value)}
                    className="h-12 text-3xl font-semibold text-center pl-12 pr-4 border-b-2 focus:outline-none transition-colors duration-200 rounded-lg w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="payment-type-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Payment Method
                </label>
                <Select value={paymentType} onValueChange={setPaymentType}>
                  <SelectTrigger
                    id="payment-type-select"
                    className={`w-full h-12 text-base ${
                      error ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Choose a type" />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem
                      className="hover:bg-green-50 focus:bg-green-50 focus:text-green-800"
                      value="upi"
                    >
                      Upi
                    </SelectItem>
                    <SelectItem
                      className="hover:bg-green-50 focus:bg-green-50 focus:text-green-800"
                      value="phonepe"
                    >
                      Phonepe
                    </SelectItem>
                    <SelectItem
                      className="hover:bg-green-50 focus:bg-green-50 focus:text-green-800"
                      value="bank-transfer"
                    >
                      Bank Transfer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg bg-green-500 hover:bg-green-600"
              >
                Proceed to Pay
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
