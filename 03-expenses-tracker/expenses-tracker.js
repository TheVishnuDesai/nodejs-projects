import fs from "node:fs"
import { createServer } from "http"
import fsPromises from "node:fs/promises"

const app = createServer(async (req, res) => {

    if (req.url === "/") {
        res.writeHead(200, { 'content-type': 'text/html' })
        //const data = fsPromises.readFile("./index.html")

        const dataStream = fs.createReadStream("./index.html")
        dataStream.pipe(res)
        res.end(data)

    } else if (req.url === "/about") {
        res.writeHead(200, { "content-type": "index/html" })
        res.end("<h1>Hello from about</h1>")

    } else if (req.url === "/expenses") { //endpoint
        if (req.method === "POST") {
            let buff = '';
            req.on("data", (chunk) => {
                //console.log("chunk: ", chunk);`

                buff = buff + chunk.toString()
            })
            req.on('end', async () => {
                const data = await fsPromises.readFile('./db.json')

                const dbData = JSON.parse(data)
                dbData.push(JSON.parse(buff))

                await fsPromises.writeFile('./db.json', JSON.stringify(dbData, null, 2))
                res.end("data loaded")
                console.log(dbData);
            })
        } else if (req.method === "GET") {
            const data = await fsPromises.readFile("./db.json")
            res.end(data)
        }
    }
});

app.listen(3000, () => {
    console.log("Server is runnig on 3000 port!");
});