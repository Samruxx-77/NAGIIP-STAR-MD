const moment = require('moment-timezone');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');


async function githubCommand(sock, chatId, message) {
  try {
    const res = await fetch('https://github.com/nagiipstar/NAGIIP-STAR-MD');
    if (!res.ok) throw new Error('Error fetching repository data');
    const json = await res.json();

    let txt = `*乂  𝗡𝗮𝗴𝗶𝗶𝗽 𝗦𝘁𝗮𝗿 𝗠𝗗  乂*\n\n`;
    txt += `✩  *𝗡𝗮𝗺𝗲* : ${json.name}\n`;
    txt += `✩  *𝗪𝗮𝘁𝗰𝗵𝗲𝗿𝘀* : ${json.watchers_count}\n`;
    txt += `✩  *𝗦𝗶𝘇𝗲* : ${(json.size / 1024).toFixed(2)} MB\n`;
    txt += `✩  *𝗟𝗮𝘀𝘁 𝗨𝗽𝗱𝗮𝘁𝗲𝗱* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`;
    txt += `✩  *𝗨𝗥𝗟* : ${json.html_url}\n`;
    txt += `✩  *𝗙𝗼𝗿𝗸𝘀* : ${json.forks_count}\n`;
    txt += `✩  *𝗦𝘁𝗮𝗿𝘀* : ${json.stargazers_count}\n\n`;
    txt += `💥 *𝗡𝗔𝗚𝗜𝗜𝗣 𝗦𝗧𝗔𝗥 𝗠𝗗*`;

    // Use the local asset image
    const imgPath = path.join(__dirname, '../assets/nagiip_md.jpg');
    const imgBuffer = fs.readFileSync(imgPath);

    await sock.sendMessage(chatId, { image: imgBuffer, caption: txt }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: '❌ Error fetching repository information.' }, { quoted: message });
  }
}

module.exports = githubCommand; 