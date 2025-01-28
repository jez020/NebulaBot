/**
 * @fileoverview Entry point of the application
 * 
 * * Author: jez020
 * * Built: 01/24/2025
 * * Last Updated: 01/27/2025
 * * Bugs: None
 * * Todo: None
 */

// Importing neccessary modules
import { ButtonInteraction, Client, CommandInteraction } from "discord.js";

// Importing local modules
import { deployCommands } from "./deploy";
import { commands } from "./commands";
import { config } from "./config";
import * as model from "./modelManager";

// ! setting up modules/classes
// Creating a new client for discord bot with intents
const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

/**
 * ? A event for handling the ready event
 * 
 * @bug None
 * @todo None
 * @returns {void} returns nothing
 */
client.once("ready", () => {

    // deployCommands({ guildId: config.supportGuildId }).catch(console.error);
    console.log( "Bot is ready! 🤖" );
});

/**
 * ? A event for adding commands to guilds
 * 
 * @bug None
 * @todo None
 * @returns {void} returns nothing
 */
client.on("guildCreate", (guild) => {
    deployCommands({ guildId: guild.id }).catch(console.error);
});

/**
 * ? A event for handling user slash command interactions
 * 
 * @bug None
 * @todo None
 * @returns {Promise<void>} returns nothing
 */
client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    commands[commandName as keyof typeof commands]
        .execute(interaction, client).catch(console.error);
});

/**
 * ? A event for handling user slash command interactions
 * 
 * @bug None
 * @todo None
 * @returns {Promise<void>} returns nothing
 */
client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    const command = commands[commandName as keyof typeof commands];

    // Handling autocomplete commands
    if (interaction.isAutocomplete()) {
        Promise.resolve(command.autocomplete(interaction))
            .catch(console.error);
	}
});

/**
 * ? A event for handling models events
 * 
 * @bug None
 * @todo None
 * @returns {Promise<void>} returns nothing
 */
client.on("interactionCreate", (interaction) => {

    // Handling context menu commands
    if (interaction.isContextMenuCommand()) {
        const { commandName } = interaction;
        if (commandName in model.contextMenus) {
            const command = model.contextMenus[commandName as keyof 
                typeof model.contextMenus] as 
                { 
                    execute: (interaction: CommandInteraction,
                    client: Client) => Promise<void> 
                };
            command.execute(interaction, client).catch(console.error);
        }

    // Handling button commands
    }else if (interaction.isButton()) {
        const { customId } = interaction;
        if (customId in model.contextMenus) {
            const command = model.contextMenus[customId as keyof 
                typeof model.contextMenus] as 
                { 
                    execute: (interaction: ButtonInteraction,
                    client: Client) => Promise<void> 
                };
            command.execute(interaction, client).catch(console.error);
        }
    }
});



// ! Starting the bot
client.login(config.DISCORD_TOKEN).catch(console.error);