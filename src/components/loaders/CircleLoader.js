"use client";

export default function CircleLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative">
        {/* Outer spinning ring with gradient */}
        <div className="w-24 h-24 rounded-full border-8 border-gray-200/30"></div>
        <div
          className="w-24 h-24 rounded-full border-8 border-t-transparent animate-spin absolute left-0 top-0 border-[#4EB973]
          after:content-[''] after:absolute after:top-[-8px] after:left-[-8px] after:w-[96px] after:h-[96px] after:rounded-full 
          after:border-8 after:border-[#4EB973]/20 after:animate-ping"
        ></div>

        {/* Inner pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-gradient-to-br from-[#4EB973] to-[#A5D5AF] rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
