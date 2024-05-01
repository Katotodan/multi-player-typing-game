import React, {useContext} from "react"
import { ImageUrlContext } from "../../Context"

// JSS CSS START
import { createUseStyles } from "react-jss"
const styles = {
    div:{
        marginLeft: '3rem'
    },
    imgContainer:{
        position: "relative",
        cursor: "pointer"
    },
    img: {
        with: "5rem",
        height: "5rem",
        objectFit: "cover",
        marginRight: "1.5rem",
        borderRadius: "50%"
    },
    selected:{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        with: "100%",
        backgroundColor: "#87CEEB",
        opacity: 0.4
    }
}
const useStyles = createUseStyles(styles)
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
    const classes = useStyles()
    const {currentUserImg, setCurrentUserImg} = useContext(ImageUrlContext)
    const selectImg = (url)=>{
        setCurrentUserImg(url)
    }
    
    
    const images = avartarSrc.map((element, index) =>{
        return(
            <span className={classes.imgContainer}>
                <img src={element.url} key={index} 
                className={classes.img} onClick={() => selectImg(element.url)} alt="Avatar img"/>
                {currentUserImg === element.url && <span className={classes.selected}>✔</span>}
                
            </span>
            
        )
    })
    return (
        <div className={classes.div}>
            <h3>Select your Avatar</h3>
            {images}
        </div>
    )
}