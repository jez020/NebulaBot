/**
 * @fileoverview Entry point of the application
 * 
 * * Author: jez020
 * * Built: 01/24/2025
 * * Last Updated: 01/24/2025
 * * Bugs: None
 * * Todo: none
 */

// Importing neccessary modules
import { Client } from "discord.js";

// Importing local modules
import { deployCommands } from "./deploy";
import { commands } from "./commands";
import { config } from "./config";

// ! setting up modules/classes
// Creating a new client for discord bot with intents
const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

/**
 * ? A event for handling the ready event
 * 
 * @returns {void} returns nothing
 */
client.once("ready", () => {
    console.log( client.user?.username + " is ready! 🤖" );
});

/**
 * ? A event for adding commands to guilds
 * 
 * @returns {void} returns nothing
 */
client.on("guildCreate", async (guild) => {
    await deployCommands({ guildId: guild.id });
});

/**
 * ? A event for handling user slash command interactions
 * 
 * @returns {void} returns nothing
 */
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
        commands[commandName as keyof typeof commands].execute(interaction);
    }
});

// ! Starting the bot
client.login(config.DISCORD_TOKEN);