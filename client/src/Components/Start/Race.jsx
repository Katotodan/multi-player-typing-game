import React,{useState, useContext} from "react";
import { SingleRace } from "./SingleRace";
import car1 from "../../Assets/car1.png"
import car2 from "../../Assets/car2.png"
import car3 from "../../Assets/car3.png"
import { AllCompetitors, ImageUrlContext } from "../../Context";
import { socket } from "../../socket";


// JSS CSS START
import { createUseStyles } from "react-jss"
const styles = {
    div:{
        padding: "0.5rem",
        marginTop: "1rem"
    }
}
const useStyles = createUseStyles(styles)

export const Race = ({percentage}) =>{
    const {allCompetitors, setAllCompetitors} = useContext(AllCompetitors)
    const {currentUserImg} = useContext(ImageUrlContext)


    const classes = useStyles()

    // Receiving the percentage of every user
    socket.on("receivePercentag", ([formSocketId, percentage]) =>{
        const newCompetitorsInfo = allCompetitors.map(element =>{
            if(element.socketId !== formSocketId){
                return element
            }else{
                return(
                    {"socketId":element.socketId, 
                    "callerName": element.callerName, 
                    "callerImg":element.callerImg, 
                    "position": percentage
                })
            }
        })
        setAllCompetitors(newCompetitorsInfo)
    })

    const competitors = allCompetitors.map((element, index) =>{
        return(
            <SingleRace image={element.callerImg} percentage={element.position} 
            username={element.callerName} key={index}/>
        )
    })
    return(
        <div className={classes.div}>
            <SingleRace image={currentUserImg} percentage={percentage} username="You"/>
            {competitors}
        </div>
    )
} 