import React, {useEffect, useRef, useState, useContext} from "react";
import { socket } from "../../../socket";
import { CallDialog } from "../CallDialog/CallDialog";
import { AllCompetitors, UserNameContext, ImageUrlContext, RoomId, RandomTextIndexContext } from "../../../Context";
import { Navigate } from "react-router-dom";
import "./request.css"


export const Request = ({competitor, display, isRequestSent, displayWecomingMsg, noCompetitorResponded}) =>{
    const [sendRequest, setSendRequest] = useState(false) // Show the requesting ... message on the screen
    const [validetedRequest, setValidetedRequest] = useState(false)
    const [caller, setCaller] = useState(false)
    const [displayDialog, setDisplayDialog] = useState(false)

    const [navigateToPlaypage, setNavigateToPlaypage] = useState(false)
    const [timeRemainingToStartGame, setTimeRemainingToStartGame] = useState(10)

    // Context
    const {setAllCompetitors} = useContext(AllCompetitors)
    const {currentUser} = useContext(UserNameContext)
    const {currentUserImg} = useContext(ImageUrlContext)
    const {setRoomId} = useContext(RoomId)
    const {setRandomTextIndex} = useContext(RandomTextIndexContext)
    const joinedCompetitors = useRef([])

    useEffect(() =>{
        const onCall = (callerInfo) =>{
            // Should always display the welcoming message on mobile phone            
            setDisplayDialog(true)
            setCaller(callerInfo)  
            setTimeout(() => {
                // Close dialog
                setDisplayDialog(false)
            }, 10000);        
        }
        const onCompetitorJoin = (joinCompetitor) =>{  
            joinedCompetitors.current = [...joinedCompetitors.current ,joinCompetitor]             
            setSendRequest(false)
            setValidetedRequest(true)
            callfn()
        }
        const onSendBackCompetitors = (joinCompetitors) =>{   
            // Filtering competitors to exclude you
            const currentCompetitor = joinCompetitors.filter(element => socket.id !== element.socketId)
            setAllCompetitors(currentCompetitor) 
        }
        
        socket.on("call", onCall)
        socket.on("competitor_join", onCompetitorJoin)
        socket.on("sendBackCompetitors", onSendBackCompetitors)

        return () =>{
            socket.off("call", onCall)
            socket.off("competitor_join", onCompetitorJoin)
        }
    }, [])

    const sendRequestFnc = () =>{
        // Get random number for indexing the text to be displayed while playing
        const randomNumber = Math.floor(Math.random() * 16)
        setRandomTextIndex(randomNumber)
        socket.emit("request", 
        [competitor,
            {
                "socketId":socket.id, 
                "callerName": currentUser, 
                "callerImg":currentUserImg, 
                "position": 0,
                "randomNumber": randomNumber
            }
        ])
        setValidetedRequest(false)
        setSendRequest(true)
        setAllCompetitors([]) 

        setTimeout(() => { 
            setSendRequest(false)  // Hide the show request... message on the screen
            if(joinedCompetitors.current.length > 0){
                const allCompetitors = [
                    ...joinedCompetitors.current, {
                    "socketId":socket.id, 
                    "callerName": currentUser, 
                    "callerImg":currentUserImg, 
                    "position": 0}
                ]
                socket.emit("sendCompetitor", allCompetitors)
                setAllCompetitors(joinedCompetitors.current)
                joinedCompetitors.current = []
                setRoomId(socket.id)
            }else{
                // Enable to send another request
                noCompetitorResponded(false)
            }
            
        }, 10000); 
    }
    useEffect(() => {
        if(isRequestSent) sendRequestFnc()
    }, [isRequestSent])

    // function to display the remaining time before game start 
    const callfn = () =>{
        // Calculating the remaining time to start the game
        displayWecomingMsg()
        let i = 10
        const timeInterval = setInterval(() => {
            i -= 1
            setTimeRemainingToStartGame(i)
        }, 1000);

        setTimeout(() => {
            // I should clier interval
            clearInterval(timeInterval)
            i = 10
            setTimeRemainingToStartGame(10)
            setNavigateToPlaypage(true)
        }, 10000);
    }
    
    const displayRemainingTime = () =>{
        setValidetedRequest(true)
        callfn()
    }
    

    return(
        <div className={display ? "welcome-request-container" : "welcome-request-container non-active" }>
            <h2 className="title2">Select an online user to play with. </h2>
            <h3 className="title2">Or wait for another user to call you</h3>
            {sendRequest && <p className="request">Requesting ....</p>}
            {validetedRequest && 
                <p className="validRequest">
                    <span>Game start in {timeRemainingToStartGame} sec</span>
                </p>
            }
            <CallDialog displayDialog={displayDialog} caller={caller} displayRemainingTime = {displayRemainingTime}/>
            {navigateToPlaypage && <Navigate to="/start"/>} 
        </div>
    )
}