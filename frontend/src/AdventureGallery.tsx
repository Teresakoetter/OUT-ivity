import UseAdventure from "./UseAdventure";
import AdventureCard from "./AdventureCard";
import './AdventureGallery.css'
import {ChangeEvent, useState} from "react";


export default function AdventureGallery() {
    const {adventures} = UseAdventure()
    const [searchText, setSearchText] = useState("")
    const filteredAdventures = adventures.filter((adventure)=> adventure.name.toLowerCase().includes(searchText.toLowerCase()))
    function onChange(value: string) {
        setSearchText(value)
    }

    function onTextChange(event: ChangeEvent<HTMLInputElement>) {
        onChange(event.target.value)
    }

    return (
        <div className="adventureGallery">
            <div>
                <p>{searchText}</p>
                <input value={searchText}
                       onChange={onTextChange}
                placeholder="search for adventures"/>

            </div>
            {filteredAdventures.map((adventure) =>
                <AdventureCard key={adventure.id} adventure={adventure}/>)
            }
        </div>
    )

}



