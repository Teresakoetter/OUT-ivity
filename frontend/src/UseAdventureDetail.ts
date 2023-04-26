import {useEffect, useState} from "react";
import {Adventure} from "./Adventure";
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function UseAdventureDetail() {
    const [adventure, setAdventure] = useState<Adventure>()
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            loadAdventureById(id);
        }
        //eslint-disable-next-line
    }, []);

    function loadAdventureById(id: string) {
        axios.get('/api/adventures/' + id)
            .then((response) => {
                setAdventure(response.data)
            })
            .catch(() => {
                toast.error("Adventure does not exist.")
            })


    }

    return {adventure}

}
