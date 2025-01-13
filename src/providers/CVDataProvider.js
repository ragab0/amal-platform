"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCV } from "@/store/features/cvs/cvsThunks";
import { useRouter } from "next/navigation";
import CircleLoader from "@/components/loaders/CircleLoader";

export default function CVDataProvider({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, isInitialized } = useSelector((state) => state.cvs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchCV = async () => {
      if (!mounted) return;

      const { payload, error } = await dispatch(getCV());
      if (error && payload.status === "fail") {
        return router.replace("/build");
      }
      setIsLoading(false);
    };
    fetchCV();
    return () => {
      mounted = false;
    };
  }, [dispatch, router]);

  // Show loader while loading or if there's no CV
  if (isLoading || (!isInitialized && loading)) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <CircleLoader />
      </div>
    );
  }

  return children;
}
