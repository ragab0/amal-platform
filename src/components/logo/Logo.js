import LogoIco from "@/assets/icons/LogoIco";
import Link from "next/link";

export default function Logo({ isLittle = false, className = "" }) {
  return (
    <Link href="/">
      <LogoIco
        className={
          isLittle
            ? `!w-20 !h-20 text-second ${className}` // !w-8 !h-8 sm:!w-10 sm:!h-10 md:!w-12 md:!h-12 lg:!w-14 lg:!h-14
            : `!w-10 !h-10 sm:!w-12 sm:!h-12 md:!w-14 md:!h-14 lg:!w-16 lg:!h-16 xl:!w-20 xl:!h-20 2xl:!w-full 2xl:!h-full ${className}`
        }
      />
    </Link>
  );
}
