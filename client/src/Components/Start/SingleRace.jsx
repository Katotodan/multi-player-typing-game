import React,{useRef, useEffect} from "react";

// JSS CSS START
import { createUseStyles } from "react-jss"
const styles = {
    singleRaceContainer:{
        marginBottom: "1rem",
    },
    imgContainer:{
        marginLeft: "-2%",
        position: "relative",
        width: "4rem",
        height: "3.2remrem",
    },
    span: {
        position: "absolute",
        top: "0",
        right: "0",

    },
    img:{
        width: "3rem",
        height: "3rem",
        objectFit: "cover",
    },
    line:{
        width: "100%",
        borderBottom: "4px dashed black"
    }
   
} 
const useStyles = createUseStyles(styles)



export const SingleRace = ({image, percentage, username}) =>{
    const classes = useStyles()
    const imgContainer = useRef(null)
    useEffect(() =>{
        imgContainer.current.style.marginLeft = (percentage - 2 )+ "%"
    }, [percentage])

    return(
        <div className={classes.singleRaceContainer}>
            <div className={classes.imgContainer} ref={imgContainer}>
                <img src={image} alt="" className={classes.img}/>
                <span className={classes.span}>{username}</span>
            </div>
            <div className={classes.line} />
        </div>
    )
}