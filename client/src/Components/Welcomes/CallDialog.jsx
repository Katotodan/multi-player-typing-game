import React, { useRef, useContext, useEffect } from "react";
import { socket } from "../../socket";
import {UserNameContext, ImageUrlContext, RoomId, RandomTextIndexContext } from "../../Context";


// JSS CSS START
import { createUseStyles } from "react-jss"
const styles = {
    dialog:{
        width: "50%",
        height: "10rem",
        transform: "translate(80%, 150%)"
    },
    title:{
        textAlign: "center",
        margin: "1rem 0 2rem 0"
    },
    btnContainer:{
        display:"flex",
        padding: "0 3rem",
        justifyContent: "space-between"
    },
    btn:{
        padding: "0.5rem 1rem",
        backgroundColor: "#87CEEB",
        borderRadius: 5,
        cursor: "pointer"
    },
    declineBtn:{
        padding: "0.5rem 1rem",
        backgroundColor: "#ff0000",
        borderRadius: 5,
        cursor: "pointer"
    }
   
}

const useStyles = createUseStyles(styles)


export const CallDialog = ({displayDialog, caller, displayRemainingTime}) =>{
    const classes = useStyles()
    const dialogContainer = useRef()
    const {currentUser} = useContext(UserNameContext)
    const {currentUserImg} = useContext(ImageUrlContext)
    const {setRoomId} = useContext(RoomId)
    const {setRandomTextIndex} = useContext(RandomTextIndexContext)
    
    useEffect(()=>{
        if(displayDialog){
            dialogContainer.current.showModal()
        }else{
            // Did not answer the call
            dialogContainer.current?.close()
    
        }

    }, [displayDialog])
    
        


    const acceptCall = () =>{
        // Display remaining time
        displayRemainingTime()
        // Accept the call
        socket.emit("callAccepted", 
        [{
            "socketId":socket.id, 
            "callerName": currentUser, 
            "callerImg":currentUserImg, 
            "position": 0}, caller.socketId
        ]);
        setRoomId(caller.socketId);
        setRandomTextIndex(caller.randomNumber)
        dialogContainer.current.close()
    }
    return(
        <dialog ref={dialogContainer} className={classes.dialog}>
            <h2 className={classes.title}>{caller.callerName} is requesting for a race</h2>
            <div className={classes.btnContainer}>
                <button onClick={acceptCall} className={classes.btn }>Accept</button>
                <button onClick={() => dialogContainer.current.close()} className={classes.declineBtn}>Decline</button>
            </div>
            
        </dialog>
    )
}

