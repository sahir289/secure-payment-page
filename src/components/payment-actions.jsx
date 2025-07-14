"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog"
import PaymentResultDialog from "./payment-result-dialog";

export function PaymentActions() {
  const [utr, setUtr] = useState("");
  const [file, setFile] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("")

  const simulateSubmission = async () => {
    setSubmissionStatus("submitting")
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.3 // 70% chance of success
        if (success) {
          resolve("success")
        } else {
          resolve("failure")
        }
      }, 1500) // Simulate network delay
    })
  }

  // const result = await simulateSubmission()

  const handleSubmitUtr = async () => {
    if (!utr.trim() && !file) {
      alert("Please enter a UTR or upload a file.");
      return;
    }
  
    setSubmissionStatus("submitting");
  
    const result = await simulateSubmission();
    setSubmissionStatus(result.status)
    setDialogMessage(result.message)
  
    if (result === "success") {
      setSubmissionStatus("success");
      setUtr(""); // Clear form fields on success
      setFile(null);
    } else {
      setSubmissionStatus("failure");
    }
  
    setIsDialogOpen(true);
  };
  

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleReset = () => {
    setSubmissionStatus("idle")
    setIsDialogOpen(false)
  }

  return (
    <div className="mt-4 p-6 border rounded-lg bg-white shadow-md space-y-6">
      {/* <h3 className="text-xl font-semibold text-gray-800">Confirm Your Payment</h3> */}

      <div className="space-y-4">
        <label
          htmlFor="utr-input"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Enter UTR / Transaction ID or Upload Screenshot
        </label>

        <div className="flex flex-row items-center gap-4">
          {/* UTR Input */}
          <Input
            id="utr-input"
            type="text"
            placeholder="e.g., 1234567890"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            className="flex-1"
          />

          {/* OR Text */}
          <span className="text-gray-400 font-medium text-sm">OR</span>

          {/* Upload Button */}
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

        {/* Submit Button */}
        <div>
          <Button onClick={handleSubmitUtr} className="w-full bg-green-600 hover:bg-green-700 text-white">
            Submit
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} className="text-green-500">
        <DialogContent className="sm:max-w-[425px]">
          <PaymentResultDialog status={submissionStatus} message={dialogMessage} onReset={handleReset} />
        </DialogContent>
      </Dialog>

    </div>
  );
}
