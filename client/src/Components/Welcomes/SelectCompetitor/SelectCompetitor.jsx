import React, { useEffect, useState } from "react"
import { socket } from "../../../socket"
import { SingleOnlineCompetitor } from "../OnlineCompetitor/SingleOnlineCompetitor"
import axios from "axios"
import "./selectCompetitor.css"


export const SelectCompetitor = ({selectedCompetitor, display}) =>{
    const [onlineUser, setOnlineUser] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    const [onlineUserList, setOnlineUserList] = useState([])

    useEffect(() =>{
        // Get online user from the server
        axios.get(`${process.env.REACT_APP_API_URL}/getUser`)
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
        socket.on("userDisconnect", (actifUsers) =>{
            setOnlineUser(actifUsers)
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
        setOnlineUserList(onlineUser.map((element) =>{
            if(element.socketId !== socket.id){                
                return( 
                <SingleOnlineCompetitor Competitor element={element} 
                selected={userSelect} unselectUser={unselectUser} key={element.socketId}/> 
                ) 
            }
        }))         
    }, [onlineUser])

    
    return(
        <section className={display ? "competitor-container" : "competitor-container non-active"}>
            <h3 className="title">Online Users</h3>
            <input type="text" placeholder="Search for an user" className="input-search"/>
            <div>
                {onlineUser.length > 1 ? onlineUserList : <span className="no-user-paragraph">
                    No user connected yet
                </span>}
            </div>
        </section>
    )
}