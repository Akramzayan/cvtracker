import { Heading } from "../components/Heading"

import Image from "next/image";
 const cardsInfo = [
  
      {
        id: "0",
        title: "Resume Builder",
        text: "Quickly craft a standout professional resume with our intuitive Resume Builder, designed around a single, adaptable template that showcases your unique strengths.",
      
      },
      {
        id: "1",
        title: " ATS Checker",
        text: "Enhance your resume's success with our ATS Checker. This tool optimizes your resume for applicant tracking systems, increasing your visibility to potential employers..",
     
   
      },
      {
        id: "2",
        title: "Interview Mockup",
        text: "Master your interview skills with our Interview Mockup tool, powered by an advanced AI model. Engage in realistic simulations, refine your responses, and gain valuable feedback to boost your confidence and performance.",
        
   
      },
]

export const Cards = () => {
  return (
    <section id="features">
        <div className="container relative z-2">
            <Heading 
            className="md:max-w-md lg:max-w-2xl"
             title=" CarrerTracker Services "/>
             <div className="flex flex-wrap ga-10 mb-10   ">
                {cardsInfo.map((item) => (
                    <div
                        className="block relative p-0.5 bg-primary bg-no-repeat bg-[length:100%_100%]
                        md:max-w-[24rem] m-10  border rounded-2xl rounded-tr-[80px] cursor-pointer btn-primary"
                        key={item.id}
                    >
                        <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] ">
                            <h5 className="mb-5 text-2xl text-bold text-center ">{item.title}</h5>
                            <p className="body-2 mb-6 text-white ">{item.text}</p>
                            <div className="flex items-center ml-auto">
                                {/* <Image src={} width={48} height={48} alt={item.title} /> */}
                            </div>
                        </div>
                    </div>
                ))}

             </div>

        </div>

    </section>
  )
}

