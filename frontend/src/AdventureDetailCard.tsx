import './AdventureDetailCard.css'
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
        <div >
            {
                adventure
                    ? <div className="adventureDetailCard">
                        <div className="image_quote">
                            <img src={adventure.url} alt={adventure.name}/>
                            <p></p>
                            <span>"</span>
                            {adventure.quote}
                            <span>"</span>
                        </div>
                        <div>
                            <section className="name">
                                {adventure.name}
                            </section>
                            <br/>
                            <section className="description">
                            {adventure.description}
                            </section>
                            <br/>
                        </div>
                    <div className="buttons">
                            <button onClick={onDeleteClick}>delete adventure</button>
                            <button onClick={() => {
                                navigate("/adventures/update/" + adventure.id)
                            }}>update adventure
                            </button>
                    </div>
                    </div>
                    : <div>Loading...</div>
            }

        </div>
    )
}