import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import './LoginPage.css';

type Props = {
    onLogin: (username: string, password: string) => Promise<void>
}
export default function LoginPage(props: Props) {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.onLogin(username, password)
            .then(() => {
                navigate("/adventures")
            })
            .catch((error) => {
                console.error("Error occurred:", error)
            })
    }

    return (
        <div className="login">
            <br/>
            <br/>
            <br/>
            <p>Setting sails with OUT-ivity</p>
            <br/>
            <form onSubmit={onSubmit}>
                <input value={username} placeholder="  username" type="text"
                       onChange={e => setUsername(e.target.value)}/>
                <br/>
                <br/>
                <input value={password} placeholder="  password" type="password"
                       onChange={e => setPassword(e.target.value)}/>
                <br/>
                <br/>
                <br/>
                <button type="submit">login</button>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
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
