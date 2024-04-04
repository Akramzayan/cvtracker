"use client";

import { usePathname } from "next/navigation";
import { cx } from "../lib/cx";
import Link from "next/link";
import Image from "next/image";


export const TopNavbar = () => {
 
  const pathname= usePathname()
  const isHome = pathname ==="/"

  return(
    <header aria-label="Site Header"
     className={cx("flex h-[var(--top-navbar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12"
     ,isHome && "bg-dot")}>
        <div className="flex h-10 w-full justify-between">
            <Link href="/">
              <div className="flex justify-center items-center gap-1">
                <Image
                src={"assets/heart.svg"}
                width={16}
                height={16}
                alt="Logo"
                className="h-8 w-full"
                priority

                />
                 <h2 className="text-xl whitespace-nowrap text-primary font-bold"> Carrer Tracker</h2>

              </div>
               
            </Link>
            <nav aria-label="Site Navbar" className="flex items-center gap-2 text-sm font-medium">
              {
                [
                  ["/resume-builder","Builder"],
                  ["resume-parser","Ats Checker"],
                  ["interview-mockup","Interview Mockup"],
                  ["job-finder","Job Finder"],

                ].map(([href,text]) => (
                  <Link key={text} className="rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4" href={href}>
                    {text}
                  </Link>
                ))
              }
            </nav>

        </div>


    </header>
  )


}


