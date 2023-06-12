import { Command } from "../classes/Command";
import { CommandInteraction } from "discord.js";
import playRound from "../brantsteele/round";

async function proceed(interaction: CommandInteraction) {
    playRound(interaction);
}

const command: Command =  {
    name: "proceed",
    description: "aaaaaa",
    function: proceed
};

export default command;
