import React, { useState, useRef, useEffect } from "react"
import { socket } from "../../socket"
import { Navigate } from "react-router-dom"
import styles from "./Navbar.module.css"
import { Menu } from 'lucide-react';

export const Navbar = ({username, imgUrl}) => {
    const [navToHome, setNavToHome] = useState(false)
    const menu = useRef(null)
    const [menuActive, setMenuActive] = useState(false)

    // useEffect(()=>{
    //     menu.current.addEventListener("blur", () => setMenuActive(false))
    // }, [])

    const disconnect = ()=>{
        socket.disconnect()
        // Navigate to home
        setNavToHome(true)

    }
    const showDropDown = ()=> setMenuActive(!menuActive)
    
    return(
        <nav>
            {navToHome && <Navigate to="/"/>}
            <div className="logo"><h2>Typing game</h2></div>
            <button className={`${styles.menu} ${menuActive ? styles.active : ""}`} onClick={showDropDown} ref={menu}><Menu/></button>
            
            <ul>
                <button onClick={disconnect}>Disconnect</button>
                <li>{username}</li>
                <li><img src={imgUrl} alt="Avatar image"/></li>
            </ul>
        </nav>
    )
}