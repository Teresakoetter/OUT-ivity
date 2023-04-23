import React from 'react';
import logo from './logo.svg';
import './App.css';
import UseAdventure from "./UseAdventure";
import AdventureGallery from "./AdventureGallery";
import AddAdventure from "./AddAdventure";
import addAdventure from "./AddAdventure";

function App() {
    const {adventures, addAdventure} = UseAdventure()
  return (
    <div className="App">
      <p>OUT-ivity</p>
        {<AdventureGallery adventures={adventures}/>}
        {<AddAdventure addAdventure={addAdventure}/>}
    </div>
  );
}

export default App;
