import io from "socket.io-client";
import { useEffect, useState } from "react";
import "./App.css"

const socket =  io("/");

function App() {
  const [Message, setMessage] = useState("");
  const [histori, setHistori] = useState([]);
  function HandleSubmit(e){
    e.preventDefault();
    socket.emit("message", Message);
    addMessage(Message);
  }

  useEffect(()=>{
    socket.on('message', message =>{
      addMessage(message);
    })
    return ()=>{
      socket.off('message');
    }
  },[])

  function addMessage(m: String){
    if(histori[histori.length - 1] === m){
      null
    }else{
      setHistori((state) => [...state, m])
    }
  }

  return (
    <div className="MainDiv" >
      <div className="DivNothing" />
      <div className="DivChat" >
        <form onSubmit={HandleSubmit} >
        <div className="Title" >
          <h2>Chat en linea</h2>
        </div>
        <div className="Chat" >
          {
            histori.map((data)=>(
              <h3>{data}</h3>
            ))
          }
        </div>
        <div className="InputChat" >
          <input placeholder="escribe..." onChange={({target})=>{setMessage(target.value)}}  />
          <button type="submit" >Enviar</button> 
        </div>
        </form>
      </div>
      <div className="DivName" >
        <h2>Escribe tu nombre</h2>
        <input placeholder="kevin..." />
      </div>
    </div>
  )
}

export default App
