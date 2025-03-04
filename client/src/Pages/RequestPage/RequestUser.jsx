import React, {useContext, useEffect, useState} from "react";

import { Request } from "../../Components/Welcomes/Request/Request";
import { SelectCompetitor } from "../../Components/Welcomes/SelectCompetitor";
import { Navbar } from "../../Components/Navbar/Navbar";
import { UserNameContext, ImageUrlContext } from "../../Context";
import { Navigate } from "react-router-dom";
import styles from "./RequestUser.module.css"

export const RequestUser = () =>{

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
            <div className={styles.div}>
                <SelectCompetitor selectedCompetitor = {selectedCompetitor}/>
                <Request competitor = {competitor} />
            </div>
            {navigateUser && <Navigate to="/"/>}
        </>
        
    )
}