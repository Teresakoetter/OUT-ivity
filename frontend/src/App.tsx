import React from 'react';
import './App.css';
import UseAdventure from "./UseAdventure";
import AdventureGallery from "./AdventureGallery";
import AddAdventure from "./AddAdventure";
import AdventureDetailCard from "./AdventureDetailCard";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Header from "./Header";
import {ToastContainer} from "react-toastify";



function App() {
    const {adventures, addAdventure, deleteAdventure} = UseAdventure()
    return (
        <BrowserRouter>
            <div className="App">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    />
                <Header/>
                <div className="container">
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
            </div>
        </BrowserRouter>
    );
}

export default App;
