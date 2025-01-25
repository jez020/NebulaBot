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

// ! Destructure the environment variables
const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;


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
};
