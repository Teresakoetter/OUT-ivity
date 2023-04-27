import {Adventure,} from "./Adventure";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";



type UpdateAdventureProps = {
    updateAdventure: (newAdventure: Adventure) => void
}
export default function UpdateAdventure(props: UpdateAdventureProps){
    const initialState: Adventure = {id: "", name: "", quote: "", description: ""}
    const [adventure, setAdventure] = useState<Adventure>(initialState)
    const {id} = useParams<{id: string}>()
    function onChange(event: ChangeEvent<HTMLInputElement>){
        const targetName: string = event.target.name;
        const value: string = event.target.value;
        if(id){
            setAdventure(
                {...adventure, id: id, [targetName]: value}
            )
        }

    }
    const navigate = useNavigate();
    function onSaveAdventure(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
            if(id){
            props.updateAdventure(adventure)
            navigate("/adventures")

        }
    }

    return(
        <div>
            <form onSubmit={onSaveAdventure}>
                <input
                    type="text"
                    name ="name"
                    placeholder={adventure.name}
                    value={adventure.name}
                    onChange={onChange}/>
                <input
                    type="text"
                    name ="quote"
                    placeholder={adventure.quote}
                    value={adventure.quote}
                    onChange={onChange}/>
                <input
                    type="text"
                    name ="description"
                    placeholder={adventure.description}
                    value={adventure.description}
                    onChange={onChange}/>
                <button>Update</button>
            </form>
        </div>

    )
}