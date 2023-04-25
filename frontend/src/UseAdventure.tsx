import {useEffect, useState} from "react";
import {Adventure, NewAdventure} from "./Adventure";
import axios from "axios";
import {toast} from "react-toastify";

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
            .then(() => loadAllAdventures()
            )
            .catch(() => console.error("post on /api/adventures not successful"))
    }

    function deleteAdventure(id: string) {
        axios.delete("/adventures/" + id)
            .then(() => {
                setAdventures(adventures.filter((adventure) => adventure.id !== id))
                toast.success("Recipe deleted successfully");
            })
            .catch(() => console.error("delete of adventure not successful"))

    }

    return {adventures, addAdventure, deleteAdventure}

}