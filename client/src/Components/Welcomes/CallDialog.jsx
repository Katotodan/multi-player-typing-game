import React, { useRef, useContext } from "react";
import { socket } from "../../socket";
import { AllCompetitors, UserNameContext, ImageUrlContext, RoomId } from "../../Context";

export const CallDialog = ({displayDialog, caller}) =>{
    const dialogContainer = useRef()
    const {currentUser} = useContext(UserNameContext)
    const {currentUserImg} = useContext(ImageUrlContext)
    const {setRoomId} = useContext(RoomId)
    

    if(displayDialog){
        dialogContainer.current.showModal()
    }else{
        // Did not answer the call
        dialogContainer.current?.close()

    }
        


    const acceptCall = () =>{
        // Accept the call
        socket.emit("callAccepted", 
        [{
            "socketId":socket.id, 
            "callerName": currentUser, 
            "callerImg":currentUserImg, 
            "position": 0}, caller.socketId
        ])
        setRoomId(caller.socketId)
        dialogContainer.current.close()
    }
    return(
        <dialog ref={dialogContainer}>
            <h2>{caller.callerName} is requesting for a race</h2>
            
            <button onClick={acceptCall}>Accept</button>
            <button onClick={() => dialogContainer.current.close()}>Decline</button>
        </dialog>
    )
}

