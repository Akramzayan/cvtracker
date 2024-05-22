import { useState } from "react";

import axios from "axios";

type Props = {
  setMessages: any;
};

function Title({ setMessages }: Props) {
  const [isResetting, setIsResetting] = useState(false);
  //Reset the Conversation
  const resetConversation = async () => {
    setIsResetting(true);
    await axios
      .get("http://localhost:8000/reset")
      .then((res) => {
        if (res.status == 200) {
          setMessages([]);
          console.log("Conversation Reset");
        } else {
          console.error("There was an error with the API Request to backend");
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
    setIsResetting(false);
  };
  return (
    <>
      <div className="flex justify-between items-center  p-5 bg-primary text-white mx-[300px] mt-5 border border-black rounded-lg ">
        <div> Rachel</div>
        <div> icon</div>
      </div>
      <div className="flex flex-col  p-3   text-white mx-[300px]  border rounded-lg h-auto ">
        <div className="text-black">hdzdza</div>
        <div className="text-black"> hdzadazdaz</div>
        <div className="text-black">hdzdza</div>
        <div className="text-black"> hdzadazdaz</div>
        <div className="text-black">hdzdza</div>
        <div className="text-black"> hdzadazdaz</div>
        <div className="text-black">hdzdza</div>
        <div className="text-black"> hdzadazdaz</div>

      </div>
      </>
     
    
  );
}

export default Title;
