import Link from "next/link"
import { FlexBoxspacer } from "../components/FlexBoxspacer."

export const Hero =() => {
    return (
        <section className="lg:flex lg:h-[825px] lg:justify-center">
            <FlexBoxspacer maxWidth={75} minWidth={0} className="hidden lg:block"/>
            <div className="mx-auto max-w-xl pt-8 text-center lg:mx-0 lg:grow lg:pt-32 lg:text-left">
                <h1 className="text-primary pb-2 text-4xl font-bold lg:text-5xl ">
                    Create Your Professional 
                    <br />
                    Resume Easily
                </h1>
                <p className="mt-3 text-lg lg:mt-5 lg:text-xl">
                    With This Powerful Resume Builder
                </p>
                <Link href={"/resume-import"} className="mt-6 lg:mt-14">
                    <p className="ml-6 mt-3 text-sm text-bold  btn-primary"> Get Started</p>
                    <p className="mt-3 text-sm text-bold text-gray-600 lg:mt-36">
                        Already Have a Resume ? Test its ATS Readabilty Here with the {""}
                        <Link href={"/resume-parser"} className="underline underline-offset-2">
                            Resume Parser
                        </Link>
                    </p>
                </Link>

            </div>
           < FlexBoxspacer maxWidth={100} minWidth={50} className="hidden lg:block"/>
           <div className="mt-6 flex justify-center lg:mt-4 lg:block lg:grow">
            <>
            <h1>Auto Typing Resume</h1>
            </>
           </div>

        </section>
    )
}