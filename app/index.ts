import { Client, GatewayIntentBits } from "discord.js";
import registerCommands from "./register";
import getFromEnv from "./env";
import { CommandDict } from "./classes/Command";

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
