"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PaymentResultDialog from "./payment-result-dialog";
import { processTransaction, imageSubmit } from "@/services/api";
import ErrorPopup from "@/components/error-popup";

export function PaymentActions({ merchantOrderId, code, amount, remainingTime, redirectUrl }) {
  const [utr, setUtr] = useState("");
  const [utrError, setUtrError] = useState("");
  const [file, setFile] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [transactionData, setTransactionData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  const handleUtrChange = (e) => {
    const value = e.target.value;
    const isAlphaNumeric = /^[a-zA-Z0-9./|]*$/.test(value);

    if (isAlphaNumeric) {
      setUtr(value);
      setUtrError("");
    } else {
      setUtrError(
        "Only letters, numbers, dots, forward slashes and vertical bars are allowed"
      );
    }
  };

  const handleApiError = (error) => {
    const errorMessage = error?.message || "Something went wrong. Please try again.";
    setGlobalError(errorMessage);
    setIsProcessing(false);
    setIsDialogOpen(false);
  };

  const handleSubmitUtr = async (e) => {
    e.preventDefault();

    if (!utr.trim() && !file) {
      alert("Please enter a UTR or upload a file.");
      return;
    }

    if (utrError) {
      alert("Please fix the UTR validation error before submitting.");
      return;
    }

    if (remainingTime <= 0) {
      alert("Time expired. Please try again.");
      return;
    }

    try {
      setIsProcessing(true);
      setSubmissionStatus("submitting");

      let response;

      if (utr) {
        response = await processTransaction(merchantOrderId, {
          userSubmittedUtr: utr,
          code,
          amount,
        });

        const transactionData = response?.data;
        setTransactionData(transactionData);

        if (transactionData?.error) {
          setSubmissionStatus("failure");
          setDialogMessage(transactionData.error);
        } else if (transactionData) {
          setSubmissionStatus("success");
          setDialogMessage("Payment processed successfully!");
          // Store return URL from bank assign API for later use
          if (redirectUrl) {
            // Start redirect countdown only after successful process API response
            setTimeout(() => {
              window.location.href = redirectUrl;
            }, 5000);
          }
        }
      } else if (file) {
        const formData = new FormData();
        formData.append("amount", amount);
        formData.append("file", file);
        response = await imageSubmit(merchantOrderId, formData);

        const transactionData = response?.data;
        setTransactionData(transactionData);

        if (transactionData?.error) {
          setSubmissionStatus("failure");
          setDialogMessage(transactionData.error);
        } else if (transactionData) {
          setSubmissionStatus(transactionData.status);
          setDialogMessage("Payment processing...");
        } else {
          setSubmissionStatus("failure");
          setDialogMessage("Failed to process transaction");
        }
      }

      setIsDialogOpen(true);

      if (response?.data?.data?.status === "PENDING") {
        setUtr("");
        setFile(null);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsProcessing(false); // Stop loading
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleReset = () => {
    setSubmissionStatus("idle");
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="mt-4 p-6 border rounded-lg bg-white shadow-md space-y-6">
        <div className="space-y-4">
          <label
            htmlFor="utr-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter UTR / Transaction ID or Upload Screenshot
          </label>

          <div className="flex flex-row items-center gap-4">
            <div className="flex-1">
              <Input
                id="utr-input"
                type="text"
                placeholder="e.g., 1234567890"
                value={utr}
                onChange={handleUtrChange}
                className={`${utrError ? "border-red-500" : ""}`}
              />
              {utrError && (
                <p className="text-red-500 text-sm mt-1">{utrError}</p>
              )}
            </div>

            <span className="text-gray-400 font-medium text-sm">OR</span>

            <div className="flex items-center gap-2">
              <Input
                id="screenshot-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <Button
                onClick={() =>
                  document.getElementById("screenshot-upload")?.click()
                }
                variant="outline"
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden lg:inline">
                  {file ? file.name : "Upload"}
                </span>
              </Button>

              {file && (
                <Button variant="ghost" onClick={() => setFile(null)} size="sm">
                  Clear
                </Button>
              )}
            </div>
          </div>

          <div>
            <Button
              onClick={handleSubmitUtr}
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>

        <div className="border-t pt-6 mt-6 space-y-3">
          <h4 className="text-lg font-semibold text-gray-800">
            Important Guidelines:
          </h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>
              Please ensure the payment is completed before submitting the UTR.
            </li>
            <li>Upload a clear screenshot of your successful transaction.</li>
            <li>Your order will be confirmed once the payment is verified.</li>
            <li>For any issues, please contact support with your UTR.</li>
          </ul>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          className="text-green-500"
        >
          <DialogContent className="sm:max-w-[425px]">
            <PaymentResultDialog
              status={submissionStatus}
              message={dialogMessage}
              transactionData={transactionData}
              onReset={handleReset}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ErrorPopup 
        isOpen={!!globalError}
        message={globalError}
      />
    </>
  );
}
