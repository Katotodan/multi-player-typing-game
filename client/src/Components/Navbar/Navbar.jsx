import React, { useState} from "react"
import { socket } from "../../socket"
import { Navigate } from "react-router-dom"
import styles from "./Navbar.module.css"
import { Menu } from 'lucide-react';

export const Navbar = ({username, imgUrl}) => {
    const [navigateToHome, setNavigateToHome] = useState(false)
    const [isActive, setIsActive] = useState(false);

    const disconnect = ()=>{
        socket.disconnect()
        // Navigate to home
        setNavigateToHome(true)

    }
    const showDropDown = ()=> setIsActive((prev) => !prev)
    
    return(
        <nav>
            {navigateToHome && <Navigate to="/"/>}
            <div className={styles.logo}><h2>Typing game</h2></div>
            <button onClick={showDropDown} className={styles.menu}><Menu/></button>
            
            <ul className={isActive ? styles.active : ""}>
                <button onClick={disconnect}>Disconnect</button>
                <li>{username}</li>
                <li><img src={imgUrl} alt="Avatar image"/></li>
            </ul>
        </nav>
    )
}