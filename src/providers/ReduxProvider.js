"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store/store";
import { toast } from "react-toastify";

// To use this new makeStore function we need to create a new "client" component that will create
// the store and share. USEREF to ensure that the store is only created once
// &&& create the store instance with preloaded state from server
export default function StoreProvider({ children, preloadedState = {} }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState);
    if (preloadedState.auth?.error) {
      toast.error(preloadedState.auth.error);
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
