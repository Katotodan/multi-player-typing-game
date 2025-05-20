import React, {useState, useContext} from "react";
import { SelectAvatar } from "../../Components/Welcomes/SelectAvatar/SelectAvatar";
import { UserInfo } from "../../Components/Welcomes/UserInfo/UserInfo";
import { Navigate } from "react-router-dom";
import { UserNameContext, ImageUrlContext } from "../../Context";
import { socket } from "../../socket";
import "./welcome.css"


export const Welcome = () =>{
    const [displayOnlineUsers, setDisplayOnlineUsers] = useState(false)
    const [displayMessage, setDisplayMessage] = useState(false)
    // Context
    const {currentUser} = useContext(UserNameContext)
    const {currentUserImg} = useContext(ImageUrlContext)

    const goOnline = () =>{
        if(currentUser && currentUserImg){
            // Go online too
            socket.connect()
            socket.emit("addUser" , {
                "username": currentUser,
                "userImg" : currentUserImg
            }, (response) => {
                if (response.status === "ok") {
                    setDisplayOnlineUsers(true) 
                } else {
                  console.error("Error from server:", response);
                }
              })
               
        }else{
            setDisplayMessage(true)
            setTimeout(() => {
                setDisplayMessage(false)
            }, 2000);
        }    
    }

    return(
        <div className="welcome-container">
            <h2>Welcome to Arcadia typing game</h2>
            <p>In a world where typing speed is power...</p>
            <UserInfo/>
            <SelectAvatar/>
            <div className="msgContainer">
                {displayMessage && <p className="msg">Add username and select your avatar please!!!</p>}
            </div>
            <button type="button" onClick={goOnline} className="goOnline-btn">
                See online combetitors
            </button>
            {displayOnlineUsers && <Navigate to="/request"/>}   
        </div>
    )
}