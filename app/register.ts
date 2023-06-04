import { REST, Routes } from "discord.js";
import start from "./commands/start";
import getFromEnv from "./env";
import { Command, CommandDescription, CommandDict } from "./classes/Command";


function getCommandDescriptionsFromCommands(commands: CommandDict) {
    const commandsDescriptions: Array<CommandDescription> = [];
    let keys = Object.keys(commands);
    for (let i = 0; i < keys.length; i++) {
        let command = commands[keys[i]];

        commandsDescriptions.push({
            "name": command.name,
            "description": command.description
        });
    }
    return commandsDescriptions
}

async function registerCommands() : Promise<CommandDict> {
    const rest = new REST({ version: "10" }).setToken(getFromEnv("BHGD_TOKEN"));

    try {
        console.log("[register.js] Setting /commands...")
        await rest.put(Routes.applicationCommands(getFromEnv("BHGD_CLIENT_ID")), {
            body: commandsDescriptions
        });
        console.log("[register.js] Finished setting /commands...")

        return commands;

    } catch (error) {
        console.error("[register.js] ERROR");
        console.error(error);
        process.exit(1);
    }
}


const commands: CommandDict = {
    "start": start
}

const commandsDescriptions = getCommandDescriptionsFromCommands(commands);


export default registerCommands;
