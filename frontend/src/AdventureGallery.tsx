import UseAdventure from "./UseAdventure";
import AdventureCard from "./AdventureCard";
import './AdventureGallery.css'
import {ChangeEvent, useState} from "react";

type AdventureGalleryProps = {
   // inputText: string,
   // onChange: (value: string) => void
}
export default function AdventureGallery(props: AdventureGalleryProps) {
    const {adventures} = UseAdventure()
    const [searchText, setSearchText] = useState("")
    const filteredAdventures = adventures.filter((adventure)=> adventure.name.toLowerCase().includes(searchText.toLowerCase()))
    function onChange(value: string) {
        setSearchText(value)
    }

    function onTextChange(event: ChangeEvent<HTMLInputElement>) {
        //Die Callback Funktion wird aufgerufen mit dem Wert den der Nutzer eingetippt hat(event.target.value)
        onChange(event.target.value)
    }

    return (
        <div className="adventureGallery">
            <div>
                <p>{searchText}</p>
                {/* value: Was wird im input Feld angezeigt? onChange: Was soll passieren wenn der nutzer was eintippt? */}
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



