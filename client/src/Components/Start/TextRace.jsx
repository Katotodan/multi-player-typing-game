import React,{useEffect, useState, useRef, useContext} from "react";
import data from "../../Components/Start/text.json"
import { socket } from "../../socket";
import { RoomId } from "../../Context";


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
    }
}
const useStyles = createUseStyles(styles)


export const RaceText = ({yourPercentage}) =>{
    const classes = useStyles()
    const str = useRef(null)
    const [percentage, setPercentage] = useState(0)
    const {roomId} = useContext(RoomId)
    const [inputText, setInputText] = useState("")
    const [text, setText] = useState(data[Math.floor(Math.random() * 16)].text)
    const [splittedtext, setSplittedText] = useState(text.split(''))
    

    useEffect(() =>{
        yourPercentage(percentage)
        socket.emit("sendPercentage", ([socket.id, percentage, roomId]))
    }, [percentage])

    const inData = splittedtext.map((el, index) => (
        <span key={index}>{el}</span>
      ))
    
    
    const gameWon = () =>{
        alert("You win")
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
    return(
        <div className={classes.container}>
            <div className="text" ref={str}>{inData}</div>
            <input type="text" className={classes.input} 
            placeholder="Type here" value={inputText} onChange={handleChange}/>
        </div>  
    )
}

// Moving car and ajusting the %