import React, { useContext, useEffect } from 'react';
import './App.css';
import va from './assets/ai.png';
import { CiMicrophoneOn } from "react-icons/ci";
import { DataContext } from './context/UserContext'; 

const App = () => {
  const { recognition } = useContext(DataContext); 
    
 

  return (
    <div className='main'>
      <img src={va} alt='' id="apra" />
      <span>
        I am Apra, your advanced voice assistant
      </span>
      <button onClick={() => recognition.start()}>
        Click here <CiMicrophoneOn />
      </button>
    </div>
  );
};

export default App;


