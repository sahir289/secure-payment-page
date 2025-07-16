import { Loader2 } from "lucide-react";

export function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
