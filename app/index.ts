import { Client, GatewayIntentBits } from "discord.js";
import registerCommands from "./register";
import getFromEnv from "./env";
import { CommandDict } from "./classes/Command";
import { Browser, Page } from "puppeteer";

declare global {
    // Have to use var here, let doesn't work
    var sessions: 
        {
            [key:string]: { 
                browser: Browser 
                page?: Page
            } 
        };
}

globalThis.sessions = {};

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

let commands: CommandDict;

client.on("ready" , async () => {
    if (client.user != null) {
        console.log(`Logged on as ${client.user.tag}`);
    }
    commands = await registerCommands();
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) { return; }

    commands[interaction.commandName].function(interaction);
});

client.login(getFromEnv("BHGD_TOKEN"));
