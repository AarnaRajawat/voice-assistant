import React, { createContext } from 'react';
import run from '../gemini';

export const DataContext = createContext(); // 👈 Name must match what you import

const UserContext = ({ children }) => {
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
   console.log(transcript);
   aiResponse(transcript)
  }

  async function aiResponse(prompt){
     let text = await run(prompt);
     console.log(text)

  }
  const value = {
  recognition
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default UserContext;

