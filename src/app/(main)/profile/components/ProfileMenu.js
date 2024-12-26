"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/buttons/LogoutButton";

export default function ProfileMenu({ menuItems }) {
  const pathname = usePathname();

  return (
    <div className="my-10">
      {menuItems.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={`text-large block mb-6 cursor-pointer hover:text-main transition-colors ${
            pathname === item.href ? "text-main font-bold" : "font-medium"
          }`}
        >
          {item.label}
        </Link>
      ))}
      <LogoutButton className="text-xl py-5 text-shadow-plate cursor-pointer hover:text-red-600 transition-colors" />
    </div>
  );
}
