import React, {useEffect, useRef, useState, useContext} from "react";
import { socket } from "../../socket";
import { CallDialog } from "./CallDialog";
import { AllCompetitors, UserNameContext, ImageUrlContext, RoomId } from "../../Context";
import { Navigate } from "react-router-dom";

// JSS CSS START
import { createUseStyles } from "react-jss"
const styles = {
    container:{
        width: "70%",
        height: "75vh",
        paddingTop: "3rem",
        position: "relative"
    },
    h2:{
        textAlign: "center",
        marginBottom: "1.5rem"
    },
    button:{
        position: "absolute",
        bottom: "2rem",
        left: "2rem",
        padding: "0.5rem 1rem",
        cursor: "pointer"
    },
    request:{
        fontSize: "1.5rem",
        marginTop: "4rem",
        textAlign: "center"
    },
    validRequest:{
        fontSize: "1.5rem",
        textAlign: "center",
        marginTop: "2rem"
    }
    
   
}

const useStyles = createUseStyles(styles)

export const Request = ({competitor}) =>{
    const classes = useStyles()
    const [sendRequest, setSendRequest] = useState(false) // Show the requesting ... message on the screen
    const [validetedRequest, setValidetedRequest] = useState(false)
    const [desableBtn, setDesableBtn] = useState(true)
    const [caller, setCaller] = useState(false)
    const [displayDialog, setDisplayDialog] = useState(false)

    const [noUserJoin, setNoUserJoin] = useState(true)
    const [navigateToPlaypage, setNavigateToPlaypage] = useState(false)

    // Context
    const {allCompetitors, setAllCompetitors} = useContext(AllCompetitors)
    const {currentUser} = useContext(UserNameContext)
    const {currentUserImg} = useContext(ImageUrlContext)
    const {setRoomId} = useContext(RoomId)

    let joinnedCompetitors = [] // Array of joinned competitors

    useEffect(() =>{
        // If a competitor has been selected, it will enable the request button
        if(competitor.length === 0){
            // Desable button
            setDesableBtn(true)

        }else{
            // enable button
            setDesableBtn(false)
        }
    }, [competitor])

    const sendRequestFnc = () =>{
        socket.emit("request", 
        [competitor,{"socketId":socket.id, "callerName": currentUser, "callerImg":currentUserImg, "position": 0}])
        setSendRequest(true)
        setTimeout(() => { 
            setSendRequest(false)  // Hide the show request... message on the screen
            if(joinnedCompetitors.length > 0){
                socket.emit("sendCompetitor", joinnedCompetitors)
                setAllCompetitors(joinnedCompetitors)
                joinnedCompetitors = []
                setRoomId(socket.id)
                setNavigateToPlaypage(true)
                
            }

            
        }, 10000);
    }
    socket.on("call", (callerInfo) =>{
        setDisplayDialog(true)
        setCaller(callerInfo)
        setTimeout(() => {
            // Close dialog
            setDisplayDialog(false)
        }, 10000);
    })

    socket.on("competitor_join", (competitor) =>{
        joinnedCompetitors.push(competitor)
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

    


    return(
        <div className={classes.container}>
            <h2 className={classes.h2}>Select an online user in order to be able to play with </h2>
            <h2 className={classes.h2}>Or wait for an other user to call you</h2>
            {sendRequest && <p className={classes.request}>Requesting ....</p>}
            {validetedRequest && 
                <p className={classes.validRequest}>
                    <span>Request has been validated</span> <br /> <br />
                    <span>Game start in 5 sec</span>
                </p>
            }

            <CallDialog displayDialog={displayDialog} caller={caller}/>
            
            <button className={classes.button} 
            id={desableBtn ? "desablebtn" : "enableBtn"} onClick={sendRequestFnc}>
                Send Request
            </button>
            {navigateToPlaypage && <Navigate to="/start"/>}
            
            
        </div>
    )
}

