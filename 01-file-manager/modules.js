import * as fs from "node:fs/promises"
import path from "node:path";

export async function createFolder(folderName) {
        try {
                await fs.mkdir(folderName, { recursive: true })
        } catch (error) {
                console.log("GET error: ", error);
        }
}

export async function createFile(pathname, content = '') {
        try {
                await fs.writeFile(pathname, content)
        } catch (error) {
                console.log("Get error: ", error);
        }
}

export async function writeToFile(pathname, content = '') {
        try {
                await fs.appendFile(pathname, content)
        } catch (error) {
                console.log("Get error: ", error);
        }

}

export async function deleteFile(filename) {
        try {
                await fs.unlink(filename)
        } catch (error) {
                console.log("Get error: ", error);
        }
}

export async function deleteFolder(folderName) {
        try {
                await fs.rm(folderName, { recursive: true })
        } catch (error) {
                console.log("Get error: ", error);
        }
}

export async function listItems(listPath = "./") {
        const items = await fs.readdir(listPath, { withFileTypes: true })
        return items.map((item) => {
                return {
                        name: item.name,
                        type: item.isDirectory() ? 'folder' : 'file',
                        path: path.join(import.meta.dirname, item.name)
                }
        })
}