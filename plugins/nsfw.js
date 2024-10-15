const {cmd , commands} = require('../command')
const cheerio = require('cheerio')
const axios = require('axios');
const {readEnv} = require('../lib/database')

cmd({
    pattern: "bysexdl",
    desc: "download the video bysex.net.",
    category: "nsfw",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
    if(config.NSFW == "false") return reply("*❗ ɴꜱꜰᴡ ɪꜱ ᴏꜰꜰ. ꜰɪʀꜱᴛ ᴏɴ ɪᴛ ❗*")
    if(!q) return reply("*❗ ɢɪᴠᴇ ᴍᴇ ᴀ ɴᴀᴍᴇ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ʙʏꜱᴇx ᴠɪᴅᴇᴏꜱ. ❗*")
    
await m.react("🔞")

    const surl = `http://en.bysex.net/search?text=${q}`
    const scrape = await fetch(surl)
    const $ = cheerio.load(await scrape.text())
    const s2url = $("body > div.container > div.list > div > div:nth-child(1) > div > a").attr('href')

    const scrape2 = await fetch(s2url)
    const $$ = cheerio.load(await scrape2.text())
    const dlurl = $$("body > div.container > ul > li:nth-child(2) > a").attr('href')

    
await conn.sendMessage(from, {video: {url: dlurl},mimetype: "video/mp4",caption: © ᴘᴏᴡᴇʀᴅ ʙʏ ꜱᴜʜᴀꜱ-ᴍᴅ🇱🇰,{quoted: mek})
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "pussybdl",
    desc: "download the video pussyboy.net.",
    category: "nsfw",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
    if(config.NSFW == "false") return reply("*❗ ɴꜱꜰᴡ ɪꜱ ᴏꜰꜰ. ꜰɪʀꜱᴛ ᴏɴ ɪᴛ ❗*")
    if(!q) return reply("*❗ ɢɪᴠᴇ ᴍᴇ ᴀ ɴᴀᴍᴇ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ᴘᴜꜱꜱʏʙᴏʏ ᴠɪᴅᴇᴏꜱ. ❗*")
    
await m.react("🔞")

const surl = `https://www.pussyboy.net/porn/${q}/`
const scrape = await fetch(surl)
const $ = cheerio.load(await scrape.text())
const dlurl = $("body > div.container-xxl.videos > div.col-md-12.videos-detail > div.col-md-12.videos-details > div > video > source").attr('src')

await conn.sendMessage(from, {video: {url: dlurl},mimetype: "video/mp4",caption: © ᴘᴏᴡᴇʀᴅ ʙʏ ꜱᴜʜᴀꜱ-ᴍᴅ🇱🇰,{quoted: mek})
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "xnxxdl",
    desc: "download the video xnxx.com.",
    category: "nsfw",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
    if(config.NSFW == "false") return reply("*❗ ɴꜱꜰᴡ ɪꜱ ᴏꜰꜰ. ꜰɪʀꜱᴛ ᴏɴ ɪᴛ ❗*")
    if(!q) return reply("*❗ ɢɪᴠᴇ ᴍᴇ ᴀ ɴᴀᴍᴇ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ xɴxx ᴠɪᴅᴇᴏꜱ. ❗*")
    
await m.react("🔞")

    const searchUrl = `https://www.xnxx.com/search/${q}`;

    const { data } = await axios.get(searchUrl);

    const $ = cheerio.load(data);
    const anchors = $(".thumb-inside .thumb").find("a");

    if (!anchors || !anchors.length) return;

    const index = Math.floor(Math.random() * anchors.length);
    const href = anchors.eq(index).attr("href");
    const url = `https://www.xnxx.com${href}`;

    const { data: content } = await axios.get(url);

    const $$ = cheerio.load(content);
    const video = $$("#video-player-bg").find("script").text();

    const pattern = /html5player\.setVideoUrlHigh\('([^']+)'\)/;
    const link = video.match(pattern)?.[1];

let desc = `© ᴘᴏᴡᴇʀᴅ ʙʏ ꜱᴜʜᴀꜱ-ᴍᴅ🇱🇰`

        await conn.sendMessage(from,{video: {url: link},mimetype: "video/mp4",caption: desc},{quoted: mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "xvdl",
    desc: "download the video xvideos.com",
    category: "nsfw",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
    if(config.NSFW == "false") return reply("*❗ ɴꜱꜰᴡ ɪꜱ ᴏꜰꜰ. ꜰɪʀꜱᴛ ᴏɴ ɪᴛ❗*")
    if(!q) return reply("*❗ ɢɪᴠᴇ ᴍᴇ ᴀ ɴᴀᴍᴇ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ xᴠɪᴅᴇᴏ ᴠɪᴅᴇᴏꜱ. ❗*")
    
await m.react("🔞")

    const searchUrl = `https://www.xvideos.com/?k=${q}`;

    const { data } = await axios.get(searchUrl);

    const $ = cheerio.load(data);
    const anchors = $(".thumb-inside .thumb").find("a");

    if (!anchors || !anchors.length) return;

    const index = Math.floor(Math.random() * anchors.length);
    const href = anchors.eq(index).attr("href");
    const url = `https://www.xvideos.com${href}`;

    const { data: content } = await axios.get(url);

    const $$ = cheerio.load(content);
    const video = $$("#video-player-bg").find("script").text();

    const pattern = /html5player\.setVideoUrlHigh\('([^']+)'\)/;
    const link = video.match(pattern)?.[1];

let desc = `© ᴘᴏᴡᴇʀᴅ ʙʏ ꜱᴜʜᴀꜱ-ᴍᴅ🇱🇰`

        await conn.sendMessage(from,{video: {url: link},mimetype: "video/mp4",caption: desc},{quoted: mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})



cmd({
    pattern: "xwaifu",
    desc: "download the video ɪᴍᴀɢᴇꜱ.",
    category: "nsfw",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
if(config.NSFW == "false") return reply("*❗ ɴꜱꜰᴡ ɪꜱ ᴏꜰꜰ. ꜰɪʀꜱᴛ ᴏɴ ɪᴛ❗*")
   
await m.react("🔞")

const apiUrl = `https://api.waifu.pics/nsfw/waifu`
const response = await axios.get(apiUrl)
const data = response.data

await conn.sendMessage(from,{image: {url: data.url},mimetype: "video/gif",caption: `© ᴘᴏᴡᴇʀᴅ ʙʏ ꜱᴜʜᴀꜱ-ᴍᴅ🇱🇰`},{quoted: mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "xtrap",
    desc: "download the video.",
    category: "nsfw",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
    if(config.NSFW == "false") return reply("*❗ ɴꜱꜰᴡ ɪꜱ ᴏꜰꜰ. ꜰɪʀꜱᴛ ᴏɴ ɪᴛ❗*")
   
await m.react("🔞")

const apiUrl = `https://api.waifu.pics/nsfw/trap`
const response = await axios.get(apiUrl)
const data = response.data

await conn.sendMessage(from,{image: {url: data.url},caption: `© ᴘᴏᴡᴇʀᴅ ʙʏ ꜱᴜʜᴀꜱ-ᴍᴅ🇱🇰`},{quoted: mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "xblowjob",
    desc: "download the video.",
    category: "nsfw",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
    if(config.NSFW == "false") return reply("*❗ ɴꜱꜰᴡ ɪꜱ ᴏꜰꜰ. ꜰɪʀꜱᴛ ᴏɴ ɪᴛ❗*")
   
await m.react("🔞")

const apiUrl = `https://api.waifu.pics/nsfw/blowjob`
const response = await axios.get(apiUrl)
const data = response.data

await conn.sendMessage(from,{image: {url: data.url},caption: `© ᴘᴏᴡᴇʀᴅ ʙʏ ꜱᴜʜᴀꜱ-ᴍᴅ🇱🇰`},{quoted: mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "xneko",
    desc: "download the video.",
    category: "nsfw",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
    if(config.NSFW == "false") return reply("*❗ ɴꜱꜰᴡ ɪꜱ ᴏꜰꜰ. ꜰɪʀꜱᴛ ᴏɴ ɪᴛ❗*")
   
await m.react("🔞")

const apiUrl = `https://api.waifu.pics/nsfw/neko`
const response = await axios.get(apiUrl)
const data = response.data

await conn.sendMessage(from,{image: {url: data.url},caption: `© ᴘᴏᴡᴇʀᴅ ʙʏ ꜱᴜʜᴀꜱ-ᴍᴅ🇱🇰`},{quoted: mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})

