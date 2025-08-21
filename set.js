const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'TIMNASA-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUk3V2tZTUQzK3ZDV1IzTmpRNzFjeEY2K0s4R08yc3RmUkxKejM5UUZucz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSDdOcURWTncySmVsZWNSQ2xVb2FoT0RUcEQwcjdTeHVhaTdTZlAydndudz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyTVRabEZYTVhyckJ4eVRLaUNFVmFEdktia200aUNRVEhGU1UxR0JrTUVjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwQ1MvY1F5WS9LMDVYNHovVTNuVWlpckZIWkUxREVMeHdFbk0wTUpDbTJvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFOM0QyeDhlaFdQeXFkRDliS3V5ZTNjaEtwa2lxQitoYjRGcG5XNnNsRkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkozSFEzNUtOTHBzNmJ1NWxCc25ZUXVSVGJnc05EQmJXc0UySG1ndndURjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0xYRFY3NG9QYzAvUU00YkZsREwxS0gza3hMZk9UbDdDT3h4QlMyQlVuaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHZHOTYxNWdkT1Q5ZVk5Y3RXbXJjQW1Yakh5c0V0QUoweUczUU1aVHprbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImI3RGNTeFR6WmlhWVFZTGl5UVNSbjQxZWYvZUFDMlBBUHFxT3VyOVlDbURUazhxc3BubDI0MGlqM1pZZnRLZDhIRzhnbnpvRHQ4WnRwenJrUjVURWlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcwLCJhZHZTZWNyZXRLZXkiOiJoMEU1a0pZcXY4WDdqVmNLRVBsTytqb044THJhWFRHZkZibFR0UnRvSHRRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4MzQ1ODMxMkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0OTU0RUQ1NDg2QkM5RDhBMUE0OUFCRjc1QUZCRjQ3RiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU1NzkxMjMwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODM0NTgzMTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRkQ2NEYzQzIxNkIyNDVGQjMyRTlGMTIwQTk2NzMxRkQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NTc5MTIzMn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiTjZZUUI0WjgiLCJtZSI6eyJpZCI6IjI2Mzc4MzQ1ODMxMjo5OEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE1Mzg1MTc2ODQyMjg0Ojk4QGxpZCIsIm5hbWUiOiJzdXByZW1lIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPbVF1NFVHRU96K25NVUdHQklnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI0K3d5YUphTkdiTGU5NFl6K0lVRjZGK3FPNFBSZ1ZrNVdlRDVjc2x1QkIwPSIsImFjY291bnRTaWduYXR1cmUiOiI3NGYyZnJQSWRzTGFhWTV2TkdTWHQvejVSSTdjTy9JeTJpWUt2dUJQVXdzT1V3Tk5QcmRxaCtsbWVXTlplUjVqTk4vREV0Smh2R0JhYVBLcmpVVnFEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiLy9CNk93bTlkMXBhVnoxd1hkKzhPcUdSbkY4RWhLZ2hNekI0bGtJQW4vTEZuVG5CMVc0ZkRRVDRMM2NET3M0WVFVZzlzMjhWTDAvTnFZYUZXcVMyZ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3ODM0NTgzMTI6OThAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZVBzTW1pV2pSbXkzdmVHTS9pRkJlaGZxanVEMFlGWk9WbmcrWExKYmdRZCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU1NzkxMjI1LCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQzNNIn0=',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://files.catbox.moe/xtkghn.jpg',
    OWNER_NAME : process.env.OWNER_NAME || "TimnasaTech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255784766591", 
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
   AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    AUTO_REACT: process.env.AUTO_REACTION || "no",  
    URL: process.env.URL || "https://files.catbox.moe/xtkghn.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "yes",
    AUDIO_REPLY: process.env.AUDIO_REPLY || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    ANTI_BUG : process.env.ANTI_BUG || "no",
    ANTI_MENTION_GROUP : process.env.ANTI_MENTION_GROUP || "on",
    ANTI_TAG : process.env.ANTI_TAG || "on",
    ANTI_BAD : process.env.ANTI_BAD || "on",
    ANTI_SHARE_GROUP : process.env.ANTI_SHARE_GROUP || "on",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by timnasa tmd',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_MESSAGE || 'yes',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",
    CAPTION : process.env.CAPTION || "TIMNASA-TMD",
    BOT : process.env.BOT_NAME || 'TIMNASA-TMD⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTI_CALL: process.env.ANTI_CALL || 'yes',              
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
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
