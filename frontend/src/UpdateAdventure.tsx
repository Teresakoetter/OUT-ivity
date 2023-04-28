import {Adventure,} from "./Adventure";
import {ChangeEvent, FormEvent} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UseAdventureDetail from "./UseAdventureDetail";


type UpdateAdventureProps = {
    updateAdventure: (newAdventure: Adventure) => void
}
export default function UpdateAdventure(props: UpdateAdventureProps) {
    const {adventure, setAdventure} = UseAdventureDetail()
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate();

    function onSaveAdventure(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (id) {
            props.updateAdventure(adventure)

            navigate("/adventures")
        }
    }

    function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const targetName: string = event.target.name;
        const value: string = event.target.value;
        if (id) {
            setAdventure(
                {...adventure, id: id, [targetName]: value}
            )
        }
    }

    return (
        <div>
            <form onSubmit={onSaveAdventure}>
                <textarea
                    name="name"
                    placeholder={adventure.name}
                    value={adventure.name}
                    onChange={onChange}
                />
                <textarea
                    name="quote"
                    placeholder={adventure.quote}
                    value={adventure.quote}
                    onChange={onChange}
                />
                <textarea
                    name="description"
                    placeholder={adventure.description}
                    value={adventure.description}
                    onChange={onChange}
                />
                <button>Update</button>
            </form>
        </div>

    )
}