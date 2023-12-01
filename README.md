# 2hr-to-build-Full-Stack-AI-Chatbot-Your-Data-Trained-Langchain-ChatGPT-Singlestore

https://www.youtube.com/watch?v=CSTZ7IfoCFI 

https://www.singlestore.com/ 

Prompt
npx create-singlestoredb-app cvs-reader

SingleStore UI
API Keys
Create API Key
API key name
demo
Expiration
never
Create API key
4756d6f52000eabc291d628eecefe1dcf1d2db49012b4cadba1e15961d675469 
Close

SingleStore
Cloud
cvs-reader-workspace-group-2

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
server
server.ts

server.ts
import * as express from 'express'
import apiRouter from './routes'

const app = express()

app.use(express.static('public'))
app.use(apiRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port: ${port}`))    

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
server
route.ts
server.ts

route.ts
import * as express from "express"
import {} from "./connection"
import * as dotenv from "dotenv"

const app = express()
const router = express.Router()

export default router


Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
server
connection.ts
route.ts
server.ts

connection.ts
import * as mysql from "mysql2/promise"
import * as dotenv from "dotenv"

export async function connectSingleStore(
    config: Partial<mysql.ConnectionOptions> = {}
) {
    dotenv.config();

    const baseConfig: mysql.ConnectionOptions = {
        host: process.env.HOST,
        password: process.env.PASSWORD,
        user: "admin",
    };

    return await mysql.createConnection({
        ...baseConfig,
        ...config,
    });
}

export async function stopSingleStore(conn: mysql.Connection) {
    await conn.end();
}

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
App.tsx
server
connection.ts
route.ts
server.ts

App.tsx
import * as React from "react"

const App = () => {
    return (
        <div></div>
    )
}

export default App

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
App.tsx
index.tsx
server
connection.ts
route.ts
server.ts

index.tsx
import * as React from 'react'
import { render } from 'react-dom'
import App from './App'

render(<App />, document.getElementById("root"))

SingleStore UI
Develop
Personal
New Notebook
Name
cvs-reader ( SQL )
Create

cvs-reader
singlestore-cvs-workspace-1
Python
!pip install matplotlib --quiet
!pip install plotly.express --quiet
!pip install scikit-learn --quiet
!pip install tabulate --quiet
!pip install tiktoken --quiet
!pip install wget --quiet
!pip install openai --quiet
Save

SingleStore UI
cvs-reader-workspace-group-2
Create Database
choose a new database name
news
Create Database

SingleStore UI
Develop
Notebook
Personal
cvs-reader.ipynb

cvs-reader
singlestore-cvs-workspace-1
Database
news
Python
!pip install matplotlib --quiet
!pip install plotly.express --quiet
!pip install scikit-learn --quiet
!pip install tabulate --quiet
!pip install tiktoken --quiet
!pip install wget --quiet
!pip install openai --quiet
Play

cvs-reader
singlestore-cvs-workspace-1
Python
import pandas as pd
import os
import wget
import json

cvs-file-path = "https://raw.githubusercontent/openai/openai-cookbook/main/examples/data/AG_news_samples.csv"
file_path = "AG_news_samples.cvs"

if not os.path.exists(file_path):
    wget.download(cvs-file-path,file_path)
    print("File downloaded successfully.")
else:
    print("File already exists in the local file system.")

cvs-reader
singlestore-cvs-workspace-1
Python
df = pd.read_csv('AG_news_samples.cvs')
df.pop('label_int')
df

cvs-reader
singlestore-cvs-workspace-1
Python
data = df.values.tolist()
print(data)

cvs-reader
singlestore-cvs-workspace-1
Python
%%sql
DROP DATABASE IF EXISTS news;
CREATE DATABASE IF NOT EXISTS news;

cvs-reader
singlestore-cvs-workspace-1
Python
%%sql
DROP TABLE IF EXISTS news.news_articles;
CREATE TABLE IF NOT EXISTS news.news_articles (
    title TEXT,
    description TEXT,
    label TEXT,
    embedding BLOB
);

cvs-reader
singlestore-cvs-workspace-1
Python
from sqlalchemy import *

db_connection = create_engine(connection_url)connect()

cvs-reader
singlestore-cvs-workspace-1
Python
json_data = [json.dumps(row) for row in data]

Openai 
Openai api_key 
Personal
API Keys
Create new secret key 
name 
demo
Create secret key
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

cvs-reader
singlestore-cvs-workspace-1
Python
import openai
openai.api_key = "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"
embedded_data = openai.Embedding.create(input=json_data, model="text-embedding-ada-002")['data']

cvs-reader
singlestore-cvs-workspace-1
Python
combined_data = [tuple(row) + (embedded['embedding'],) for embedded, row in zip(embedded_data, data)]

cvs-reader
singlestore-cvs-workspace-1
Python
    %sql TRUNCATE TABLE news.news_article;

    statement = '''
        INSERT INTO news.news_articles (
            title,
            description,
            label,
            embedding
        )
        VALUES (
            %s,
            %s,
            %s,
            JSON_ARRAY_PACK(%s)
        );
    '''

    for i, row in enumerate(combined_data):
        try:
            title, description, label, embedding = row
            values = (title, description, label, json_dumps(embedding))
            db_connection.exec_driver_sql(statement, values)
        except Exception as e:
            print("Error inserting row {}: {}".format(i, e))

SingleStore UI
Cloud 
Database
news
Indexes
Sample Data

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

app.scss
body {
    margin: 0;
    padding: 0;
    background-color: #e4e4e4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: Arial, sans-serif;
}

localhost:3000

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

App.tsx
import * as React from "react"

const App = () => {
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
                    <div >
                        <div className="question bubble"></div>
                        <div className="response bubble"></div>
                    </div>
                </div>
            </div>
            <div className="submit-container">
                <form>
                    <textarea/>
                    <input type="submit" value="⇨"/>
                </form>
            </div>
        </div>
    )
}

export default App

https://compart.com/en/unicode/U+21E8

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

app.scss
body {
    margin: 0;
    padding: 0;
    background-color: #e4e4e4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: Arial, sans-serif;
}

.chat-bot {
    background-color: #1e1f2b;
    width: 75vw;
    height: 75vh;
    border-radius: 30px;
    display: flex;
    overflow: hidden;
}

.header {
    background-color: #6785FF;
    width: 130px;
    height: 100%;
    border-radius: 30px 20px 20px 30px;
}

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

index.tsx
import * as React from 'react'
import { render } from 'react-dom'
import App from './App'
import './app.scss'

render(<App />, document.getElementById("root"))

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

app.scss
body {
    margin: 0;
    padding: 0;
    background-color: #e4e4e4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: Arial, sans-serif;
}

.chat-bot {
    background-color: #1e1f2b;
    width: 75vw;
    height: 75vh;
    border-radius: 30px;
    display: flex;
    overflow: hidden;
}

.header {
    background-color: #6785FF;
    width: 130px;
    height: 100%;
    border-radius: 30px 20px 20px 30px;
    border: solid 10px #1e1f2b;
    box-sizing: border-box;
    position: relative;
}

.info-container {
    padding: 15px;
}

.tick {
    background-color: #1e1f2b;
    height: 30px;
    width: 30px;
    transform: rotate(45deg);
    position: absolute;
    top: 113px;
    right: -15px;
}

.messaging-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 10px;
    padding-left: 0;

    &, * {
        box-sizing: border-box;
    }
}

.bubble {
    width: 90%;
    color: #fff;
    padding: 20px 10px;
    margin: 10px;
}

.bubble.question {
    background-color: #303247;
    border-radius: 30px 30px 30px 0;
}

.bubble.response {
    background-color: #6785FF;
    border-radius: 30px 30px 0 30px;
    margin-left: 5%;
}

.feed {
    flex: 1;
    display: flex;
    width: 100%;
    flex-direction: column-reverse;
    overflow-x: hidden;
    overflow: auto;
    padding-bottom: 12px;
}

.submit-container {
    form {
        display: flex;
    }

    textarea {
        font: inherit;
        flex: 1;
        background-color: #303247;
        border: radius 20px;
        border: none;
        padding: 10px 16px;
        color: #fff;
        resize: none;
        outline: none;
    }

    input[type=submit] {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 8px;
        width: 40px;
        border: none;
        border-radius: 20px;
        padding: 12px 32px;
        background-color: #6785FF;

        &:hover {
            cursor: pointer;
            background-color: #5c77e5;
        }

        &:active {
            background-color: #526acc;
        }
    }
}

Visual Studio Code
Terminal
npm i openai

SingleStore UI
Develop
Personal
cvs-readeripynb
openai.api_key = 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

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts
.env

.evn
OPENAI_API_KEY="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
"

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

routes.ts
import * as express from "express"
import {} from "./connection"
import OpenAi from 'openai'
import * as dotenv from "dotenv"
dotenv.config()

const database = "news"

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
})

const router = express.Router()

router.get("/api/database/:text", async (req, resp) => {
    const text = req.params.text
})

export default router

localhost:3000/api/database/hello

Visual Studio Code
Terminal
Server listening on port: 3000
hello

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

App.tsx
import * as React from "react"

const App = () => {
    const [text, setText] = React.useState<string>("")
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const submit = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`localhost:3000/api/database/${text}`)
            const data = await response.json()
            console.log(data)
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
                    <div >
                        <div className="question bubble"></div>
                        <div className="response bubble"></div>
                    </div>
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

Visual Studio Code
Terminal
npm run dev 

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

routes.ts
import * as express from "express"
import {} from "./connection"
import OpenAi from 'openai'
import * as dotenv from "dotenv"
dotenv.config()

const database = "news"

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
})

const router = express.Router()

router.get("/api/database/:text", async (req, resp) => {
    const text = req.params.text
    
    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: text, 
        })
        const embedding = response.data[0].embedding

    } catch (error) {
        console.error(error)
    }
})

export default router

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

connection.ts
import * as mysql from "mysql2/promise"
import * as dotenv from "dotenv"

export async function connectSingleStore(
    config: Partial<mysql.ConnectionOptions> = {}
) {
    dotenv.config();

    const baseConfig: mysql.ConnectionOptions = {
        host: process.env.HOST,
        password: process.env.PASSWORD,
        user: "admin",
    };

    return await mysql.createConnection({
        ...baseConfig,
        ...config,
    });
}

export async function stopSingleStore(conn: mysql.Connection) {
    await conn.end();
}

export async function findNewsArticle({
    conn,
    database,
    embedding
}: {
    conn? : mysqlConnection,
    database : string,
    embedding : any
}) {
    try {
        let closeConn = false 
        if (!conn) {
            conn = await connectSingleStore({ database })
            closeConn = true 
        }

        const [ rows ] = await conn.execute (`SELECT title, description, DOT_PRODUCT(embedding, JSON_ARRAY_PACK('[${embedding}]')) AS similarity FROM news.news_articles ORDER BY similarity DESC LIMIT 1`)

        if (closeConn) {
            await stopSingleStore(conn)
        }

        return rows[0]

    } catch (error) {
        console.error({error})
        return error 
    }
}

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

routes.ts
import * as express from "express"
import { findNewsArticle } from "./connection"
import OpenAi from 'openai'
import * as dotenv from "dotenv"
dotenv.config()

const database = "news"

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
})

const router = express.Router()

router.get("/api/database/:text", async (req, resp) => {
    const text = req.params.text
    
    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: text, 
        })
        const embedding = response.data[0].embedding
        const news_article = await findNewsArticle({ database, embedding })

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo"
            messages: [
                { role: "system", content: "You are a helpful assistant."},
                { role: "user", content: `The user wrote ${text}. The most similar news from the CSV is ${JSON.stringify(news.news_article)}.`}
            ]
        })

        res.json(completion.choises[0].message)

    } catch (error) {
        console.error(error)
    }
})

export default router

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

App.tsx
import * as React from "react"

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

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
Components
HomePageIcon.tsx
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

HomePageIcon.tsx
import React from "react"

const HomePageIcon = () => {
    return (

    )
}

export default HomePageIcon

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
Components
ChatIcon.tsx
HomePageIcon.tsx
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

ChatIcon.tsx
import React from "react"

const ChatIcon = () => {
    return (
	<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0   124 124" fill="none">
<rect width="124" height="124" rx="24" fill="#F97316"/>
<path d="M19.375 36.7818V100.625C19.375 102.834 21.1659 104.625 23.375 104.625H87.2181C90.7818 104.625 92.5664 100.316 90.0466 97.7966L26.2034 33.9534C23.6836 31.4336 19.375 33.2182 19.375 36.7818Z" fill="white"/>
<circle cx="63.2109" cy="37.5391" r="18.1641" fill="black"/>
<rect opacity="0.4" x="81.1328" y="80.7198" width="17.5687" height="17.3876" rx="4" transform="rotate(-45 81.1328 80.7198)" fill="#FDBA74"/>
</svg>
    )
}

export default ChatIcon

https://www.svgviewer.dev/ 
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 124 124" fill="none">
<rect width="124" height="124" rx="24" fill="#F97316"/>
<path d="M19.375 36.7818V100.625C19.375 102.834 21.1659 104.625 23.375 104.625H87.2181C90.7818 104.625 92.5664 100.316 90.0466 97.7966L26.2034 33.9534C23.6836 31.4336 19.375 33.2182 19.375 36.7818Z" fill="white"/>
<circle cx="63.2109" cy="37.5391" r="18.1641" fill="black"/>
<rect opacity="0.4" x="81.1328" y="80.7198" width="17.5687" height="17.3876" rx="4" transform="rotate(-45 81.1328 80.7198)" fill="#FDBA74"/>
</svg>

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
Components
ChatIcon.tsx
HomePageIcon.tsx
LogOutIcon.tsx
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

LogOutIcon.tsx
import React from "react"

const LogOutIcon = () => {
    return (
	<?xml version="1.0" encoding="utf-8"?>
            <!-- License: MIT. Made by Software Mansion:       https://github.com/kamilagraf/react-swm-icon-pack -->
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"  xmlns="http://www.w3.org/2000/svg">
            <path d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18  20H15M8 8L4 12M4 12L8 16M4 12L16 12" stroke="#000000" stroke-width="1.5"  stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

    )
}

export default LogOutIcon

https://www.svgviewer.dev/s/359488/logout 
	<?xml version="1.0" encoding="utf-8"?>
            <!-- License: MIT. Made by Software Mansion:       https://github.com/kamilagraf/react-swm-icon-pack -->
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"  xmlns="http://www.w3.org/2000/svg">
            <path d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18  20H15M8 8L4 12M4 12L8 16M4 12L16 12" stroke="#000000" stroke-width="1.5"  stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
Components
ChatIcon.tsx
HomePageIcon.tsx
LogOutIcon.tsx
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

App.tsx
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


Visual Studio Code
Explorer 
Open Editors
cvs-reader
src
client
Components
ChatIcon.tsx
HomePageIcon.tsx
LogOutIcon.tsx
app.scss
App.tsx
index.tsx
server
connection.ts
routes.ts
server.ts

app.scss
body {
    margin: 0;
    padding: 0;
    background-color: #e4e4e4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: Arial, sans-serif;
}

.chat-bot {
    background-color: #1e1f2b;
    width: 75vw;
    height: 75vh;
    border-radius: 30px;
    display: flex;
    overflow: hidden;
}

.header {
    background-color: #6785FF;
    width: 130px;
    height: 100%;
    border-radius: 30px 20px 20px 30px;
    border: solid 10px #1e1f2b;
    box-sizing: border-box;
    position: relative;
}

.info-container {
    padding: 15px;
}

.info-container svg {
    padding: 30px;
    height: 15px;
    width: 15px;
}

.tick {
    background-color: #1e1f2b;
    height: 30px;
    width: 30px;
    transform: rotate(45deg);
    position: absolute;
    top: 113px;
    right: -15px;
}

.messaging-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 10px;
    padding-left: 0;

    &, * {
        box-sizing: border-box;
    }
}

.bubble {
    width: 90%;
    color: #fff;
    padding: 20px 10px;
    margin: 10px;
}

.bubble.question {
    background-color: #303247;
    border-radius: 30px 30px 30px 0;
}

.bubble.response {
    background-color: #6785FF;
    border-radius: 30px 30px 0 30px;
    margin-left: 5%;
}

.feed {
    flex: 1;
    display: flex;
    width: 100%;
    flex-direction: column-reverse;
    overflow-x: hidden;
    overflow: auto;
    padding-bottom: 12px;
}

.submit-container {
    form {
        display: flex;
    }

    textarea {
        font: inherit;
        flex: 1;
        background-color: #303247;
        border: radius 20px;
        border: none;
        padding: 10px 16px;
        color: #fff;
        resize: none;
        outline: none;
    }

    input[type=submit] {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 8px;
        width: 40px;
        border: none;
        border-radius: 20px;
        padding: 12px 32px;
        background-color: #6785FF;

        &:hover {
            cursor: pointer;
            background-color: #5c77e5;
        }

        &:active {
            background-color: #526acc;
        }
    }
}



