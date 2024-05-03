import Image from "next/image";
import { Hero } from "./home/Hero";
import { Steps } from "./home/Steps";
import { Cards } from "./home/Cards";


export default function Home() {
  return (
    <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12" >
      <Hero/>
      <Cards/>
      <Steps/> 
    </main>
  );
}
