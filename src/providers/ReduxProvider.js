"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store/store";

// To use this new makeStore function we need to create a new "client" component that will create
// the store and share. USEREF to ensure that the store is only created once
export default function StoreProvider({ children, preloadedState = {} }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance with preloaded state from server
    storeRef.current = makeStore(preloadedState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
