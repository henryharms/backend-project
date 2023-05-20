import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Navigate,  useParams } from "react-router-dom"


function bigClick(name){
  console.log(name)
}






function Game(props){
    return(
      <div className="Game">
        <h1>{props.value}</h1>
        <h1>{props.name}</h1>
        <img src="https://www.williamgee.co.uk/wp-content/uploads/2020/04/Jacket-Buttons-Black-William-Gee-UK.jpg" className="button" alt='Button'/>
      </div>
    )
}








function App() {
  // const [count, setCount] = useState(0)
  let { name } = useParams();

  return (
    <div className="App">
      <Game value={1000} name={name}/>
    </div>
  )
}

export default App
