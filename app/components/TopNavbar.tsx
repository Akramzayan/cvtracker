"use client";

import { usePathname } from "next/navigation";


export const TopNavbar = () => {
 
  const pathname= usePathname()
  const isHome = pathname ==="/"

  return(
    <header aria-label="Site Header" className={("flex ")}>

    </header>
  )


}


