"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCV } from "@/store/features/cvs/cvsThunks";
import CircleLoader from "@/components/loaders/CircleLoader";

export default function CVDataProvider({ children }) {
  const dispatch = useDispatch();
  const { myCV, loading, isInitialized } = useSelector((state) => state.cvs);

  useEffect(() => {
    // Only fetch if we don't already have the CV data
    if (!myCV?.id) {
      dispatch(getCV());
    }
  }, [dispatch, myCV?.id]);

  if (!isInitialized || (!isInitialized && loading)) {
    return <CircleLoader />;
  }

  return children;
}
