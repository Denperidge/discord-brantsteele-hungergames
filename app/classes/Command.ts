import {Interaction} from "discord.js";



interface Command {
    name: string,
    description: string,
    function: (interaction: Interaction) => {}
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