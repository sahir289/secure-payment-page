import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertOctagon } from "lucide-react";

export default function ErrorPopup({ isOpen, message, onRefresh }) {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center gap-2">
          <AlertOctagon className="h-12 w-12 text-red-500" />
          <DialogTitle className="text-xl font-semibold text-red-700">
            Something went wrong
          </DialogTitle>
        </DialogHeader>
        <div className="text-center py-4">
          <p className="text-gray-600 mb-4">{message || "An unexpected error occurred. Please try again."}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            Refresh Page
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
