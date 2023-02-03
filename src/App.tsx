import React from 'react';
import logo from './logo.svg';
import './App.css';
import PaperStack from "./PaperStack";
import { useState } from 'react';


function App() {


  const scannedImages = [
    "https://singaporelearner.com/wp-content/uploads/2013/11/scan0010-724x1024.jpg"
  ];

  const [username, setUsername] = useState("user123");
  const [text, setText] = useState(username);

  return (
    <div>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>1. Set your username:</p>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setUsername(text)}>Set Username</button>
      <p>2. Mark papers here:</p>
      <PaperStack images={scannedImages} username={username} />
    </div>
  );
}

export default App;
