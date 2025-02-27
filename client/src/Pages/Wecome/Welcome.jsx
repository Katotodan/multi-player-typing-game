import React, {useState, useContext} from "react";
import { SelectAvatar } from "../../Components/Welcomes/SelectAvatar";
import { UserInfo } from "../../Components/Welcomes/UserInfo";
import { Navigate } from "react-router-dom";
import { UserNameContext, ImageUrlContext } from "../../Context";
import { socket } from "../../socket";
import styles from "./Welcome.module.css"


export const Welcome = () =>{
    const [displayOnlineUsers, setDisplayOnlineUsers] = useState(false)
    const [displayMessage, setDisplayMessage] = useState(false)
    // Context
    const {currentUser,setCurrentUser} = useContext(UserNameContext)
    const {currentUserImg, setCurrentUserImg} = useContext(ImageUrlContext)

    const goOnline = () =>{
        if(currentUser && currentUserImg){
            // Go online too
            socket.connect()
            socket.emit("addUser" , {
                "username": currentUser,
                "userImg" : currentUserImg
            }) 
            setDisplayOnlineUsers(true)    
        }else{
            setDisplayMessage(true)
            setTimeout(() => {
                setDisplayMessage(false)
            }, 2000);
        }    
    }

    return(
        <div className={styles.container}>
            <h2>Welcome to Arcadia typing game</h2>
            <p>In a world where typing speed is power...</p>
            <UserInfo/>
            <SelectAvatar/>
            <div className={styles.msgContainer}>
                {displayMessage && <p className={styles.msg}>Add username and select your avatar please!!!</p>}
            </div>
            <button type="button" onClick={goOnline}>See online combetitors</button>
            {displayOnlineUsers && <Navigate to="/request"/>}   
        </div>
    )
}