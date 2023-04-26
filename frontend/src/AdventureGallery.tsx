import UseAdventure from "./UseAdventure";
import AdventureCard from "./AdventureCard";
import './AdventureGallery.css'

export default function AdventureGallery() {
    const {adventures} = UseAdventure()

    return (
        <div className="adventureGallery">
            {adventures.map((adventure) =>
                <AdventureCard key={adventure.id} adventure={adventure}/>)
            }
        </div>
    )

}