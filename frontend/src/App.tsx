import React from 'react';
import './App.css';
import UseAdventure from "./UseAdventure";
import AdventureGallery from "./AdventureGallery";
import AddAdventure from "./AddAdventure";
import AdventureDetailCard from "./AdventureDetailCard";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

function App() {
    const {adventures, addAdventure, deleteAdventure} = UseAdventure()
    return (
        <BrowserRouter>
            <div className="App">
                <p>OUT-ivity</p>
                <Routes>
                    <Route element={<Navigate to="/adventures"/>}/>
                    <Route path="/adventures"
                           element={<AdventureGallery adventures={adventures}/>}/>
                    <Route path="/adventures/add"
                           element={<AddAdventure addAdventure={addAdventure}/>}/>
                    <Route path="/adventures/:id"
                           element={<AdventureDetailCard deleteAdventure={deleteAdventure}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
