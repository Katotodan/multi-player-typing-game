import React, {useContext, useEffect, useState} from "react";

import { Request } from "../../Components/Welcomes/Request/Request";
import { SelectCompetitor } from "../../Components/Welcomes/SelectCompetitor/SelectCompetitor";
import { Navbar } from "../../Components/Navbar/Navbar";
import { UserNameContext, ImageUrlContext } from "../../Context";
import { Navigate, Link } from "react-router-dom";
import "./RequestUserPage.css"
import { Search, X } from "lucide-react";


export const RequestUserPage = () =>{

    // Context
    const {currentUser} = useContext(UserNameContext)
    const {currentUserImg} = useContext(ImageUrlContext)
    const [competitor, setCompetitor] = useState([])
    const [navigateUser, setNavigateUser] = useState(false)

    const [showOnlineUser, setShowOnlineUser] = useState(false)
    const [showWelcomingMsg, setShowWelcomingMsg] = useState(true)


    // Checking if username exist
    useEffect(()=>{
        if(!currentUser || !currentUserImg){
            setNavigateUser(true)
        }
    }, [])

    const selectedCompetitor = (competitors) =>{
        setCompetitor(competitors)
    }
    const toggleOnlineUser = ()=>{
        setShowOnlineUser(prev => !prev)
        setShowWelcomingMsg(prev => !prev)
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
                    <Request competitor = {competitor} display={showWelcomingMsg}/>
                </div>
                <div className="send-request">
                    <button id={competitor ? "desablebtn" : "enableBtn"} 
                    // onClick={sendRequestFnc}
                    > Send Request</button>
                    <button>
                        <Link to="/start" className="link" >Race Alone</Link>
                    </button> 
                </div>
            </div>
            
            {navigateUser && <Navigate to="/"/>}
        </>
        
    )
}
// Working on sending request and then working on large screen responsiveness