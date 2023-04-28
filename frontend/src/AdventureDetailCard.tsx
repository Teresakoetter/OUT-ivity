import './AdventureCard.css'
import UseAdventureDetail from "./UseAdventureDetail";
import {Adventure} from "./Adventure";
import {useNavigate} from "react-router-dom";

type AdventureDetailCardProps = {
    deleteAdventure: (id: string) => void
    updateAdventure: (adventure: Adventure) => void
}

export default function AdventureDetailCard(props: AdventureDetailCardProps) {

    const {adventure} = UseAdventureDetail()
    const navigate = useNavigate();

    function onDeleteClick() {
        if (adventure) {
            props.deleteAdventure(adventure.id)
            navigate("/adventures")
        }

    }

    return (
        <div className="adventureCard">
            {
                adventure
                    ? <div>
                        <p>id:</p>
                        {adventure.id}
                        <p>name:</p>
                        {adventure.name}
                        <p>quote:</p>
                        {adventure.quote}
                        <p>description:</p>
                        {adventure.description}
                        <br/>
                        <button onClick={onDeleteClick}>delete adventure</button>
                        <button onClick={() => {
                            navigate("/adventures/update/" + adventure.id)
                        }}>update adventure
                        </button>
                    </div>
                    : <div>Loading...</div>
            }

        </div>
    )
}