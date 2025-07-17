// "use client";

// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import { Suspense, useEffect, useState } from "react";
// import { PaymentActions } from "@/components/payment-actions";
// import { PaymentTimer } from "@/components/payment-timer";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import UpiDetails from "@/components/payment-methods/upi-details";
// import PhonePeDetails from "@/components/payment-methods/phonepe-details";
// import BankTransferDetails from "@/components/payment-methods/bank-transfer-details";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Header from "@/components/header";
// import { usePayment } from "@/hooks/usePayment";

// export default function HomePage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const [urlAmount, setUrlAmount] = useState(null);
//   const [currentTab, setCurrentTab] = useState(null);
//   const [isClient, setIsClient] = useState(false);

//   const [inputAmount, setInputAmount] = useState("");

//   const {
//     state: {
//       merchantOrderId,
//       isValidated,
//       showExpiredModal,
//       accessDenied,
//       redirectUrl,
//       upi,
//       phonePay,
//       bank,
//       code,
//       minAmount,
//       maxAmount,
//       amount,
//       selectMethod,
//       remainingTime,
//     },
//     actions: {
//       handleValidation,
//       handlePaymentInitialization,
//       setShowExpiredModal,
//       setAmount,
//       setSelectMethod,
//       validateAmount,
//     },
//   } = usePayment();

//   useEffect(() => {
//     // This code runs only on the client side after the component mounts
//     setIsClient(true); // Mark as client-side
//     if (typeof window !== "undefined") {
//       const params = new URLSearchParams(window.location.search);
//       setUrlAmount(params.get("amount"));
//       setCurrentTab(params.get("tab"));
//     }
//   }, []);

//   const handleAmountSubmit = (e) => {
//     e.preventDefault();
//     const parsedAmount = Number.parseFloat(inputAmount);
//     if (isNaN(parsedAmount) || parsedAmount <= 0) {
//       alert("Please enter a valid amount.");
//       return;
//     }

//     if (!validateAmount(parsedAmount, minAmount, maxAmount)) {
//       return;
//     }

//     // Store in session and redirect
//     sessionStorage.setItem("amount", parsedAmount.toString());
//     router.push(`/payment?amount=${parsedAmount.toFixed(2)}`);
//   };

//   useEffect(() => {
//     const navEntry = performance.getEntriesByType("navigation")[0];
//     const isManualReload =
//       navEntry?.type === "reload" || performance.navigation.type === 1;

//     if (isManualReload && order) {
//       handleValidation(order, true);
//       setShowExpiredModal(true);
//       // setAccessDenied("URL has expired due to page reload.");
//       return;
//     }

//     if (order) {
//       sessionStorage.removeItem("upi");
//       sessionStorage.removeItem("bank");
//       sessionStorage.removeItem("cardpay");
//       sessionStorage.removeItem("order");
//       sessionStorage.removeItem("amount");
//       setSelectMethod(false);
//       setAmount("");
//       handleValidation(order, false);
//     }
//   }, [order]);

//   useEffect(() => {
//     if (!order) {
//       handlePaymentInitialization({
//         userId,
//         code,
//         ot,
//         key,
//         amount: amountParam,
//         hashCode,
//       });
//     }
//   }, [userId, code, ot, key, hashCode, amountParam, amount, order]);

//   const handleTabChange = (value) => {
//     router.push(`${pathname}?tab=${value}`);
//   };

//   if (!isClient) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-4">
//         <p className="text-lg text-gray-600">Loading page...</p>
//       </div>
//     );
//   }

//   // If no amount is present in the URL, show the "Enter Amount" page
//   if (!urlAmount) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-1">

//         <main className="flex-1 flex flex-col items-center justify-center p-2">
//           <Card className="w-full max-w-md">
//             <CardHeader className="text-center">
//               <CardTitle className="text-3xl font-bold text-gray-800">
//                 Enter Payment Amount
//               </CardTitle>
//               <CardDescription className="text-gray-600">
//                 Please specify the amount you wish to pay.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleAmountSubmit} className="space-y-6">
//                 <div>
//                   <label htmlFor="amount-input" className="sr-only">
//                     Amount
//                   </label>
//                   <Input
//                     id="amount-input"
//                     type="number"
//                     step="0.01"
//                     placeholder="e.g., 100.00"
//                     value={inputAmount}
//                     onChange={(e) => setInputAmount(e.target.value)}
//                     className="h-12 text-lg text-center"
//                     required
//                   />
//                 </div>
//                 <Button 
//                   type="submit"
//                   className="w-full h-12 text-lg bg-green-500 hover:bg-green-600"
//                 >
//                   Proceed to Pay
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </main>

//         <footer className="w-full text-gray-600 py-2 text-center text-sm border-t border-gray-200">
//           &copy; {new Date().getFullYear()} SecurePay. All rights reserved.
//         </footer>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center w-full">
//       <div className="mb-2 w-full max-w-md">
//         <PaymentTimer initialMinutes={10} />
//       </div>
//       <Tabs
//         value={currentTab || undefined}
//         onValueChange={handleTabChange}
//         className="w-full max-w-md"
//       >
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="upi">UPI</TabsTrigger>
//           <TabsTrigger value="phonepe">PhonePe</TabsTrigger>
//           <TabsTrigger value="bank-transfer">Bank Transfer</TabsTrigger>
//         </TabsList>
//       </Tabs>

//       <div
//         className={`mt-2 border rounded-lg p-6 bg-white shadow-md w-full max-w-md transition-all duration-300 ${
//           currentTab
//             ? "min-h-[200px] flex flex-col items-center justify-center text-muted-foreground"
//             : ""
//         }`}
//       >
//         <Suspense fallback={<p>Loading payment details...</p>}>
//           {currentTab === "upi" && <UpiDetails />}
//           {currentTab === "phonepe" && <PhonePeDetails />}
//           {currentTab === "bank-transfer" && <BankTransferDetails />}
//           {!currentTab && (
//             <p className="text-sm text-center text-muted-foreground">
//               Select a payment method above to view details.
//             </p>
//           )}
//         </Suspense>
//       </div>

//       <PaymentActions />
//       <footer className="w-full  text-gray-600 py-4 text-center text-sm border-t border-gray-200">
//         &copy; {new Date().getFullYear()} SecurePay. All rights reserved.
//       </footer>
//     </div>
//   );
// }
