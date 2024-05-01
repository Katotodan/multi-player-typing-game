import React, { useState } from "react";

// JSS CSS START
import { createUseStyles } from "react-jss"
const styles = {
    div: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "15rem",
        marginBottom: "1rem",
        cursor: "pointer",
        borderRadius: 5,
        '&:hover': {
            backgroundColor: '#eee'
        }
        
    },
    img: {
        with: "4rem",
        height: "4rem",
        objectFit: "cover",
        marginRight: "1rem",
        borderRadius: "50%"
    },
}

const useStyles = createUseStyles(styles)



export const OnlineCompetitor = ({element, index, selected, unselectUser}) =>{

    const classes = useStyles()
    const [isSelected, setIsSelected] = useState(false)

    const selectCompetitor = () =>{
        setIsSelected(!isSelected)
        if(isSelected === false){
            selected(element)
        }else{
            unselectUser(element.socketId)
        }
        
    }

    return(
        <div className={classes.div} key={index} onClick={selectCompetitor}>
            <img src={element.url} alt={element.username} className={classes.img} />
            <p>{element.username}</p>
            {isSelected ? <p>✔</p> : <p></p>}  
        </div>
)
}