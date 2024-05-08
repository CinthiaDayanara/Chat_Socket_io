import './App.css';
import io from 'socket.io-client'
import { useState, useEffect } from 'react'


//const socket = io('http://localhost:4000')
const socket = io()

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message', message)
    const newMessage = {
      body: message,
      from: "Me"
    }
    setMessages([newMessage, ...messages])
    setMessage('')
  }

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages])
    };
    socket.on('message', receiveMessage);

    return () => {
      socket.off('message', receiveMessage);
    };
  }, [messages]);




  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center ">
      <form onSubmit={handleSubmit} className='rounded-md border-x-4 bg-zinc-700 p-10'>
        <h1 className="text-3x1 font-bold my-2 text-violet-300">Chat Distrubuida</h1>
        <input type="text" onChange={e => setMessage(e.target.value)}
          value={message}
          className='text-align:down left rounded-md border-rose-200 p-2 text-black w-full'
        />

        <ul className='h-80 overflow-y-auto'>
          {messages.map((message, index) => (
            <li key={index} className={`my-2 p-2 table text-sm rounded-md ${message.from === "Me" ? "bg-blue-500 ml-auto" : "bg-indigo-400"}`}>
              <p>{message.from} : {message.body}</p>
            </li>
          ))
          }

        </ul>


      </form>
    </div>
  );
}

export default App;
