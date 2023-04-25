import {Adventure} from "./Adventure";
import './AdventureCard.css'

type AdventureDetailCardProps = {
    adventure: Adventure
}

export default function AdventureDetailCard (props: AdventureDetailCardProps){
    return(
        <div className="adventureCard">
            <p>id:</p>
            {props.adventure.id}
            <p>name:</p>
            {props.adventure.name}
            <p>quote:</p>
            {props.adventure.quote}
            <p>description:</p>
            {props.adventure.description}
        </div>
    )
}