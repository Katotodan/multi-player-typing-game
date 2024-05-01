import React,{useState} from "react";
import { Race } from "../Components/Start/Race";
import { RaceText } from "../Components/Start/TextRace";

export const Start = () =>{
    const [percentage, setPercentage] = useState(0)
    const currentPercentage = (currentPercentage) =>{
        setPercentage(currentPercentage)
    }
    return(
        <main>
            <Race percentage={percentage}/>
            <RaceText yourPercentage={currentPercentage}/>
        </main>
    )
}