
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function Logout(){
    const onLogout = async (): Promise<void> => {
    }
    const navigate = useNavigate();
    const [, setIsLoading] = useState(false);
    function handleLogout() {
        setIsLoading(true);
        onLogout()
            .then(() => {
                navigate("/login");
            })
    }





    return(
        <div>
            <p></p>
            <button onClick={handleLogout}>until we meet again</button>
        </div>
    )

}