import {NewAdventure} from "./Adventure";
import {FormEvent, useState} from "react";

type AddAdventureProps = {
    addAdventure: (newAdventure: NewAdventure) => void
}
export default function AddAdventure(props: AddAdventureProps) {
    const [name, setName] = useState("")
    const [quote, setQuote] = useState("")
    const [description, setDescription] = useState("")

    function onSaveAdventure(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const newAdventure: NewAdventure = {name: name, quote: quote, description: description}

        props.addAdventure(newAdventure)

    }

    return (
        <div>
            <form onSubmit={onSaveAdventure}>
                <textarea
                    placeholder="insert name"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value)
                    }}/>
                <textarea
                    placeholder="insert quote"
                    value={quote}
                    onChange={(event) => {
                        setQuote(event.target.value)
                    }}/>
                <textarea
                    placeholder="insert description"
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value)
                    }}/>
                <br/>
                <button>save adventure</button>
            </form>
        </div>
    )

}