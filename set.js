const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0c2MXBlRjBWMmVWWkZNMWRSdnVRa0xQcUdTRWk1dllCODh2eGs1a3NsND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidGwxaFdUR3RyRThTTjh2MHEzdkhCQm9vWXg5cUNmUTZpZkY0NGNPSzloND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtRVRUMDdyT0FaaGl4NldhNFBmK1VUbTBUV21WK3E1Um5vQm1qZFo3NG5nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkanJkQm9LY2NFcFB4SkVtVm5sOFVkRFl4WHJWOG9hVWxWdnRHUDRDOWdNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFEQlFmTTR4R0tYelBOZnlub0MwSGIxekttcFVneHNsYVIyNmhzNlEwbjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJTY3dCMFZISkV5ejhGR3hqOCszRm5tbFpsd0dydlBMMklKUnJNaWNyMkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidURnVElpUkRqaTFUdW5obEJiWkZRYk5YbEpqdm53aGFQNXlYWWNzM0JGUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUZabkovZi94L1p4V3ZuNmtoMUlJZ29ia2tqdFd3QU1UWHdNNm4yZEwxTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndmU2pGbW9SVkR3NGNGOG5rVVY1V1FVTjVKeXFraU9VYXFzalBib0NzMFFWWXZhTmNnMmJIN0dtUjFpQ1ZuRDZaSUVPZzE1NkFSdXo3WW81TDFpS0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTMsImFkdlNlY3JldEtleSI6IkJNYjVycnYyaFU2NFFYRU1yY1A4UzdHS0RKVy8yK2VIQUQrbUNwMUFPdjA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0MTAzODY4MzA3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjhENkZCMTU3RUFERTFEMEM5Mjk4NzdBOTlGNDc2N0M3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjU5ODMwMDF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlFyZlREYklrUy1PUXlnenAxd1JpR1EiLCJwaG9uZUlkIjoiMzM1NDEyNzgtMmYyYy00ZWE5LWJlMWItYzQ3MzA1NWEzZTEzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNwRzNMOWN4SFdCWFJkNEN3REVzTzU3clVUbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJudi95MTJZN2pTdXdkMFRBK0NQM3VIOHZLL2s9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTFkzR1hYQkMiLCJtZSI6eyJpZCI6IjI1NDEwMzg2ODMwNzo0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkNvbGxvIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOand1TUVGRUlqU2diY0dHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIrVExza0IxaVFQSWF6YjJrZ1RNU09kNmpPWThjZWdJeFU1RFVJckZES1JVPSIsImFjY291bnRTaWduYXR1cmUiOiJ1NytZV1hMcmJTditYWGtxNHJ3NDN5cGs4QVNkMjRGUGZyUHI3bDh2U1daM0pZNVdMSS9PS3pxUTVFSExHcnhNdElVMW5DK01pMVpFbG9hdGQvbFlEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiM3M4U291UjdtQ094R2FlOEZCQW1pOTV0WHR2VzdhY1B0VkUrVHBDUVYyM2hCWFdEVTRCbmY4aUoxY3lYRWl4NVB0YytZeUpoNTZNM0J1czJhcW56Q3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQxMDM4NjgzMDc6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJma3k3SkFkWWtEeUdzMjlwSUV6RWpuZW96bVBISG9DTVZPUTFDS3hReWtWIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI1OTgyOTk4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVEbSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Keith Keizzah",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'HUNCHO MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e18441d126f37be8efbfa.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
