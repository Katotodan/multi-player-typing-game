import React, { useState } from "react";
import "./singleOnlineCompetitor.css"

export const SingleOnlineCompetitor = ({element, selected, unselectUser}) =>{
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
        <div className="single-competitor-container" onClick={selectCompetitor}>
            <img src={element.url} alt={element.username} />
            <p>{element.username}</p>
            {isSelected ? <p>✔</p> : <p></p>}  
        </div>
)
}