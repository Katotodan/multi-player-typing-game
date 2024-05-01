import React from "react"

// JSS CSS START
import { createUseStyles } from "react-jss"
const styles = {
    nav:{
        display: "flex",
        justifyContent: "space-between",
        height: "5rem",
        backgroundColor: "#87CEEB",
        padding: "1rem 4rem",
        color: "white",
        fontSize: "1.2rem",
        alignItems: "center",
    },
    ul:{
        display: "flex",
        alignItems: "center",
        listStyleType: 'none',
        gap: "2rem"
    },
    img:{
        width: "4rem",
        height: "4rem",
        borderRadius: "50%",
        objectFit: "cover"

    }
}
const useStyles = createUseStyles(styles)

export const Navbar = ({username, imgUrl}) => {
    const classes = useStyles()
    
    return(
        <nav className={classes.nav}>
            <div className="logo">Typing game</div>
            <ul className={classes.ul}>
                <li>{username}</li>
                <li><img src={imgUrl} alt="Avatar image" className={classes.img}/></li>
            </ul>
        </nav>
    )
}