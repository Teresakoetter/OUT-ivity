import {NewAdventure} from "./Adventure";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import './AddAdventure.css'

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
                <div className="textareaContainer">
                <textarea className="name"
                    placeholder="insert your adventure name"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value)
                    }}/>
                <textarea
                    className="quote"
                    placeholder="share a quote with us"
                    value={quote}
                    onChange={(event) => {
                        setQuote(event.target.value)
                    }}/>
                <textarea
                    className="description"
                    placeholder="we're excited to read the whole story"
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value)
                    }}/>
                <input type="file"
                       placeholder="share a picture with us"
                       onChange={(event) => {
                    if (event.target.files) {
                        setImage(event.target.files[0])
                    }
                }
                }/>
                </div>
                <button>save adventure</button>
                </form>
        </div>
    )

}