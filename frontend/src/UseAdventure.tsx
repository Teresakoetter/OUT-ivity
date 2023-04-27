import {useEffect, useState} from "react";
import {Adventure, NewAdventure} from "./Adventure";
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function UseAdventure() {
    const [adventures, setAdventures] = useState<Adventure[]>([])
    useEffect(() => {
        loadAllAdventures()
    }, [])

    function loadAllAdventures() {
        axios.get("/api/adventures")
            .then((response) => {
                setAdventures(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function addAdventure(newAdventure: NewAdventure) {
        axios.post("/api/adventures", newAdventure)
            .then((response) => {
                    setAdventures([...adventures, response.data])
                    toast.success("Adventure added successfully");
                }
            )
            .catch((error) => {
                toast.error("Post not successful, try again later." + error.statusText)
            })
    }

    function deleteAdventure(id: string) {
        axios.delete('/api/adventures/' + id)
            .then(() => {
                setAdventures(adventures.filter((adventure) => adventure.id !== id))
                toast.success("Adventure deleted successfully");
            })
            .catch(() => console.error("delete of adventure not successful"))

    }

    function updateAdventure(adventure: Adventure){
        axios.put(`/api/adventures/${adventure.id}`, adventure)
            .then((putAdventureResponse) => {
                setAdventures(adventures.map((currentAdventure) => {
                    if(currentAdventure.id === adventure.id){
                        return putAdventureResponse.data
                    }
                    else{
                        return currentAdventure
                    }
                }))
            })
    }

    return {adventures, addAdventure, deleteAdventure, updateAdventure}

}