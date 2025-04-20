import React, { useContext, useEffect } from 'react';
import './App.css';
import va from './assets/ai.png';
import { CiMicrophoneOn } from "react-icons/ci";
import { DataContext } from './context/UserContext'; 
import speakimg from './assets/speak.gif'
import  aigif from './assets/aiVoice.gif'

const App = () => {
  const { recognition,speaking,setSpeaking,prompt,response,setPrompt } = useContext(DataContext); 
    
 

  return (
    <div className='main'>
      <img src={va} alt='' id="apra" />
      <span>
        I am Apra, your advanced voice assistant
      </span>
      {!speaking?
      <button onClick={() =>{
      setSpeaking(true)
      setPrompt("listening...")
         recognition.start()}}>
        Click here <CiMicrophoneOn />
      </button>
      :<div className='response'>
        {!response?<img src={speakimg}  alt="" id="speakimgid"/>:
        <img src={aigif}  alt="" id="aigif"/>
        }
        
        <p>{prompt}</p>

      </div>
}
    </div>
  );
};

export default App;


