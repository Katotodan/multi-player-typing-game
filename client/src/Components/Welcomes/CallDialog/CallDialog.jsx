import React, { useRef, useContext, useEffect } from "react";
import { socket } from "../../../socket";
import {UserNameContext, ImageUrlContext, RoomId, RandomTextIndexContext } from "../../../Context";
import "./callDialog.css"

export const CallDialog = ({displayDialog, caller, displayRemainingTime}) =>{
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
        <dialog ref={dialogContainer}>
            <h2 className="title">{caller.callerName} is requesting for a race</h2>
            <div className="btn-container">
                <button onClick={acceptCall} className="btn">Accept</button>
                <button onClick={() => dialogContainer.current.close()} className="declineBtn">Decline</button>
            </div>
        </dialog>
    )
}

