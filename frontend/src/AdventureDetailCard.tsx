import './AdventureCard.css'
import UseAdventureDetail from "./UseAdventureDetail";

type AdventureDetailCardProps = {
    deleteAdventure: (id: string) => void
}

export default function AdventureDetailCard(props: AdventureDetailCardProps) {
    const {adventure} = UseAdventureDetail()

    function onDeleteClick() {
        if (adventure) {
            props.deleteAdventure(adventure.id)
        }

    }

    return (
        <div className="adventureCard">
            <p>id:</p>
            {adventure?.id}
            <p>name:</p>
            {adventure?.name}
            <p>quote:</p>
            {adventure?.quote}
            <p>description:</p>
            {adventure?.description}
            <br/>
            <button onClick={onDeleteClick}>delete adventure</button>

        </div>
    )
}