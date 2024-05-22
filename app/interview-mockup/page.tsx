"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Title from '../components/Title';

const Interview_mockup = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages,setMessages]=useState<any[]>([]);
  const createBlobUrl=(data:any) => {};
  const handleStop=async() => {};
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/reset'); // URL to your FastAPI endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen overflow-y-hidden">
     <Title setMessages={setMessages}/>
     <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
  
     </div>
    </div>
  );
};

export default Interview_mockup;
