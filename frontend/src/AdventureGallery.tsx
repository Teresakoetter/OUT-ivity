import UseAdventure from "./UseAdventure";
import AdventureCard from "./AdventureCard";
import {Adventure} from "./Adventure";


type AdventureGalleryProps = {
    adventures: Adventure[]
}
export default function (props: AdventureGalleryProps){
    const {adventures}=UseAdventure()

    return(
        <div>
            {adventures.map((adventure) =>
            <AdventureCard key={adventure.id} adventure={adventure}/>)
            }
        </div>
    )

}