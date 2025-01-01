import LogoutButton from "@/components/buttons/LogoutButton";
import Link from "next/link";
import { BsChatDots } from "react-icons/bs";

export default function UserMenu({ userMenuItems }) {
  return (
    <ul>
      {userMenuItems.map((item, i) => (
        <li key={i}>
          <Link
            href={item.href}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {item.label}
          </Link>
        </li>
      ))}
      <li>
        <Link
          href="/support"
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t flex items-center justify-between gap-2"
        >
          الدعم الفني
          <BsChatDots />
        </Link>
      </li>
      <li>
        <LogoutButton className="block w-full text-right px-4 py-2 border-t text-sm text-red-500 hover:bg-gray-100" />
      </li>
    </ul>
  );
}
