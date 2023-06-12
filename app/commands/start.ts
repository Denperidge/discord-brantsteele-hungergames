import { Command } from "../classes/Command";
import { CommandInteraction, Interaction, InteractionResponse, Message } from "discord.js";
import puppeteer from "puppeteer";


async function stepByStep(latestMessage: Message, steps: any, content: string="") {
    let item = steps.shift();
    console.log("'" + item + "'")
    if (item == undefined) {
        return;
    } 
    // If image
    else if (item.indexOf("src=\"") >= 0) {
        if (!latestMessage.channel) { return }

        await latestMessage.channel.send({
            content: item.replace('src="', "").replace('"', "")
        });

        content = "";
    } 
    // If text
    else {
        item = item
            .replace(/<(|\/)font.*?>/gm, "**")
            .replace(/<(\/|)strong>/gm, "")
            .replace(/<br>/gm, "");
        if (content == "") {
            content = item;
            latestMessage = await latestMessage.channel.send({
                content: content
            });
        } else {
            content += item + "\n";

            latestMessage.edit({
                content: content
            })
        }
    }

    setTimeout(()=> {stepByStep(latestMessage, steps, content)}, 1000);
}

async function start(interaction: CommandInteraction) {

    let guildId = interaction.guildId;
    if (guildId) {
        
        if (sessions[guildId]) {
            sessions[guildId].browser.close();
        }
        sessions[guildId] = {
            browser: await puppeteer.launch({
                headless: false//"new"
            })
        };

        const page = await sessions[guildId].browser.newPage();

        await page.goto("https://brantsteele.net/hungergames/agree.php");
        await page.goto("https://brantsteele.net/hungergames/ProceedStart.php?r=0");

        const element = await page.$("#content");

        if(!element) {
            console.error("BEEP")
            return;
        }
        
        const rawOutput = await (await element.getProperty("innerHTML")).toString().replace("JSHandle:", "");

        const output = rawOutput.match(/((^|<font.*?>).*?!?<br><br>)|src=".*?"/gm) || [];


        if (!interaction.channel) { return; }
        let latestMessage: Message = await interaction.channel.send({
            content: "Starting..."
        });

        stepByStep(latestMessage, output)
    }


}

const command: Command =  {
    name: "start",
    description: "Meow meow",
    function: start
};

export default command;