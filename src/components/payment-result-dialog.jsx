"use client"

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function PaymentResultDialog({ status, message, transactionData, onReset }) {
  const [countdown, setCountdown] = useState(3);

  const [dialogContent, setDialogContent] = useState({
    icon: null,
    title: "",
    description: "",
    titleColor: "",
    iconColor: ""
  });

  useEffect(() => {
    // Update dialog content based on status
    let content = {};
    
    switch (status) {
      case "success":
      case "SUCCESS":
        content = {
          icon: <CheckCircle className="h-16 w-16 mx-auto mb-4" />,
          title: "Payment Successful!",
          description: message || "Your payment has been successfully processed.",
          titleColor: "text-green-700",
          iconColor: "text-green-500"
        };
        break;

      case "PENDING":
      case "IMG_PENDING":
        content = {
          icon: <CheckCircle className="h-16 w-16 mx-auto mb-4" />,
          title: "Payment Confirmation Submitted!",
          description: message || "Your payment details have been successfully submitted. We are now verifying your transaction.",
          titleColor: "text-green-700",
          iconColor: "text-green-500"
        };
        break;

      case "failure":
      case "FAILED":
        content = {
          icon: <XCircle className="h-16 w-16 mx-auto mb-4" />,
          title: "Payment Failed!",
          description: message || "There was an issue processing your payment. Please try again.",
          titleColor: "text-red-700",
          iconColor: "text-red-500"
        };
        break;

      case "DROPPED":
        content = {
          icon: <XCircle className="h-16 w-16 mx-auto mb-4" />,
          title: "Payment Dropped",
          description: message || "The payment process was interrupted. Please try again.",
          titleColor: "text-red-700",
          iconColor: "text-red-500"
        };
        break;

      case "BANK_MISMATCH":
        content = {
          icon: <AlertTriangle className="h-16 w-16 mx-auto mb-4" />,
          title: "Bank Mismatch",
          description: message || "The payment source bank doesn't match. Please use the correct bank account.",
          titleColor: "text-yellow-700",
          iconColor: "text-yellow-500"
        };
        break;

      case "DISPUTE":
        content = {
          icon: <AlertTriangle className="h-16 w-16 mx-auto mb-4" />,
          title: "Payment Disputed",
          description: message || "This payment is under dispute. Our team will review it shortly.",
          titleColor: "text-yellow-700",
          iconColor: "text-yellow-500"
        };
        break;

      case "submitting":
        content = {
          icon: <Loader2 className="h-16 w-16 mx-auto mb-4 animate-spin" />,
          title: "Processing Payment...",
          description: "Please wait while we process your payment.",
          titleColor: "text-blue-700",
          iconColor: "text-blue-500"
        };
        break;

      default:
        content = {
          icon: <AlertTriangle className="h-16 w-16 mx-auto mb-4" />,
          title: "Unknown Status",
          description: "An unexpected error occurred. Please try again.",
          titleColor: "text-gray-700",
          iconColor: "text-gray-500"
        };
    }

    setDialogContent(content);
  }, [status, message]);

  useEffect(() => {
    // Handle redirect for both return and return_url
    const redirectURL = transactionData?.return || transactionData?.return_url;
    if (redirectURL && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      if (countdown === 0) {
        window.location.href = redirectURL;
      }
      return () => clearInterval(timer);
    }
  }, [transactionData, countdown]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <DialogHeader>
        <div className="flex flex-col items-center gap-2">
          <div className={dialogContent.iconColor}>
            {dialogContent.icon}
          </div>
          <DialogTitle className={`text-xl font-semibold ${dialogContent.titleColor}`}>
            {dialogContent.title}
          </DialogTitle>
          <p className="text-gray-600 text-center">
            {dialogContent.description}
          </p>
        </div>
      </DialogHeader>

      {transactionData && (
        <div className="w-full space-y-3 mt-4 bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-600">Order ID:</div>
            <div className="font-medium">{transactionData.merchantOrderId}</div>
            
           {transactionData.payinId && (<><div className="text-gray-600">PayIn ID:</div>
            <div className="font-medium">{transactionData.payinId}</div></>)}
            
            <div className="text-gray-600">Amount:</div>
            <div className="font-medium">₹{transactionData.req_amount}</div>
            
            {transactionData.utr_id && (<><div className="text-gray-600">UTR/Transaction ID:</div>
            <div className="font-medium">{transactionData.utr_id}</div></>)}
            
            <div className="text-gray-600">Status:</div>
            <div className="font-medium text-amber-600">{transactionData.status}</div>
          </div>
        </div>
      )}

      {transactionData?.return && (
        <p className="text-sm text-gray-600 mt-2">
          Redirecting in {countdown} seconds...
        </p>
      )}

      {/* <div className="flex justify-end w-full mt-4">
        <Button 
          onClick={onReset} 
          variant="outline"
          disabled={transactionData?.return}
        >
          {transactionData?.return ? 'Redirecting...' : 'Close'}
        </Button>
      </div> */}
    </div>
  );
}
