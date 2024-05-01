import React, { useEffect, useState } from "react"
import { socket } from "../../socket"
import { OnlineCompetitor } from "./OnlineCompetitor"
import axios from "axios"

// JSS CSS START
import { createUseStyles } from "react-jss"
const styles = {
    section:{
        margin: "1rem 1rem 0.5rem 3rem",
        height: "75vh",
        width: "17rem",
        overflowX: "hidden",
        overflowY: "auto",
        position: "relative",
        top: 0,
        left: 0,
        
    },
    h3:{
        position: "fixed",
        width: "16rem",
        backgroundColor: "white"
    },
    input : {
        width: "95%",
        height: "1.5rem",
        padding: "0 0.5rem",
        borderRadius: 5,
        margin: "2rem 0 1rem 0"
    }
}

const useStyles = createUseStyles(styles)



export const SelectCompetitor = ({selectedCompetitor}) =>{
    const classes = useStyles()
    const [onlineUser, setOnlineUser] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    
    useEffect(() =>{
        // Get online user from the server
        axios.get("http://localhost:5000/getUser")
        .then((res) => setOnlineUser(res.data))
        .catch((err) => console.log("Error" + err))

    }, [])

    useEffect(() =>{
        selectedCompetitor(selectedUser)
    }, [selectedUser])

    socket.on("newUser", (data) =>{
        setOnlineUser([
            ...onlineUser,
            data
        ])
    })
    socket.on("userDisconnect", (data) =>{
        console.log(data.username + "disconnect")
    })

    const userSelect = (user) =>{
        setSelectedUser([
            ...selectedUser,
            user.socketId
        ])  
    }
    const unselectUser = (socketId) =>{
        const filteredUser = selectedUser.filter(id => id !== socketId)
        setSelectedUser(filteredUser)
    }

    
    const onlineUserList = onlineUser.map((element, index) =>{
            if(element.socketId !== socket.id){
                return( 
                <OnlineCompetitor element={element} index={index} 
                selected={userSelect} unselectUser={unselectUser}/> 
                ) 
            } 
            return(<></>)    
    })
    return(
        <section className={classes.section}>
            <h3 className={classes.h3}>Online Users</h3>
            <input type="text" placeholder="Search for an user" className={classes.input}/>
            <section>
                {onlineUser.length === 0 && <span>No user connected yet</span>}
                {onlineUserList}
            </section>

        </section>
    )
}