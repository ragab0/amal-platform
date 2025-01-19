import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function User({ user }) {
  return (
    <button className="flex items-center text-white gap-4 ">
      <div className="hidden xl:flex flex-col justify-center text-center">
        <span className="mr-2">
          {user.fname && user.lname
            ? `${user.fname} ${user.lname}`.slice(0, 15) +
              `${`${user.fname} ${user.lname}`.length > 15 ? "..." : ""}`
            : "UnNamed!"}
        </span>
        <span className="text-sm ">
          {user.email?.slice(0, 20) +
            `${user.email?.length > 20 ? "..." : ""}` || "saleh@amal.com"}
        </span>
      </div>
      {user.photo ? (
        <Image
          src={user.photo}
          alt="User"
          width={250}
          height={250}
          className="w-14 h-14 rounded-full"
        />
      ) : (
        <FaUserCircle className="h-14 w-14" />
      )}
    </button>
  );
}
