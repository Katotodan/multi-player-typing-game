import './App.css';
import React, {useState} from 'react';
import { Welcome } from './Pages/Wecome/Welcome';
import { Start } from './Pages/Start';
import { RequestUserPage } from './Pages/RequestPage/RequestUserPage';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom"
import { UserNameContext, ImageUrlContext, AllCompetitors, RoomId, RandomTextIndexContext} from './Context';



function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [currentUserImg, setCurrentUserImg] = useState(null)
  const [allCompetitors, setAllCompetitors] = useState([])
  const [roomId, setRoomId] = useState(null)
  const [randomTextIndex, setRandomTextIndex] = useState(null)
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

            <RandomTextIndexContext.Provider
            value={{
              randomTextIndex, 
              setRandomTextIndex
            }}>


              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Welcome/>} />
                  <Route path="/request" element={<RequestUserPage/>} />
                  <Route path="/start" element={<Start/>} />
                </Routes>
              </BrowserRouter>

              
            </RandomTextIndexContext.Provider>
          </RoomId.Provider>
        </AllCompetitors.Provider>
      </ImageUrlContext.Provider>
    </UserNameContext.Provider>
    
  ); 
}

export default App;

