import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function useUser() {
    const [user, setUser] = useState<string>()
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        function checkLoggedInUser() {
            axios
                .get("/api/users/me")
                .then((response) => {
                    if (response.data && response.data !== "anonymousUser") {
                        setUser(response.data);
                    }
                })
                .catch(() => {
                    toast.error("Kein User gefunden");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        //eslint-disable-next-line
        checkLoggedInUser();
    }, []);

    function login(username: string, password: string) {
        return axios.post("/api/users/login", undefined, {auth: {username, password}})
            .then(response => {
                setUser(response.data);
                toast.success("Login successful - welcome :)");
            })
    }

    function logout() {
        axios.post("/api/users/logout")
            .then(() => {
                setUser(undefined);
            })
            .catch(() => {
                console.log("error")
            });
    }



    return {user, login, logout, isLoading, setIsLoading}
}