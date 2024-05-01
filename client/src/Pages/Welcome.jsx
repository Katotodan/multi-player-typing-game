import React, {useState, useContext} from "react";
import { SelectAvatar } from "../Components/Welcomes/SelectAvatar";
import { UserInfo } from "../Components/Welcomes/UserInfo";
import { Navigate } from "react-router-dom";
import { UserNameContext, ImageUrlContext } from "../Context";
import { socket } from "../socket";

// JSS CSS START
import { createUseStyles } from "react-jss"
const styles = {
    h2: {
        textAlign: "center",
        margin: "1rem 0"
    },
    p: {
        textAlign: "center",
        margin: "0 1rem 1rem 1rem",
        fontSize: "1.5rem"
    },
    btn:{
        padding: "0.5rem 1rem",
        margin: "3rem",
        borderRadius: 5
    },
    msgContainer:{
        position: "relative",
        margin: "2rem 1rem 1rem 3rem",
        width: "100%",
        height: "2rem",
    },
    msg:{
        position:"absolute",
        buttom: 0,
        left: 0,
        color: "red"
    }
}
const useStyles = createUseStyles(styles)

export const Welcome = () =>{
    const classes = useStyles()
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
        <>
            <h2 className={classes.h2}>Welcome to Arcadia typing game</h2>
            <p className={classes.p}>In a world where typing speed is power...</p>
            <UserInfo/>
            <SelectAvatar/>
            <div className={classes.msgContainer}>
                {displayMessage && <p className={classes.msg}>Add username and select your avatar please!!!</p>}
            </div>
            <button type="button" onClick={goOnline} className={classes.btn}>See online combetitors</button>
            {displayOnlineUsers && <Navigate to="/request"/>}
            
            
            
            
        </>
    )
}