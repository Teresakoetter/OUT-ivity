import {Adventure} from "./Adventure";
import './AdventureCard.css'
import {useNavigate} from "react-router-dom";
import {ReactComponent as BicycleIcon} from './bicycle-solid_calm.svg';
import {ReactComponent as ShoePrintsIcon} from './shoe-prints-solid.svg';
import {ReactComponent as AnchorIcon} from './anchor-solid.svg';
import {ReactComponent as PlaneIcon} from './plane-solid.svg';
import {ReactComponent as TruckIcon} from './truck-solid.svg';


type AdventureCardProps = {
    adventure: Adventure
}

export default function AdventureCard(props: AdventureCardProps) {

    const renderTransportationImage = () => {
        if (props.adventure.transportation === 'bicycle') {
            return <BicycleIcon/>;
        } else if (props.adventure.transportation === 'more wheels') {
            return <TruckIcon/>;
        } else if (props.adventure.transportation === 'on the water') {
            return <AnchorIcon/>;
        } else if (props.adventure.transportation === 'through the air') {
            return <PlaneIcon/>;
        } else if (props.adventure.transportation === 'afoot') {
            return <ShoePrintsIcon/>;
        }
    };

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
            <img src={props.adventure.url} alt={props.adventure.name}/>

            <p className="move">...and how did you move?</p>
            <div className="icon">
                {renderTransportationImage()}
            </div>
            <button onClick={() => {
                navigate("/adventures/" + props.adventure.id)
            }}>click here for the whole story
            </button>
        </div>
    )
}