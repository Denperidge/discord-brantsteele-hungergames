import { Command } from "../classes/Command";
import { Interaction } from "discord.js";
async function start(interaction: Interaction) {
    await interaction;
}

const command: Command =  {
    name: "start",
    description: "Meow meow",
    function: start
};

export default command;