import {NewAdventure} from "./Adventure";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type AddAdventureProps = {
    addAdventure: (newAdventure: NewAdventure, image: File | undefined) => void
}
export default function AddAdventure(props: AddAdventureProps) {
    const [name, setName] = useState("")
    const [quote, setQuote] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState<File>()
    const navigate = useNavigate();

    function onSaveAdventure(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const newAdventure: NewAdventure = {name: name, quote: quote, description: description}

        props.addAdventure(newAdventure, image)
        navigate("/adventures")

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
                <input type="file" onChange={(event) => {
                    if (event.target.files) {
                        setImage(event.target.files[0])
                    }
                }
                }/>
                <br/>
                <button>save adventure</button>
            </form>
        </div>
    )

}