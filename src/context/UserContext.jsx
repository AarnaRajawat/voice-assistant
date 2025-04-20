import React, { createContext, useState } from 'react';
import run from '../gemini';

export const DataContext = createContext(); // 👈 Name must match what you import

const UserContext = ({ children }) => {

  let [speaking,setSpeaking] = useState(false)
  let [prompt,setPrompt] =useState("listening...")
  let [response,setResponse] = useState(false)


  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = 'en-gb'; // ✅ fixed language
    window.speechSynthesis.speak(utterance);
  }

  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  let recognition = new speechRecognition()
  recognition.onresult=(e)=>
  {
   let currentIndex = e.resultIndex;
   let transcript = e.results[currentIndex][0].transcript;
   setPrompt(transcript)
   aiResponse(transcript)
  }

  async function aiResponse(prompt){
     let text = await run(prompt);
     speak(text)
     setPrompt(text)
     setResponse(true)

     setTimeout(()=>{
      setSpeaking(false)

     },5000)
    

  }
  const value = {
  recognition,
  speaking,
  setSpeaking,
  setPrompt,
  prompt,
  response,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default UserContext;

