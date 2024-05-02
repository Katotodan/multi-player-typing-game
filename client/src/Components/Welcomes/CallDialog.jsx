import React, { useRef, useContext, useEffect } from "react";
import { socket } from "../../socket";
import { AllCompetitors, UserNameContext, ImageUrlContext, RoomId, RandomTextIndexContext } from "../../Context";

export const CallDialog = ({displayDialog, caller}) =>{
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
        console.log("Close clicked")
    }
    return(
        <dialog ref={dialogContainer}>
            <h2>{caller.callerName} is requesting for a race</h2>
            
            <button onClick={acceptCall}>Accept</button>
            <button onClick={() => dialogContainer.current.close()}>Decline</button>
        </dialog>
    )
}

