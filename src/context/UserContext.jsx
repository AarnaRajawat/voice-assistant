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
    utterance.lang = 'en-Gb'; // ✅ fixed language
    window.speechSynthesis.speak(utterance);
  }

  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  let recognition = new speechRecognition()
  recognition.onresult=(e)=>
  {
   let currentIndex = e.resultIndex;
   let transcript = e.results[currentIndex][0].transcript;
   setPrompt(transcript)
   takeCommand(transcript.toLowerCase())
  }

  async function aiResponse(prompt){
     let text = await run(prompt);
     let newText = text.split("**") && text.split("*") && text.replace("google","Aparna Rajawat") && text.replace("Google","Aparna Rajawat")
     speak(newText)
     setPrompt(newText)
     setResponse(true)

     setTimeout(()=>{
      setSpeaking(false)

     },5000)
  }

  function takeCommand(command){

    if(command.includes("open") && command.includes("youtube")){

      window.open("https://www.youtube.com/", "_blank")
      speak("opening youtube")
      setPrompt("opening youtube...")
      setTimeout(()=>{
        setSpeaking(false)
  
       },5000)
    }

   else if(command.includes("open") && command.includes("google")){

      window.open("https://www.google.com/", "_blank")
      speak("opening google")
      setPrompt("opening google...")
      setTimeout(()=>{
        setSpeaking(false)
  
       },5000)
    }
    else if(command.includes("open") && command.includes("instagram")){

      window.open("https://www.instagram.com/", "_blank")
      speak("opening instagram")
      setPrompt("opening instagram...")
      setTimeout(()=>{
        setSpeaking(false)
  
       },5000)
    }

    else if(command.includes("open") && command.includes("facebook")){

      window.open("https://www.facebook.com/", "_blank")
      speak("opening facebook")
      setPrompt("opening facebook...")
      setTimeout(()=>{
        setSpeaking(false)
  
       },5000)
    }
    else if(command.includes("open") && command.includes("twitter")){

      window.open("https://x.com/home", "_blank")
      speak("opening twitter")
      setPrompt("opening twitter...")
      setTimeout(()=>{
        setSpeaking(false)
  
       },5000)
    }
    else{
      aiResponse(command)
    }
  }
  const value = {
  recognition,
  speaking,
  setSpeaking,
  setPrompt,
  prompt,
  response,
  setResponse
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default UserContext;

