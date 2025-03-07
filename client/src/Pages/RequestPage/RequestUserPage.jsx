import React, {useContext, useEffect, useState} from "react";

import { Request } from "../../Components/Welcomes/Request/Request";
import { SelectCompetitor } from "../../Components/Welcomes/SelectCompetitor/SelectCompetitor";
import { Navbar } from "../../Components/Navbar/Navbar";
import { UserNameContext, ImageUrlContext } from "../../Context";
import { Navigate, Link } from "react-router-dom";
import "./RequestUserPage.css"
import { Search, X } from "lucide-react";
import { SendRequest } from "../../Components/Welcomes/SendRequest/SendRequest";


export const RequestUserPage = () =>{

    // Context
    const {currentUser} = useContext(UserNameContext)
    const {currentUserImg} = useContext(ImageUrlContext)
    const [competitor, setCompetitor] = useState([])
    const [navigateUser, setNavigateUser] = useState(false)

    const [showOnlineUser, setShowOnlineUser] = useState(false)
    const [showWelcomingMsg, setShowWelcomingMsg] = useState(true)
    const [isRequestSent, setIsRequestSent] = useState(false)


    // Checking if username exist
    useEffect(()=>{
        if(!currentUser || !currentUserImg){
            setNavigateUser(true)
        }
        setIsRequestSent(false)
    }, [])

    const selectedCompetitor = (competitors) =>{
        setCompetitor(competitors)
    }
    const toggleOnlineUser = ()=>{
        setShowOnlineUser(prev => !prev)
        setShowWelcomingMsg(prev => !prev)
    }
    const sendRequestFnc = () =>{
        toggleOnlineUser()
        setIsRequestSent(true)

    }
    const displayWecomingMsg = () =>{
        setShowOnlineUser(false)
        setShowWelcomingMsg(true)
    }

    return(
        <>
            <Navbar username={currentUser} imgUrl={currentUserImg}/>
            {/* Toggle button */}
            {showWelcomingMsg && <button className="search-btn" onClick={toggleOnlineUser}><Search/></button>}
            {showOnlineUser && <button className="search-btn" onClick={toggleOnlineUser}><X /></button>}
            
            <div className="request-page-main-container">
                <div className="request-container">
                    <SelectCompetitor selectedCompetitor = {selectedCompetitor} display={showOnlineUser}/>
                    <Request competitor = {competitor} 
                    display={showWelcomingMsg} isRequestSent={isRequestSent} displayWecomingMsg ={displayWecomingMsg}/>
                </div>
                <SendRequest competitor={competitor} sendRequestFnc={sendRequestFnc}/>
            </div>
            
            {navigateUser && <Navigate to="/"/>}
        </>
        
    )
}