"use client";

import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { cx } from "../lib/cx";

export const TopNavbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <header
      aria-label="Site Header"
      className={cx(
        "flex h-[var(--top-navbar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12",
        isHome && "bg-dot"
      )}
    >
      <div className="flex h-10 w-full justify-between">
        <Link href="/">
          <div className="flex justify-center items-center gap-1">
            <Image
              src={"/assets/logo.svg"}
              width={16}
              height={16}
              alt="Logo"
              className="h-8 w-full"
              priority
            />
            <h2 className="text-xl whitespace-nowrap text-primary font-bold">
              CareerTracker
            </h2>
          </div>
        </Link>
        <nav aria-label="Site Navbar" className="flex items-center gap-2 text-sm font-medium">
          {[
            ["/resume-builder", "Builder"],
            ["/resume-parser", "ATS Checker"],
            ["/interview-mockup", "Interview Mockup"],
          ].map(([href, text]) => (
            <Link
              key={text}
              className="rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
              href={href}
            >
              {text}
            </Link>
          ))}
          {status === "authenticated" ? (
            <div className="flex items-center gap-2">
              {user?.image && (
                <Image
                  src={user.image}
                  width={24}
                  height={24}
                  alt="User Profile"
                  className="rounded-full"
                />
              )}
              <span className="text-primary"> {user?.name}</span>
              <button
                onClick={() => signOut()}
                className="rounded-md px-2 py-1 bg-red-500 hover:bg-primary text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <SignInButton />
          )}
        </nav>
      </div>
    </header>
  );
};

function SignInButton() {
  return (
    <button
      onClick={() => signIn()}
      className="rounded-md px-2 py-1 bg-blue-500 text-white hover:bg-blue-600"
    >
      Sign in
    </button>
  );
}