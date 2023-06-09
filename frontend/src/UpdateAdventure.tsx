import {Adventure,} from "./Adventure";
import {ChangeEvent, FormEvent} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UseAdventureDetail from "./UseAdventureDetail";
import './UpdateAdventure.css'


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
                <div className="textareaContainer">
                <textarea
                    name="name"
                    placeholder={adventure.name}
                    value={adventure.name}
                    onChange={onChange}
                />
                <textarea
                    className="quote"
                    name="quote"
                    placeholder={adventure.quote}
                    value={adventure.quote}
                    onChange={onChange}
                />
                <textarea
                    className="updateDescription"
                    name="description"
                    placeholder={adventure.description}
                    value={adventure.description}
                    onChange={onChange}
                />
                </div>
                <button>Update</button>
            </form>
        </div>

    )
}