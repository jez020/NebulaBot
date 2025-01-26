/**
 * @fileoverview A document for a file handling the ban command 
 * Bans a user from the server
 * 
 * @permissions Requires banmember permission
 * 
 * * Author: jez020
 * * Built: 01/24/2025
 * * Last Updated: 01/25/2025
 * * Bugs: None
 * * Todo: none
 */

import { CommandInteraction, CommandInteractionOptionResolver, EmbedBuilder, 
    MessageFlags, 
    PermissionFlagsBits, 
    SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a user from the server")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(option =>
		option.setName('user')
			.setDescription('Select a user to ban')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('reason')
            .setDescription('What is the reason for the ban?')
            .setRequired(false));

/**
 *  ? ban command
 *  ? Bans a user from the server
 * 
 *  @param {CommandInteraction} interaction The interaction for when a slash
 *  command is used.
 *  @returns {Promise<void>} returns a promise
 */
export async function execute(interaction: CommandInteraction) {
    // Getting the options and parsing them to the correct type
    const options = interaction.options as CommandInteractionOptionResolver;
    let mentionedUser = options.getUser('user');
    mentionedUser = mentionedUser ? mentionedUser : interaction.user;
    const reason : string = options.getString('reason') || "No reason provided";
    const member = interaction.guild?.members.cache.get(mentionedUser.id);

    // Checking if the user is bannable. If not, return an error message
    if( member == null || !member.bannable || mentionedUser.id === 
        interaction.user.id ) {
        return interaction.reply({ content: "You cannot ban this user!", 
            flags: MessageFlags.Ephemeral });
    }else{
        // Banning the user
        member.ban({ reason: reason }).catch((err: unknown) => {
            console.error(err);
            return interaction.reply({ content: "An error occured while " + 
                "trying to ban the user!", flags: MessageFlags.Ephemeral });
        });

        // Embed for the info command
        const banEmbed : EmbedBuilder = new EmbedBuilder()
            .setTitle(`${mentionedUser.username}(${mentionedUser.id})` +  
                ` has been banned.`)
            .setDescription("Reason: " + reason)
            .setColor("Aqua")
            .setThumbnail(member.displayAvatarURL());

        // Sending the infoEmbed
        return interaction.reply({ embeds: [banEmbed] });
    }
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