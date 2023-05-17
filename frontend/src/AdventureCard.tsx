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
            <div className="name">
            {props.adventure.name}
                </div>
            <p></p>
            <span>"</span>
            {props.adventure.quote}
            <span>"</span>
            <br/>
            <br/>
            <img src={props.adventure.url} alt={props.adventure.name}/>
            <br/><br/>
            <button onClick={() => {
                navigate("/adventures/" + props.adventure.id)
            }}>click here for the whole story
            </button>
        </div>
    )
}