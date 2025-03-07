import React, {useEffect, useRef, useState, useContext} from "react";
import { socket } from "../../../socket";
import { CallDialog } from "../CallDialog/CallDialog";
import { AllCompetitors, UserNameContext, ImageUrlContext, RoomId, RandomTextIndexContext } from "../../../Context";
import { Navigate } from "react-router-dom";
import "./request.css"


export const Request = ({competitor, display, isRequestSent, displayWecomingMsg}) =>{
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

    let joinnedCompetitors = [] // Array of joinned competitors

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

        // Calculating the remaining time to start the game
        const timeInterval = setInterval(() => {
            setTimeRemainingToStartGame(prev => prev-1)
        }, 1000);

        setTimeout(() => { 
            setSendRequest(false)  // Hide the show request... message on the screen
            if(joinnedCompetitors.length > 0){
                const allCompetitors = [
                    ...joinnedCompetitors, {
                    "socketId":socket.id, 
                    "callerName": currentUser, 
                    "callerImg":currentUserImg, 
                    "position": 0}
                ]
                socket.emit("sendCompetitor", allCompetitors)
                setAllCompetitors(joinnedCompetitors)
                joinnedCompetitors = []
                setRoomId(socket.id)
                setNavigateToPlaypage(true)  
            }
            // I should clier interval
            clearInterval(timeInterval)
        }, 10000); 
    }
    useEffect(() => {
        if(isRequestSent) sendRequestFnc()
    }, [isRequestSent])

    // function to manage call behavior 
    const callfn = () =>{
        // Calculating the remaining time to start the game
        displayWecomingMsg()
        let i = 10
        const timeInterval = setInterval(() => {
            setTimeRemainingToStartGame(i--)
        }, 1000);

        setTimeout(() => {
            // I should clier interval
            clearInterval(timeInterval)
            // Close dialog
            setDisplayDialog(false)
        }, 10000);
    }
    
    
   
    

    // useEffect(()=>{
        const onCall = (callerInfo) =>{
            // Should always display the welcoming message on mobile phone            
            setDisplayDialog(true)
            setCaller(callerInfo)
            callfn()
        }
        const onCompetitorJoin = (competitor) =>{            
            joinnedCompetitors.push(competitor)
            setSendRequest(false)
            setValidetedRequest(true)
        }
        const onSendBackCompetitors = (competitors) =>{   
            // Filtering competitors to exclude you
            const currentCompetitor = competitors.filter(element => socket.id !== element.socketId)
            console.log(currentCompetitor);            
            setAllCompetitors(currentCompetitor) 
            // Navigate to start playing
            setNavigateToPlaypage(true)
        }
        socket.on("call", onCall)
        socket.on("competitor_join", onCompetitorJoin)
        // Receiving competitors from the server
        socket.on("sendBackCompetitors", onSendBackCompetitors)

    //     return () =>{
    //         socket.off("call", onCall)
    //         socket.off("competitor_join", onCompetitorJoin)
    //         // Receiving competitors from the server
    //         socket.off("sendBackCompetitors", onSendBackCompetitors)  
    //     }
    // }, [])

    const displayRemainingTime = () =>{
        setValidetedRequest(true)
    }
    

    return(
        <div className={display ? "welcome-request-container" : "welcome-request-container non-active" }>
            <h2 className="title2">Select an online user in order to be able to play with </h2>
            <h3 className="title2">Or wait for an other user to call you</h3>
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
