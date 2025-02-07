import React,{useState, useContext, useEffect} from "react";
import { Race } from "../Components/Start/Race";
import { RaceText } from "../Components/Start/TextRace";
import { RandomTextIndexContext, ImageUrlContext, UserNameContext } from "../Context";
import { Navbar } from "../Components/Navbar/Navbar";
import { Navigate } from "react-router-dom";

export const Start = () =>{
    const [percentage, setPercentage] = useState(0)
    const {randomTextIndex} = useContext(RandomTextIndexContext)
    const {currentUser} = useContext(UserNameContext)
    const {currentUserImg} = useContext(ImageUrlContext)
    const [navigateUser, setNavigateUser] = useState(false) // It navigate an unkown user back to home page


    // Checking if username exist
    useEffect(()=>{
        if(!currentUser || !currentUserImg){
            setNavigateUser(true)
        }
    }, [])

    const currentPercentage = (currentPercentage) =>{
        setPercentage(currentPercentage)
    }
    return(
        <main>
            <Navbar username={currentUser} imgUrl={currentUserImg}/>
            <Race percentage={percentage}/>
            <RaceText yourPercentage={currentPercentage} randomTextIndex ={randomTextIndex}/>
            {navigateUser && <Navigate to="/"/>}
        </main>
    )
}