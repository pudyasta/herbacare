import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const LinkItem = ({ children, href, onClick, query }) => {
  const router = useRouter().query.slug;
  return (
    <Link
      onClick={onClick}
      href={href}
      className={`flex ${
        router == query
          ? "text-white font-medium text-xl"
          : "font-regular text-white/50"
      } items-center text-lg gap-4 active:text-white duration-300`}
    >
      {children}
    </Link>
  );
};

export default LinkItem;
