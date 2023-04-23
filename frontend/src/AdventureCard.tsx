import {Adventure} from "./Adventure";

type AdventureCardProps = {
    adventure: Adventure
}

export default function AdventureCard (props: AdventureCardProps){
    return(
        <div>
            <p>id:</p>
            {props.adventure.id}
            <p>name:</p>
            {props.adventure.name}
            <p>quote:</p>
            {props.adventure.quote}
            <p>description:</p>
            {props.adventure.quote}
        </div>
    )
}