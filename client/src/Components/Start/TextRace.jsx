import React,{useEffect, useState, useRef, useContext} from "react";
import data from "../../Components/Start/text.json"
import { socket } from "../../socket";
import { RoomId, AllCompetitors } from "../../Context";
import {Navigate } from "react-router-dom";


// JSS CSS START
import { createUseStyles } from "react-jss"
const styles = {
    container: {
        padding: "1rem"
    },
    input: {
        width: "100%",
        height: "2rem",
        padding: "0.25rem 0.5rem",
        borderRadius: 5,
        fontSize: "1.2rem",
        marginTop: "1rem"
    },
    link:{
        textDecoration:"none",
        color: "black",
        backgroundColor: "#eee",
        display: "inline-block",
        padding:" 0.5rem 1rem",
        marginTop: "2rem"
    }
}
const useStyles = createUseStyles(styles)


export const RaceText = ({yourPercentage, randomTextIndex}) =>{
    const classes = useStyles()
    const str = useRef(null)
    const [percentage, setPercentage] = useState(0)
    const {roomId} = useContext(RoomId)
    const [inputText, setInputText] = useState("")
    const [text, setText] = useState("")
    const [splittedtext, setSplittedText] = useState(text.split(''))
    const [navigateToRequest, setNavigateToRequest] = useState(false)

    const {allCompetitors, setAllCompetitors} = useContext(AllCompetitors)
    
    useEffect(() =>{
        if(randomTextIndex){
            setText(data[randomTextIndex]?.text)
        }else{
            // You are alone in this race
            setText(data[Math.floor(Math.random() * 16)]?.text)

        }        
    },[])

    useEffect(() =>{
        setSplittedText(text.split(''))
    }, [text])

    useEffect(() =>{
        yourPercentage(percentage)
        socket.emit("sendPercentage", ([socket.id, percentage, roomId]))
    }, [percentage])

    const inData = splittedtext.map((el, index) => (
        <span key={index}>{el}</span>
    ))
    
    
    const gameWon = () =>{
        // propose to start the race
        let occupiedPlace = 1
        for(let campetitor of allCompetitors){
            if(campetitor.position === 100){
                occupiedPlace++
            }
        }
        alert("Game over, you have the " + occupiedPlace + "place")
    }

    const handleChange = (e) => {
        setInputText(e.target.value)
        const inputLength = e.target.value.length
       
        if(e.target.value === text.slice(0, inputLength)){
            for (let child of str.current.children){
                child.style.color = "black"
            }
            setPercentage((inputLength / splittedtext.length) * 100)
            if(e.target.value === text){
                gameWon()
            }
        }else{
            str.current.children[inputLength - 1].style.color = "red"
        }
    }
    const leaveRace = () =>{
        // Leave room        
        socket.emit("leaveRoom", socket.id)
        // Clear all competitors
        setAllCompetitors([])
        // Go back to the request page
        setNavigateToRequest(true)
    }
    return(
        <div className={classes.container}>
            <div className="text" ref={str}>{inData}</div>
            <input type="text" className={classes.input} autocomplete="autocomplete_off_randString"
            placeholder="Type here" value={inputText} onChange={handleChange}/>

            <button className={classes.link} onClick={leaveRace}>
                {percentage === 100 ? "Restart game" : "Leave the race"}
            </button>
            {navigateToRequest && <Navigate to="/request"/>}
            
        </div>  
    )
}

