import React, {useState, useContext} from "react"
import { UserNameContext } from "../../../Context"
import "./userInfo.css"


export const UserInfo = () =>{
    const [username, setUsername] = useState("")
    const {setCurrentUser} = useContext(UserNameContext)
    const addUsername = (e) =>{
        setUsername(e.target.value)
        setCurrentUser(e.target.value)
    }
    return(
        <>
            <label className="input-label">Username: {username}</label>
            <input type="text" 
            placeholder="Enter your username" 
            value={username} onChange={addUsername}
            className="username-input"/>
        </>
    )
}