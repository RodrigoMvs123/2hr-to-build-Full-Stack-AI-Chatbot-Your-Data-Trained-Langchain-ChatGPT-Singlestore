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

