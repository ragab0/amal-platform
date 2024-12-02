import LogoIco from "@/assets/icons/LogoIco";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/">
      <LogoIco className="!w-10 !h-10 sm:!w-12 sm:!h-12 md:!w-14 md:!h-14 lg:!w-16 lg:!h-16 xl:!w-20 xl:!h-20 2xl:!w-full 2xl:!h-full" />
    </Link>
  );
}
