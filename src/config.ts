/**
 * @fileoverview A document for validating all the configs and environment 
 * variables and making sure everything is in place
 * 
 * * Author: jez020
 * * Built: 01/24/2025
 * * Last Updated: 01/24/2025
 * * Bugs: None
 * * Todo: none
 */


import dotenv from "dotenv";

dotenv.config();

// ! Destructure the environment variables and define the other configs
const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;
const skippedCommands : string[] = [];
const description : string = "An open source, revolutionary Discord " +
    "Moderation bot with a main focus on a separate application for the " +
    "moderation aspect of the bot. This bot is built with TypeScript and " +
    "Discord.js.";
const githubUrl : string = "https://github.com/jez020/nebulabot";
const supportGuildId : string = "1332479383600103585";

// Checks if the environment variables are present
if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
    throw new Error("Missing environment variables: " + 
        (!DISCORD_TOKEN ? "DISCORD_TOKEN " : "") + 
        (!DISCORD_CLIENT_ID ? "DISCORD_CLIENT_ID" : ""));
}

// Export the config
export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    skippedCommands,
    description,
    githubUrl,
    supportGuildId
};
