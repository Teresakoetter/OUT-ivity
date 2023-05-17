import './App.css';
import UseAdventure from "./UseAdventure";
import AdventureGallery from "./AdventureGallery";
import AddAdventure from "./AddAdventure";
import AdventureDetailCard from "./AdventureDetailCard";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Header from "./Header";
import {ToastContainer} from "react-toastify";
import UpdateAdventure from "./UpdateAdventure";
import LoginPage from "./LoginPage";
import UseUser from "./useUser";
import ProtectedRoutes from "./ProtectedRoutes";
import Logout from "./Logout";



function App() {
    const {user, login, isLoading} = UseUser()

    const {addAdventure, deleteAdventure, updateAdventure} = UseAdventure()

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
                        <Route path='/login' element={<LoginPage onLogin={login}/>}/>
                        <Route path='/logout' element={<Logout/>}/>
                        <Route element={<Navigate to="/adventures"/>}/>
                        <Route path="/adventures"
                               element={< AdventureGallery/>}/>
                        <Route element={<ProtectedRoutes user={user} isLoading={isLoading}/>}>
                            <Route path="/adventures/:id"
                                   element={<AdventureDetailCard deleteAdventure={deleteAdventure}
                                                                 updateAdventure={updateAdventure}/>}/>
                            <Route path="/adventures/add"
                                   element={<AddAdventure addAdventure={addAdventure}/>}/>
                            <Route path='/adventures/update/:id'
                                   element={<UpdateAdventure updateAdventure={updateAdventure}/>}/>
                        </Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
