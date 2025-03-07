import React, {useEffect, useRef, useState, useContext} from "react";
import { socket } from "../../../socket";
import { CallDialog } from "../CallDialog/CallDialog";
import { AllCompetitors, UserNameContext, ImageUrlContext, RoomId, RandomTextIndexContext } from "../../../Context";
import { Link, Navigate } from "react-router-dom";
import "./request.css"


export const Request = ({competitor, display, isRequestSent}) =>{
    const [sendRequest, setSendRequest] = useState(false) // Show the requesting ... message on the screen
    const [validetedRequest, setValidetedRequest] = useState(false)
    const [desableBtn, setDesableBtn] = useState(true)
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
                socket.emit("sendCompetitor", joinnedCompetitors)
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
    
    socket.on("call", (callerInfo) =>{
        setDisplayDialog(true)
        setCaller(callerInfo)
        callfn()
        
    })
    socket.on("competitor_join", (competitor) =>{
        joinnedCompetitors.push(competitor)
        setSendRequest(false)
        setValidetedRequest(true)
    })
    // Receiving competitors from the server
    socket.on("sendBackCompetitors", (competitors) =>{
        // Filtering competitors to exclude you
        let competitor = competitors.filter(element => socket.id !== element.socketId)
        competitor.push(caller)
        setAllCompetitors(competitor)

        // Navigate to start playing
        setNavigateToPlaypage(true)
    })

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
