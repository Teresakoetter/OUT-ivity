import UseAdventure from "./UseAdventure";
import AdventureCard from "./AdventureCard";
import {Adventure} from "./Adventure";
import './AdventureGallery.css'


type AdventureGalleryProps = {
    adventures: Adventure[]
}
export default function (props: AdventureGalleryProps){
    const {adventures}=UseAdventure()

    return(
        <div className="adventureGallery">
            {adventures.map((adventure) =>
            <AdventureCard key={adventure.id} adventure={adventure}/>)
            }
        </div>
    )

}