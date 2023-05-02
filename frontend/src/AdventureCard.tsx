import {Adventure} from "./Adventure";
import './AdventureCard.css'
import {useNavigate} from "react-router-dom";

type AdventureCardProps = {
    adventure: Adventure
}

export default function AdventureCard(props: AdventureCardProps) {
    const navigate = useNavigate()
    return (
        <div className="adventureCard">
            <p>id:</p>
            {props.adventure.id}
            <p>name:</p>
            {props.adventure.name}
            <p></p>
            <span>"</span>
            {props.adventure.quote}
            <span>"</span>
            <p>description:</p>
            {props.adventure.description}
            <br/><br/>
            <button onClick={() => {navigate("/adventures/" + props.adventure.id)}}>details</button>
        </div>
    )
}