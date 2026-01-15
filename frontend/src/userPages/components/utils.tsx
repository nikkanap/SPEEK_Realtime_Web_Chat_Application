import { useNavigate } from "react-router-dom";

// getting the URL of our API/backend
export const apiURL = import.meta.env.VITE_API_URL;

export const loadPage = async () => {
    const res:any = await fetch(`${apiURL}/user_data`, {
        headers: { "Content-Type" : "application/json" },
        credentials: "include"
    });
    
    return await res.json();  // returns an object
}

export const getListOfUsers = async () => {
    const res:any = await fetch(`${apiURL}/get_users`, {
        headers: { "Content-Type" : "application/json" },
        credentials: "include"  
    });

    return await res.json() 
}

export const selectUser = async (user: Array<number>) => {
    const navigate = useNavigate();

    const res = await fetch(`${apiURL}/select_chatmate`, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        credentials: "include",
        body: JSON.stringify({
        userid : user[0],
        username : user[1]
        })
    });

    const success = await res.json()
    if (success.success) navigate("/chatpage");
}