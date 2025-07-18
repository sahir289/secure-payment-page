"use client";

import { Loader } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader className="animate-spin h-10 w-10 text-gray-500" />
    </div>
  );
}