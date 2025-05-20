import React,{useContext, useEffect} from "react";
import { SingleRace } from "./SingleRace";
import { AllCompetitors, ImageUrlContext } from "../../Context";
import { socket } from "../../socket";


// JSS CSS START
import { createUseStyles } from "react-jss"
const styles = {
    div:{
        padding: "0.5rem 2rem",
        marginTop: "1rem"
    }
}
const useStyles = createUseStyles(styles)

export const Race = ({percentage}) =>{
    const {allCompetitors, setAllCompetitors} = useContext(AllCompetitors)
    const {currentUserImg} = useContext(ImageUrlContext)


    const classes = useStyles()

    // Receiving the percentage of every user
    useEffect(()=>{
        const onReceivePercentage = ([formSocketId, percentage]) =>{
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
        }

        const onSendBackCompetitors = (joinCompetitors) =>{   
            // Filtering competitors to exclude you
            const currentCompetitor = joinCompetitors.filter(element => socket.id !== element.socketId)
            console.log("Competitor back", currentCompetitor);            
            setAllCompetitors(currentCompetitor) 
        }

        socket.on("receivePercentage", onReceivePercentage)
        socket.on("sendBackCompetitors", onSendBackCompetitors)
        return () => {
            socket.off("receivePercentage", onReceivePercentage)
        }
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