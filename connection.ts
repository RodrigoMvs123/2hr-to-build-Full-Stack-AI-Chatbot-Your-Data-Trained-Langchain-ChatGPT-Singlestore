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

