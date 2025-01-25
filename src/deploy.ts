/**
 * @fileoverview For deploying commands/interactions to the database
 * 
 * * Author: jez020
 * * Built: 01/24/2025
 * * Last Updated: 01/24/2025
 * * Bugs: None
 * * Todo: Add funcitonality to block wip commands from getting published
 */

import { REST, Routes } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { DeployCommandsProps } from "./types/interfaces";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

/**
 * ? A function for deploying commands to a specific guild
 *
 * @bug None
 * @todo None
 * @param {DeployCommandsProps} props The props for deploying commands
 * @returns {Promise<void>} returns a promise of nothing
*/ 
export async function deployCommands({ guildId }: DeployCommandsProps) {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId),
      {
        body: commandsData,
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

/**
 * ? A function for deploying commands to the global scope
 *
 * @bug None
 * @todo None
 * @param {boolean} removeCommands True for removing commands, default is false
 * @returns {Promise<void>} returns a promise of nothing
*/
export async function deployGlobalCommands(removeCommands = false) {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationCommands(config.DISCORD_CLIENT_ID),
      {
        body: removeCommands ? [] : commandsData,
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

/**
 * ? A function for deploying commands to multiple guilds
 *
 * @bug None
 * @todo None
 * @param {string[]} guildIds The list of guild IDs to deploy commands to
 * @param {string[] | null} commandNames The list of command names to deploy
 * @returns {Promise<void>} returns a promise of nothing
*/
export async function deployCommandsToGuilds(guildIds: string[], 
  commandNames: string[] | null) {
  
  // Checks if the commandNames is null, if it is, set it to every command
  if(commandNames === null) {
    commandNames = commandsData.map((command) => command.name);
  }

  // Updates guilds to have the new commands
  try {
    console.log("Started refreshing application (/) commands for multiple " + 
      "guilds.");
      
    let specificCommandsData = Object.values(commands)
      .map(function (command) {

      if(commandNames.includes(command.data.name)) {
        return command.data; 
      }

    });

    specificCommandsData = specificCommandsData.filter(function( element ) {
      return element !== undefined;
    });

    const promises = guildIds.map((guildId) =>
      rest.put(
        Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId),
        {
          body: specificCommandsData,
        }
      )
    );

    await Promise.all(promises);

    console.log("Successfully reloaded application (/) commands for " + 
      "multiple guilds.");
  } catch (error) {
    console.error(error);
  }
}