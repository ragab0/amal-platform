import React from "react";

export default function YoungCircleLoader({
  isHFull = false,
  isWFull = false,
  isBig = false,
}) {
  return (
    <div
      className={`flex items-center justify-center ${isHFull ? "h-full" : ""} ${
        isWFull ? "w-full" : ""
      }`}
    >
      <div
        className={`animate-spin rounded-full border-main ${
          isBig ? "w-32 h-32 border-b-4" : "h-8 w-8 border-b-2"
        }`}
      ></div>
    </div>
  );
}
