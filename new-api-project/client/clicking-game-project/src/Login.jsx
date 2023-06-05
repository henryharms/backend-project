import { useState } from 'react'
import './App.css'
import { Navigate, useNavigate } from "react-router-dom"



const apiUrl = 'http://localhost:3000'


async function fetchPlayerData(name){
  const data = await fetch(`${apiUrl}/player-name/${name}`)
  return data.json()
}

async function createPlayer(name) {
  console.log("new player created")
  const data = {name, totalClicks:0}
  const response = await fetch(`${apiUrl}/player-add`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
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


function Login() {
  const [inputValue, setInputValue] = useState(0)
  const navigate = useNavigate();

  function formHandler(event) {
    event.preventDefault();
    console.log(inputValue);
    fetchPlayerData(inputValue)
    .then( res => {
      console.log(res)
      if (res != null) {
        // get user, navigate to page
        navigate(`/game/${inputValue}`)
      } else {
        createPlayer(inputValue)
        .then( () => {
          console.log("new player created!")
          navigate(`/game/${inputValue}`)
        }).catch(err => {
          console.error(err)
        })
      }


    }).catch(err => {
      console.error(err)
    })
    //do all the backend stuff now
    // read to check if name exists already. if not, create new default player. if so, read values for it and send to game




 
  }

  return (
    <div className="Login">

        <h1>enter name</h1>
        <form onSubmit={formHandler}>
            <input onChange={(e) => setInputValue(e.target.value)} />
        </form>
    </div>
  )
}

export default Login
