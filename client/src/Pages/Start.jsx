import React,{useState, useContext} from "react";
import { Race } from "../Components/Start/Race";
import { RaceText } from "../Components/Start/TextRace";
import { RandomTextIndexContext, ImageUrlContext, UserNameContext } from "../Context";
import { Navbar } from "../Components/Navbar";

export const Start = () =>{
    const [percentage, setPercentage] = useState(0)
    const {randomTextIndex} = useContext(RandomTextIndexContext)
    const {currentUser} = useContext(UserNameContext)
    const {currentUserImg} = useContext(ImageUrlContext)

    const currentPercentage = (currentPercentage) =>{
        setPercentage(currentPercentage)
    }
    return(
        <main>
            <Navbar username={currentUser} imgUrl={currentUserImg}/>
            <Race percentage={percentage}/>
            <RaceText yourPercentage={currentPercentage} randomTextIndex ={randomTextIndex}/>
        </main>
    )
}