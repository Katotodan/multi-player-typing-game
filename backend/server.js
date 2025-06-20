const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors')
require("dotenv").config()

// Importing process module for showing the warning 
const process = require('process')

const app = express();
const PORT = process.env.PORT

app.use(cors({
  origin: process.env.FRONTEND_URL
}))
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL
  }
}); 
      
let onlineUser = []
 

io.on('connection', (socket) => {
  socket.on("addUser", (data, callback) =>{
    onlineUser.push({
      "socketId": socket.id,
      "username": data.username,      
      "url": data.userImg
    })
    // Respond with acknowledgment
    callback({ status: "ok"})

    socket.broadcast.emit("newUser", {
      "socketId": socket.id,
      "username": data.username,
      "url": data.userImg
    })
    
    
  })

  socket.on("request", ([competitors, senderInfo]) =>{
    for(let competitor of competitors){
      // Calling 
      io.to(competitor).emit('call', senderInfo)
    }
    // Create a room and add the caller to the room
    socket.join(senderInfo.socketId + " room") // The name of the room is equal to the sender socket id
  })     

  socket.on("callAccepted", ([competitorInfo, callerId]) =>{
    io.to(callerId).emit("competitor_join", competitorInfo)
    socket.join(callerId + " room")
  })   
  
  socket.on("sendCompetitor", (competitors) =>{    
    for(let competitor of competitors){
      socket.to(competitor.socketId).emit("sendBackCompetitors", competitors)

    } 
  })
  socket.on("sendPercentage", ([formSocketId, percentage, roomId]) =>{
    io.to(roomId +" room").emit("receivePercentage", [formSocketId, percentage])
  })       

  socket.on("leaveRoom", (socket_id) =>{
    const roomSet = socket.rooms
    for (const item of roomSet) {
      if(item.includes("room")){
        socket.leave(item);        
      }
    }
  })
  socket.on('disconnect', () => {
    
    onlineUser = onlineUser.filter(user => user.socketId !== socket.id)
    socket.broadcast.emit("userDisconnect", onlineUser)
    
  })

  
});    
app.get("/getUser", (req, res) =>{
  res.send(onlineUser)
})   


server.listen(PORT || 5000, () => {
  console.log('server running on port ' + process.env.PORT);
});

// Event 'warning'  
process.on('warning', (warning) => { 
  console.warn("warning stacktrace - " + warning.stack) 
});
