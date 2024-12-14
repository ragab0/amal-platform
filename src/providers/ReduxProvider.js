"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store/store";
import { toast } from "react-toastify";
import myAxios from "@/utils/myAxios";

// To use this new makeStore function we need to create a new "client" component that will create
// the store and share. USEREF to ensure that the store is only created once
export default function StoreProvider({ children, preloadedState = {} }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance with preloaded state from server
    storeRef.current = makeStore(preloadedState);
    if (preloadedState.auth?.error) {
      toast.error(preloadedState.auth.error);
      myAxios.post("/auth/logout");
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
