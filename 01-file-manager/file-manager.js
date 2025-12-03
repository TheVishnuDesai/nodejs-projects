#!/usr/bin/env node

import * as readline from "readline/promises"
import { stdin, stdout } from "node:process"
import chalk from "chalk";

import { 
    createFolder, 
    createFile, 
    writeToFile, 
    deleteFile, 
    deleteFolder, 
    listItems 
} from "./modules.js"

const rl = readline.createInterface({
    input: stdin,
    output: stdout
})

async function menu() {
    console.clear()
    console.log(chalk.blue.bold(`\n📂 File system manager\n`));

    const options = [
        "Create Folder",
        "Create File",
        "Write to File",
        "Delete File",
        "Delete Folder",
        "List Items",
        "Exit"
    ]
    options.forEach((opt, inx) => console.log(chalk.yellow(`${inx + 1}`) + chalk.white(` ${opt}`)));

    const answer = await rl.question(chalk.cyan("\nSelect Option:"))
    // console.log("Ans: ",answer);

    switch (answer) {
        case '1':
            const folderPath = await rl.question(chalk.cyan("Folder path: "))
            await createFolder(folderPath)
            console.log(chalk.green("Folder Created! ✅"));
            break;
        case '2':
            const filePath = await rl.question(chalk.cyan("File path: "))
            const initialContent = await rl.question(chalk.cyan("Initial Content: "))
            await createFile(filePath, initialContent)

            console.log(chalk.green("File Created! ✅"));
            break;
        case '3':
            const writeToPath = await rl.question(chalk.cyan("Write into file path: "))
            const appendContent = await rl.question(chalk.cyan("Add Content: "))
            await writeToFile(writeToPath, `\n${appendContent}`)

            console.log(chalk.green("File Content Added! ✅"));
            break;
        case '4':
            const delFilePath = await rl.question(chalk.cyan("Delete File path: "))
            await deleteFile(delFilePath)
            console.log(chalk.green("File Delated! ✅"));
            break;
        case '5':
            const delFolderPath = await rl.question(chalk.cyan("Delete File path: "))
            await deleteFolder(delFolderPath)
            console.log(chalk.green("Folder Delated! ✅"));
            break;
        case '6':
            const listPath = await rl.question(chalk.cyan("Folder path(Enter for current): "))
            const items = await listItems(listPath || "./")

            console.log(chalk.blue("\nContents:"));
            items.forEach((item)=>{
                const icon = item.type === "folder" ? "📂" : "📄"
                console.log(`${icon} ${chalk.green(item.name)}`);
            })
            break;
        case '7':
            rl.close()
            return    
        default:
            console.log("⚠️ Invalid Option!");
            
            break;
    }

    await rl.question(chalk.gray(`\nPress ${chalk.underline("ENTER")} to continue`))
    menu();
}
menu()