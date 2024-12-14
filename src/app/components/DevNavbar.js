import { devLinks } from "@/assets/data/dev";
import Link from "next/link";

export default function DevNavbar() {
  return (
    true && (
      <ul className="fixed top-0 left-0 z-50 flex flex-col gap-2 p-2 text-xs text-black bg-white border rounded">
        {devLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="hover:text-main"
            // target="_blank"
          >
            {link.name}
          </Link>
        ))}
      </ul>
    )
  );
}
