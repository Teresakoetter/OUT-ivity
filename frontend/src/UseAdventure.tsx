import {useEffect, useState} from "react";
import {Adventure} from "./Adventure";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type UseAdventureProps = {

}
export default function UseAdventure(props: UseAdventureProps){
    const [adventures, setAdventures] = useState<Adventure[]>([])
    useEffect(() =>{
        loadAllAdventures()
    }, [])

    function loadAllAdventures(){
        axios.get("/api/adventures")
            .then((response) => {
                setAdventures(response.data)})
            .catch((error) => {
                console.error(error)
            })
    }
    return {adventures}

}