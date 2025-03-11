import React, {useContext, useEffect} from "react"
import { ImageUrlContext } from "../../../Context"
import "./selectAvatar.css"


const avartarSrc = [
    {
        url: "https://www.premadegraphics.com/img_1/23/Female-Avatar-2.png",
    },
    {
        url: "https://www.premadegraphics.com/img_1/23/Female-Avatar-3.png",
    },
    {
        url: "https://cdn.vectorstock.com/i/1000v/02/13/beautiful-woman-avatar-vector-15490213.jpg",
    },
    {
        url: "https://images.onlinelabels.com/images/clip-art/GDJ/Female%20Avatar%205-277089.png",
    },
    {
        url: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png",
    },
    {
        url: "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_1280.png",
    },
    {
        url: "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png",
    },
    {
        url: "https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-512.png",
    }
] 

export const SelectAvatar = () =>{
    const {currentUserImg, setCurrentUserImg} = useContext(ImageUrlContext)
    useEffect(()=>{setCurrentUserImg(null)}, [])
    const selectImg = (url)=>{
        if(currentUserImg !== url){
            setCurrentUserImg(url)
        }else{
            setCurrentUserImg("")
        }
        
    }
       
    const images = avartarSrc.map((element, index) =>{
        return(
            <button className="avatart-btn" key={index} onClick={() => selectImg(element.url)}>
                <img src={element.url} key={index} 
                className="avatar-img" alt="Avatar img"/>
                {currentUserImg === element.url && <span className="selected">✔</span>}
            </button>
            
        )
    })
    return (
        <div className="avatar-container">
            <h3>Select your Avatar</h3>
            <div className="avatar-img-container">{images}</div>
        </div>
    )
}