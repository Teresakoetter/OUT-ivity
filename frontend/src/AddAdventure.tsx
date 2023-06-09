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
    const [transportation, setTransportation] = useState("choose your way of moving")
    const navigate = useNavigate();

    function onSaveAdventure(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const newAdventure: NewAdventure = {name: name, quote: quote, description: description, transportation: transportation}

        props.addAdventure(newAdventure, image)
        navigate("/adventures")

    }

    return (
        <div>
            <form onSubmit={onSaveAdventure}>
                <div className="textareaContainer">
                <textarea className="addName"
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
                        className="addDescription"
                        placeholder="we're excited to read the whole story"
                        value={description}
                        onChange={(event) => {
                            setDescription(event.target.value)
                        }}/>
                    <input type="file"
                           className="imagefile"
                           placeholder="share a picture with us"
                           onChange={(event) => {
                               if (event.target.files) {
                                   setImage(event.target.files[0])
                               }
                           }
                           }/>
                    <label htmlFor="dropdown">
                        <select
                            className="dropdown"
                            id="dropdown"
                            name="dropdown"
                            value={transportation}
                            onChange={(event) => {
                                setTransportation(event.target.value)
                            }}>
                            <option value="choose your way of moving">choose your way of moving</option>
                            <option value="bicycle">bicycle</option>
                            <option value="more wheels">more wheels</option>
                            <option value="on the water">on the water</option>
                            <option value="through the air">through the air</option>
                            <option value="afoot">afoot</option>
                        </select>
                    </label>
                </div>
                <br/>
                <br/>
                <button>save adventure</button>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </form>
        </div>
    )

}