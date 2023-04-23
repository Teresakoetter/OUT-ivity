import {useEffect, useState} from "react";
import {Adventure, NewAdventure} from "./Adventure";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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
            .then(() => loadAllAdventures())
            .catch(() => console.error("post on /api/adventures not successful"))
    }

    return {adventures, addAdventure}

}