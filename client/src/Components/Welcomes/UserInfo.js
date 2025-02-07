import React, {useState, useContext} from "react"
import { UserNameContext } from "../../Context"

// JSS CSS START
import { createUseStyles } from "react-jss"
const styles = {
    label: {
        fontSize: "1.5rem",
        display: "block",
        margin: "1rem 0"
    },
    input: {
        width: "20rem",
        height: "2rem",
        padding: "0.25rem 0.5rem",
        margin: "0 0 1rem 0",
        borderRadius: 5,
        border: "1px solid black"
    }
}
const useStyles = createUseStyles(styles)

export const UserInfo = () =>{
    const classes = useStyles()
    const [username, setUsername] = useState("")
    const {setCurrentUser} = useContext(UserNameContext)
    const addUsername = (e) =>{
        setUsername(e.target.value)
        setCurrentUser(e.target.value)
    }
    return(
        <>
            <label className={classes.label}>Username: {username}</label>
            <input type="text" 
            placeholder="Enter your username" 
            value={username} onChange={addUsername}
            className={classes.input}/>
        </>
    )
}