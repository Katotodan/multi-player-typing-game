import React, {useContext, useEffect, useState} from "react";
import { Request } from "../Components/Welcomes/Request";
import { SelectCompetitor } from "../Components/Welcomes/SelectCompetitor";
import { Navbar } from "../Components/Navbar";
import { UserNameContext, ImageUrlContext } from "../Context";
import { Navigate } from "react-router-dom";
import { socket } from "../socket";
// JSS CSS START
import { createUseStyles } from "react-jss"
const styles = {
    div: {
        display: "flex",
        justifyContent: "space-between"
    }
}
const useStyles = createUseStyles(styles)

export const RequestUser = () =>{
    const classes = useStyles()
    // Context
    const {currentUser} = useContext(UserNameContext)
    const {currentUserImg} = useContext(ImageUrlContext)
    const [competitor, setCompetitor] = useState([])
    const [navigateUser, setNavigateUser] = useState(false) // It navigate an unkown user back to home page

    // Checking if username exist
    useEffect(()=>{
        if(!currentUser || !currentUserImg){
            setNavigateUser(true)
        }
    }, [])

    const selectedCompetitor = (competitors) =>{
        setCompetitor(competitors)
    }

    return(
        <>
            <Navbar username={currentUser} imgUrl={currentUserImg}/>
            <div className={classes.div}>
                <SelectCompetitor selectedCompetitor = {selectedCompetitor}/>
                <Request competitor = {competitor} />
            </div>
            {navigateUser && <Navigate to="/"/>}
        </>
        
    )
}