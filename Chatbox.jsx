import { useState } from "react"
import axios from "axios"

const ChatBox = () => {
  const [message, setMessage] = useState("")
  const [responses, setResponses] = useState([])

  const sendMessage = async () => {
    if (!message.trim()) return
    const userMsg = { from: "user", text: message }
    setResponses([...responses, userMsg])
    setMessage("")

    try {
      const res = await axios.post("http://localhost:8000/chat", { message })
      const botMsg = { from: "bot", text: res.data.response }
      setResponses(prev => [...prev, botMsg])
    } catch (err) {
      setResponses(prev => [...prev, { from: "bot", text: "Miala tsiny, misy olana." }])
    }
  }

  return (
    <div>
      <div className="h-[70vh] overflow-y-auto bg-gray-900 p-3 rounded-lg mb-4 space-y-2">
        {responses.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded ${msg.from === "user" ? "text-right text-orange-400" : "text-left text-white"}`}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
          placeholder="Soraty eto..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-orange-500 px-4 rounded text-white">Alefa</button>
      </div>
    </div>
  )
}

export default ChatBox
const [listening, setListening] = useState(false)

const handleMic = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SpeechRecognition) {
    alert("Tsy tohanan'ny navigateur ny mic")
    return
  }

  const recognition = new SpeechRecognition()
  recognition.lang = "mg-MG" // Malagasy, na fr-FR raha tianao
  recognition.start()
  setListening(true)

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    setMessage(transcript)
    setListening(false)
  }

  recognition.onerror = () => setListening(false)
}
<div className="flex gap-2">
  <input
    type="text"
    className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
    placeholder="Soraty eto..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  />
  <button onClick={handleMic} className="bg-gray-700 px-3 rounded text-white">
    🎤
  </button>
  <button onClick={sendMessage} className="bg-orange-500 px-4 rounded text-white">
    Alefa
  </button>
</div>
useEffect(() => {
  const saved = localStorage.getItem("tsara_hevitra_history")
  if (saved) setResponses(JSON.parse(saved))
}, [])
const [isTyping, setIsTyping] = useState(false)
