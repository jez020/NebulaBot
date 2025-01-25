/**
 * @fileoverview A document for a file handling the info command
 *  Information about the bot, including the author, current version, github,
 *  etc.
 * 
 * * Author: jez020
 * * Built: 01/24/2025
 * * Last Updated: 01/24/2025
 * * Bugs: None
 * * Todo: none
 */

import { CommandInteraction, EmbedBuilder, SlashCommandBuilder }
    from "discord.js";
import { config } from "../config";
import { version, dependencies, devDependencies } from "../../package.json";

export const data = new SlashCommandBuilder()
    .setName("info")
    .setDescription("Information about the bot, including the author, " + 
        "current version, github, etc.");

/**
 *  ? info command
 *  ? Information about the bot, including the author, current version, github,
 *  ? etc.
 * 
 *  @param {CommandInteraction} interaction The interaction for when a slash
 *  command is used.
 *  @returns {Promise<void>} returns a promise
 */
export async function execute(interaction: CommandInteraction) {
    // Embed for the info command
    const infoEmbed = new EmbedBuilder()
        .setTitle(`${interaction.client.user.username} Information`)
        .setDescription(config.description)
        .setAuthor({ 
            name: interaction.user.username, 
            iconURL: interaction.user.displayAvatarURL() 
        })
        .setColor("Aqua")
        .setThumbnail(interaction.client.user.displayAvatarURL())
        .addFields([
            { 
                name: "Discord.js Version", 
                value: dependencies["discord.js"],
                inline: true,
            },
            { 
                name: "Typescript Version", 
                value: devDependencies["typescript"],
                inline: true,
            },
            { 
                name: "Node.js Version", 
                value: process.versions.node,
                inline: true,
            },
            { 
                name: "Bot Version", 
                value: version,
                inline: true,
            },
            { 
                name: "Github",
                value: `[Github](${config.githubUrl})`,
                inline: true,
            },
            { 
                name: "\u200B",
                value: "\u200B",
                inline: true,
            },
        ]);

    // Sending the infoEmbed
    return interaction.reply({ embeds: [infoEmbed] });
};