import {Adventure} from "./Adventure";
import './AdventureCard.css'

type AdventureCardProps = {
    adventure: Adventure
}

export default function AdventureCard(props: AdventureCardProps) {
    return (
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