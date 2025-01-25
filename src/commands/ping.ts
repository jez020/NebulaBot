/**
 * @fileoverview A document for a file handling the ping command
 * 
 * * Author: jez020
 * * Built: 01/24/2025
 * * Last Updated: 01/24/2025
 * * Bugs: None
 * * Todo: none
 */

import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } 
    from "discord.js";

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
export async function execute(interaction: CommandInteraction, client: Client) {
    // Embed for the ping command
    const pingEmbed = new EmbedBuilder()
        .setTitle("Pong!")
        .setColor("Aqua")
        .setDescription("Client Ping: `" + 
            Math.abs(client.ws.ping).toString() + " ms` \n" + 
            "Message Latency: `" +
            Math.abs(Date.now() - interaction.createdTimestamp).toString() + 
            " ms`")
        .setFooter({ text: "Thank you for using me!" });


    // Sending the pingEmbed
    return interaction.reply({ embeds: [pingEmbed] });
};

/**
 *  ? Autocomplete template for any command
 *  @param {CommandInteraction} interaction The interaction object assiociated
 *  with the command
 *  @returns 
 */
export function autocomplete(interaction: CommandInteraction) {
    return interaction;
}