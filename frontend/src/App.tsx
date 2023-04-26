import React from 'react';
import './App.css';
import UseAdventure from "./UseAdventure";
import AdventureGallery from "./AdventureGallery";
import AddAdventure from "./AddAdventure";
import AdventureDetailCard from "./AdventureDetailCard";

function App() {
    const {adventures, addAdventure, deleteAdventure} = UseAdventure()
    return (
        <div className="App">
            <p>OUT-ivity</p>
            {<AdventureGallery adventures={adventures}/>}
            {<AddAdventure addAdventure={addAdventure}/>}
            {<AdventureDetailCard deleteAdventure={deleteAdventure}/>}
        </div>
    );
}

export default App;
