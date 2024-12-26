"use client";
import { useEffect, useState } from "react";
import CircleLoader from "./loaders/CircleLoader";

export default function LoadingWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // after component mounts
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <CircleLoader />
      </div>
    );
  }

  return children;
}
