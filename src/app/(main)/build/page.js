import "./page.css";
import { Suspense } from "react";
import BuildCVClient from "./components/BuildCVClient";

export default function BuildCV() {
  return (
    <main className="build-page min-h-screen bg-white">
      <Suspense fallback={<div>Loading...</div>}>
        <BuildCVClient />
      </Suspense>
    </main>
  );
}
