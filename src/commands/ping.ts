/**
 * @fileoverview A document for a file handling the ping command
 * 
 * * Author: jez020
 * * Built: 01/24/2025
 * * Last Updated: 01/24/2025
 * * Bugs: None
 * * Todo: none
 */

import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

/**
 *  ? Sends a reading
 * 
 *  @param {CommandInteraction} interaction The interaction for when a slash
 *  command is used.
 *  @returns {Promise<void>} returns a promise
 */
export async function execute(interaction: CommandInteraction) {
    return interaction.reply("Pong!");
};