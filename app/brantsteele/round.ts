import { Page } from "puppeteer";
import { CommandInteraction, Interaction, Message } from "discord.js";



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
    // Image
    else if (item.indexOf("href=\"") >= 0) {
        if (!latestMessage.guildId) {
            return;
        }
        sessions[latestMessage.guildId].nextUrl = "https://brantsteele.net/hungergames/" + item.replace('href="', "").replace('"', "")
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

async function playRound(interaction: CommandInteraction) {
    const guildId = interaction.guildId
    if (guildId == undefined || !sessions[guildId]  || !sessions[guildId].page || sessions[guildId].page == undefined) {
        return;

    }
    const nextUrl = sessions[guildId].nextUrl
    if (!nextUrl) {
        return;
    }

    console.log(nextUrl);
    
    await sessions[guildId].page?.goto(nextUrl);

    const element = await sessions[guildId].page?.$("#content");

    if(!element) {
        console.error("BEEP")
        return;
    }
    
    const rawOutput = await (await element.getProperty("innerHTML")).toString().replace("JSHandle:", "");

    const output = rawOutput.match(/((^|<font.*?>).*?!?<br><br>)|src=".*?"|href=".*?"/gm) || [];


    if (!interaction.channel) { return; }
    let latestMessage: Message = await interaction.channel.send({
        content: "Starting..."
    });

    stepByStep(latestMessage, output)
}

export default playRound;