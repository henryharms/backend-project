import React from 'react';
import { useState, useRef, useEffect } from 'react'
import './App.css'
import { Navigate,  useParams } from "react-router-dom"


const apiUrl = 'http://localhost:3000'


async function updatePlayer(data) {
  console.log("updated player")
  const response = await fetch(`${apiUrl}/player-update-name/${data.name}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}





function updateClick(name, val){
  //console.log('update click')
  let data = {name:name, totalClicks:val, timeSinceClick:0}
  console.log(data)
  updatePlayer(data).then(console.log("new click thing "+String(data.totalClicks)))

}





function Game(props){
    return(
      <div className="Game">
        <h1>{props.value}</h1>
        <h1>{props.name}</h1>
        <img src="https://www.williamgee.co.uk/wp-content/uploads/2020/04/Jacket-Buttons-Black-William-Gee-UK.jpg" className="button" alt='Button' onClick={()=>props.ClickFunction()}/>
      </div>
    )
}

async function fetchPlayerData(name){
  const data = await fetch(`${apiUrl}/player-name/${name}`)
  return await data.json()
}



function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


function App() {
  let { name } = useParams();
  const [val, setVal] = useState(null)
  

  React.useEffect(() => {
    fetchPlayerData(name)
      .then(res => setVal(res.totalClicks));
  }, []);

  useInterval(() => {
    console.log(val);
    updateClick(name, val);
  }, 3000);

  return (
    <div className="App">
      <Game value={val} name={name} ClickFunction={()=>setVal(val+1)}/>
    </div>
  )
}

export default App
