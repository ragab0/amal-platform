"use client";
import { services } from "@/assets/data/servicesData";
import { usePathname } from "next/navigation";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function Benifits() {
  const pathname = usePathname();
  const items = services.find((s) => s.to === pathname)?.items || [];
  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={index}
          className="heading-h3 font-medium text-second mb-6 flex items-center gap-1"
        >
          <IoCheckmarkCircleOutline className="text-main" />
          {item}
        </li>
      ))}
    </ul>
  );
}
