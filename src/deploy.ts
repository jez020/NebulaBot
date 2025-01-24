/**
 * @fileoverview For deploying commands/interactions to the database
 * 
 * * Author: jez020
 * * Built: 01/24/2025
 * * Last Updated: 01/24/2025
 * * Bugs: None
 * * Todo: none
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