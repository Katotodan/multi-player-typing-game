import './App.css';
import React, {useState} from 'react';
import { Welcome } from './Pages/Welcome';
import { Start } from './Pages/Start';
import { RequestUser } from './Pages/RequestUser';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom"
import { UserNameContext, ImageUrlContext, AllCompetitors, RoomId } from './Context';



function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [currentUserImg, setCurrentUserImg] = useState(null)
  const [allCompetitors, setAllCompetitors] = useState([])
  const [roomId, setRoomId] = useState(null)
  return (
    <UserNameContext.Provider
      value={{
        currentUser,
        setCurrentUser
      }}
    >
      <ImageUrlContext.Provider
        value={{
          currentUserImg,
          setCurrentUserImg
        }}
      >
        <AllCompetitors.Provider
          value={{
            allCompetitors,
            setAllCompetitors
          }}
        >
          <RoomId.Provider
          value={{
            roomId,
            setRoomId
          }}>

            
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Welcome/>} />
                <Route path="/request" element={<RequestUser/>} />
                <Route path="/start" element={<Start/>} />
              </Routes>
            </BrowserRouter>


          </RoomId.Provider>
        </AllCompetitors.Provider>
      </ImageUrlContext.Provider>
    </UserNameContext.Provider>
    
  ); 
}

export default App;

