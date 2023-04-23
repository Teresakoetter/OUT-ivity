import React from 'react';
import logo from './logo.svg';
import './App.css';
import UseAdventure from "./UseAdventure";
import AdventureGallery from "./AdventureGallery";

function App() {
    const {adventures} = UseAdventure()
  return (
    <div className="App">
      <p>OUT-ivity</p>
        {<AdventureGallery adventures={adventures}/>}
    </div>
  );
}

export default App;
