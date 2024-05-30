"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Title from '../components/Title';
import dynamic from 'next/dynamic';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Dynamically import the Record component with SSR disabled
const Record = dynamic(() => import('../components/Record'), { ssr: false });

const Interview_mockup = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/api/auth/signin?callbackUrl=/interview-mockup');
      }
    };
    checkAuth();
  }, []);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages,setMessages]=useState<any[]>([]);
  const [blob,setBlob] =useState("")
  const createBlobUrl=(data:any) => {
    const blob = new Blob([data],{type:"audio/mpeg"});
    const url= window.URL.createObjectURL(blob);
    return url;
  };
  const handleStop=async(blobUrl:string) => {
  setIsLoading(true);
  //Append Recorded message to messages
  const myMessage={sender:"Me",blobUrl};
  const messagesArr=[...messages,myMessage]
  //Convert Blob URL to Blob object
  fetch(blobUrl)
  .then((res)=> res.blob())
  .then(async(blob)=> {
    //Construct AUDIO to send file
    const formData = new FormData();
    formData.append("file",blob,"myFile.wav");
    // Send formDaata to API endpoint 
    await axios.post("http://localhost:8000/post-audio",formData,{headers:{"contetnt-Type":"audio/mpeg"},
  responseType:"arraybuffer",
}).then((res:any)=> {
  const blob = res.data;
  const audio= new Audio();
  audio.src = createBlobUrl(blob);

  //Append to Audio
  const rachelMessage = {sender:"Rachel",blobUrl:audio.src};
  messagesArr.push(rachelMessage);
  setMessages(messagesArr);
  //Play the AUDIO
  setIsLoading(false);
  audio.play();

})
.catch((err)=> {
  console.error(err.message);
  setIsLoading(false);
})
  })

  };
  



  return (
    <div className="h-screen overflow-y-hidden">
     <Title setMessages={setMessages}/>
     <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
      <audio src={blob} />
        {/* Recorder */}
        <div className='fixed bottom-0 w-full py-6 border-t text-center bg-primary'>
          <div className='flex justify-center items-center w-full'>
           <Record handleStop={handleStop} />
          </div>
        </div>
     </div>
    </div>
  );
};

export default Interview_mockup;
