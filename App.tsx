import * as React from "react"
import HomePageIcon from "./Components/HomePageIcon";
import LogOutIcon from "./Components/LogOutIcon";
import ChatIcon from "./Components/ChatIcon";

interface = Message {
    question: string;
    response: string;
}

const App = () => {
    const [text, setText] = React.useState<string>("")
    const [messages, setMessages] = React.useState<Message[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const submit = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`localhost:3000/api/database/${text}`)
            const data = await response.json()
            console.log(data)
            setMessages([...messages, {
                question: text;
                response: data.content
            }])
            setText("")
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit: JSX.IntrinsicElements['form']['onSubmit'] = (event) => {
        event.preventDefault()
        if (text) submit()
    }

    const handleTextareaKeyDown: JSX.IntrinsicElements['textarea']['onKeyDown'] = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            submit()
        }
    }

    return (
        <div className="chat-bot">
            <div className="header">
                <div className="info-container"></div>
                    <HomePageIcon/> 
                    <ChatIcon/>
                    <LogOutIcon/>
            </div>
            <div className="tick"></div>
            <div className="messaging-container">
                <div className="feed">
                    {[...messages ?? []].reverse()?.map((message, _index) =>
                    <div key={_index}>
                        <div className="question bubble">{message.question}</div>
                        <div className="response bubble">{message.response}</div>
                    </div>
                    )}
                </div>
            </div>
            <div className="submit-container">
                <form onSubmit={handleSubmit}>
                    <textarea
                    value={text}
                    onKeyDown{handleTextareaKeyDown}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isLoading}
                    />
                    <input type="submit" value="⇨" disabled={isLoading}/>
                </form>
            </div>
        </div>
    )
}

export default App
