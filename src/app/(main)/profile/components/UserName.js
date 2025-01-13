"use client";

import { useAppSelector } from "@/hooks/ReduxHooks";

export default function UserName() {
  const { user = {} } = useAppSelector((state) => state.auth);
  return (
    <>
      <h3 className="text-[28px] font-bold text-[#9D94A8] mb-2">
        {String(user.fname + " " + user.lname).slice(0, 15)}
        {`${String(user.fname + " " + user.lname).length > 15 ? "..." : ""}`}
      </h3>
      <p className="text-xl font-light text-[#B5B5B5]">
        {user.email?.slice(0, 20)}
        {`${user.email?.length > 20 ? "..." : ""}`}
      </p>
    </>
  );
}
