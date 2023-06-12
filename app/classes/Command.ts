import {CommandInteraction, Interaction} from "discord.js";



interface Command {
    name: string,
    description: string,
    function: (interaction: CommandInteraction) => {}
}

interface CommandDescription {
    name: string,
    description: string
}

interface CommandDict {
    [key: string]: Command 
}

export {
    Command, CommandDescription, CommandDict
};