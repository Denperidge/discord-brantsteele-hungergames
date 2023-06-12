import { Command } from "../classes/Command";
import { CommandInteraction, Interaction, InteractionResponse, Message } from "discord.js";
import puppeteer from "puppeteer";


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

        sessions[guildId].page = page;
        sessions[guildId].nextUrl = "https://brantsteele.net/hungergames/ProceedStart.php?r=0"

        
        interaction.reply("Game ready! Use /proceed to get started");
    }


}

const command: Command =  {
    name: "start",
    description: "Meow meow",
    function: start
};

export default command;