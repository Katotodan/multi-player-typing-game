import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./sendRequest.css"

export const SendRequest = ({competitor, sendRequestFnc}) => {
    const [disableRequestBtn, setDisableRequestBtn] = useState(true)
    useEffect(()=>{
        competitor.length > 0 ? setDisableRequestBtn(false) : setDisableRequestBtn(true)         
    }, [competitor])
    
  return (
    <div className="send-request">
        <button
        onClick={sendRequestFnc}
        disabled={disableRequestBtn}
        > Send Request</button>
        <button>
            <Link to="/start" className="link" >Race Alone</Link>
        </button> 
    </div>
  )
}
