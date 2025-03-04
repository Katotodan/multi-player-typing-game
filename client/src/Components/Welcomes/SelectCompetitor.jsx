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
    const [onlineUserList, setOnlineUserList] = useState([])

    useEffect(() =>{
        // Get online user from the server
        axios.get("http://localhost:5000/getUser")
        .then((res) => {            
            setOnlineUser(res.data)
        })
        .catch((err) => console.log("Error" + err))
    }, [])

    useEffect(() =>{
        // Socket config
        socket.on("newUser", (data) =>{   
            setOnlineUser((prev) => [...prev, data])
         
        })
        socket.on("userDisconnect", (users) =>{
            setOnlineUser([])
        })
        return () =>{
            socket.off("userDisconnect", (users) =>{setOnlineUser([]) })
            socket.off("newUser", (data) =>{
                setOnlineUser([])
            })
        }
    }, [])

    useEffect(() =>{
        selectedCompetitor(selectedUser)
    }, [selectedUser])

    

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
    

    
    useEffect(()=>{
        setOnlineUserList(onlineUser.map((element,index) =>{
            if(element.socketId !== socket.id){                
                return( 
                <OnlineCompetitor element={element} index={index} 
                selected={userSelect} unselectUser={unselectUser} key={element.socketId}/> 
                ) 
            }
        }))         
    }, [onlineUser])

    
    return(
        <section className={classes.section}>
            <h3 className={classes.h3}>Online Users</h3>
            <input type="text" placeholder="Search for an user" className={classes.input}/>
            <div>
                {onlineUser.length > 1 ? onlineUserList : <span>No user connected yet</span>}
            </div>
        </section>
    )
}