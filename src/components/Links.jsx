//jika anda menginstal bot ini via panel, 
//saya harap agar script nya di enc agar 
//aman dari admin panel dan jika di upload ke github
//jgn lupa emc dulu 👌🤙
require('./config.js')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, delay } = require('@whiskeysockets/baileys')
const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const axios = require('axios');
const path = require('path')
const os = require('os')
const moment = require('moment-timezone');
const { exec } = require("child_process");
const ms = require('parse-ms');
const toMs = require('ms');
const { randomBytes } = require('crypto');
const fetch = require('node-fetch')
const { expiredNotification } = require('./lib/expiredNotification.js');
const { smsg, fetchJson, getBuffer, sleep } = require('./lib/simple')
const { validateMobileLegendsMoogold } = require('./lib/validasi/validasiMoogold');
const { mooCountry } = require('./lib/region');
const { stalkml } = require("./lib/stalk-ml");
const { color, bgcolor } = require('./lib/color')
const { CatBox, fileIO, TelegraPh, ShannzCdn } = require('./lib/uploader.js');

const { 
	addAfkUser, 
	checkAfkUser, 
	getAfkId, 
	getAfkPosition, 
	getAfkReason, 
	getAfkTime 
} = require('./lib/afk');

const { 
isSetBot,
addSetBot,
removeSetBot,
changeSetBot,
getTextSetBot,
updateResponList,
delResponList,
renameList,
isAlreadyResponListGroup,
sendResponList,
isAlreadyResponList,
getDataResponList,
addResponList,
isSetClose,
addSetClose,
removeSetClose,
changeSetClose,
getTextSetClose,
isSetDone,
addSetDone,
removeSetDone,
changeSetDone,
getTextSetDone,
isSetLeft,
addSetLeft,
removeSetLeft,
changeSetLeft,
getTextSetLeft,
isSetOpen,
addSetOpen,
removeSetOpen,
changeSetOpen,
getTextSetOpen,
isSetProses,
addSetProses,
removeSetProses,
changeSetProses,
getTextSetProses,
isSetWelcome,
addSetWelcome,
removeSetWelcome,
changeSetWelcome,
getTextSetWelcome,
addSewaGroup,
getSewaExpired,
getSewaPosition,
expiredCheck,
checkSewaGroup,
addPay,
updatePay } = require("./lib/store")

async function getGroupAdmins(participants){
    let admins = []
    for (let i of participants) {
        i.admin === "superadmin" ? admins.push(i.id) :  i.admin === "admin" ? admins.push(i.id) : ''
    }
    return admins || []
}

async function generateRandomHexName(length) {
  return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

function capitalizeWords(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// ===========================================================================================

function selisihHari(e) {
  const t = new Date();
  const a = new Date(e).getTime() - t.getTime();
  const r = Math.floor(a / 864e5); // Selisih hari
  const n = Math.floor(a % 864e5 / 36e5); // Jam
  const i = Math.floor(a % 36e5 / 6e4); // Menit
  const o = Math.floor(a % 6e4 / 1e3); // Detik

  if (r === 0) {
      return `Hari ini, tersisa ${n} jam ${i} menit ${o} detik lagi`;
  } else if (r === 1) {
      return `Besok, tersisa 1 Hari ${n} jam ${i} menit ${o} detik lagi`;
  } else if (r === -1) {
      return 'Kemarin';
  } else if (r > 1) {
      return `${r} hari mendatang`;
  } else if (r < -1) {
      return `${Math.abs(r)} hari yang lalu`;
  } else {
      return void 0;
  }
}

function runtime(seconds) {

seconds = Number(seconds);

var d = Math.floor(seconds / (3600 * 24));
var h = Math.floor(seconds % (3600 * 24) / 3600);
var m = Math.floor(seconds % 3600 / 60);
var s = Math.floor(seconds % 60);
var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " hari, ") : "";
var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " jam, ") : "";
var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " menit, ") : "";
var sDisplay = s > 0 ? s + (s == 1 ? " second" : " detik") : "";
return dDisplay + hDisplay + mDisplay + sDisplay;
}
function msToDate(mse) {
           temp = mse
           days = Math.floor(mse / (24 * 60 * 60 * 1000));
           daysms = mse % (24 * 60 * 60 * 1000);
           hours = Math.floor((daysms) / (60 * 60 * 1000));
           hoursms = mse % (60 * 60 * 1000);
           minutes = Math.floor((hoursms) / (60 * 1000));
           minutesms = mse % (60 * 1000);
           sec = Math.floor((minutesms) / (1000));
           return days + " hari " + hours + " jam " + minutes + " Menit";
        }
        
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

const tanggal = (numer) => {
myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
            myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum’at','Sabtu']; 
            var tgl = new Date(numer);
            var day = tgl.getDate()
            bulan = tgl.getMonth()
            var thisDay = tgl.getDay(),
            thisDay = myDays[thisDay];
            var yy = tgl.getYear()
            var year = (yy < 1000) ? yy + 1900 : yy; 
            const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
            let d = new Date
            let locale = 'id'
            let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
            let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
            
            return`${thisDay}, ${day} ${myMonths[bulan]} ${year}`
}

module.exports = faykal = async (faykal, m, chatUpdate, store, opengc, setpay, antitoxic,antilinktg, antivirtex, antilinkgc, antiwame, antilinkgc2, antiwame2, set_welcome_db, set_left_db, set_proses, set_done, set_open, set_close, sewa, _welcome, _left, db_respon_list, antibott, antisaluran, set_bot, afk) => {
try {
    var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype === 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
    var budy = (typeof m.text == 'string' ? m.text : '')
    const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!`™©®Δ^βα¦|/\\©^]/gi) : '.'
    const isCmd = body.startsWith(prefix)
    const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() // pake prefix command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
    const args = body.trim().split(/ +/).slice(1)
    const sender = m.key.fromMe ? faykal.user.id.split(":")[0] + "@s.whatsapp.net" || faykal.user.id : m.key.participant || m.key.remoteJid;
    const senderNumber = sender.split('@')[0];
    const pushname = m.pushName || "No Name"
    const botNumber = await faykal.decodeJid(faykal.user.id)
    const isCreator = (m && m.sender && [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;
    const text = q = args.join(" ")
    const quoted = m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)
    let groupMetadata = null;
    let groupName = '';
    if (m.isGroup) {
    try {
        groupMetadata = await faykal.groupMetadata(m.chat);
        groupName = groupMetadata?.subject || 'Unknown Group';
    } catch (error) {
        console.error('Failed to fetch group metadata:', error);
        groupName = 'Unknown Group';
      }
    }
    const participants = m.isGroup ? (groupMetadata?.participants || []) : [];
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : [];
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const isSewa = checkSewaGroup(m.chat, sewa)
    const isAntiBot = antibott.includes(m.chat) ? true : false
    const isAntiLinkGc = antilinkgc.includes(m.chat) ? true : false
    const isAntiWame = antiwame.includes(m.chat) ? true : false  
    const isAntiLinkGc2 = antilinkgc2.includes(m.chat) ? true : false
    const isAntiWame2 = antiwame2.includes(m.chat) ? true : false
    const isAntiSalur = antisaluran.includes(m.chat) ? true : false
    const isAntiLinkTelegram = antilinktg.includes(m.chat) ? true : false
    const isAntiToxic = antitoxic.includes(m.chat) ? true : false
    const isAntiVirtex = antivirtex.includes(m.chat) ? true : false
    const isWelcome = _welcome.includes(m.chat)
    const isLeft = _left.includes(m.chat)
    const jam = moment().format("HH:mm:ss z")
    const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm z')
    const hariini = moment.tz('Asia/Jakarta').format('DD MMMM YYYY')
    const isAfkOn = checkAfkUser(m.sender, afk)

// ======== FAKE QUATED =========
    const feriv = { key: { participant: '0@s.whatsapp.net', remoteJid: '0@s.whatsapp.net'}, message: { conversation: '© Developed by faykal' }}
    const fkontak = {
      "key": {
        "participants":"0@s.whatsapp.net",
        "remoteJid": "status@broadcast",
        "fromMe": false,
        "id": "Halo"
      }, 
      "message": {
        "contactMessage": {
          "displayName": `${pushname}`,
          "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:${pushname}\nitem1.TEL;waid=628975144555:628975144555\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      },
      "participant": "0@s.whatsapp.net"
    }
    
    const fbcgc = {
      "key": {
        "participants":"0@s.whatsapp.net",
        "remoteJid": "status@broadcast",
        "fromMe": false,
        "id": "Halo"
      }, 
      "message": {
        "contactMessage": {
          "displayName": `Developer Botz`,
          "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:Developer Botz\nitem1.TEL;waid=628975144555:628975144555\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      },
      "participant": "0@s.whatsapp.net"
    }
// ======== FAKE REPLAY =========

const reply = (text) =>{
  m.reply(text)
}

//=============================================//

/*ADA 3 OPSI 
group buat only grup
private buat only private chat
both buat aktif keduanya*/

global.botDestination = "group"
const _command = m.text.substring(1, 10)

if (!isCreator) {
  if (global.botDestination === 'group' && !m.isGroup && !m.isCreator && !/owner/i.test(_command)) {
      console.log(`${chalk.redBright('[ ' + jam + ' ]')} ${chalk.redBright.bold('INFO : Bot hanya bisa digunakan di grup.')}`);
      return;
  }
  if (global.botDestination === 'private' && m.isGroup) {
      console.log(`${chalk.redBright('[ ' + jam + ' ]')} ${chalk.redBright.bold('INFO : Bot hanya bisa digunakan di pesan pribadi.')}`);
      return; // Menghentikan eksekusi jika dari grup
  }
}

async function getGcName(groupID) {
        try {
            let data_name = await faykal.groupMetadata(groupID)
            return data_name.subject
        } catch (err) {
            return '-'
        }
    }

// ========= NOTIFIKASI SEWA GROUP ==========

if(m.isGroup){
  expiredCheck(faykal, sewa)
}

setInterval(() => expiredNotification(faykal, sewa), 60000);

// ======== CONSOLE PESAN =========
if (m.message) {
faykal.readMessages([m.key])
var mdu = ['red','green','yellow','blue','magenta','cyan','white']
var halalu = mdu[Math.floor(Math.random() * mdu.length)]
var mdo = ['red','green','yellow','blue','magenta','cyan','white']
var halalo = mdo[Math.floor(Math.random() * mdo.length)]
var mdi = ['red','green','yellow','blue','magenta','cyan','white']
var halali = mdi[Math.floor(Math.random() * mdi.length)]
var mda = ['red','green','yellow','blue','magenta','cyan','white']
var halala = mda[Math.floor(Math.random() * mda.length)]
var mde = ['red','green','yellow','blue','magenta','cyan','white']
var halale = mde[Math.floor(Math.random() * mde.length)]

console.log('\x1b[30m--------------------\x1b[0m');
console.log(chalk.bgHex("#e74c3c").bold(`▢ New Message`));
console.log(
color(`⌬ Tanggal : `,`${halalu}`),color(`${tanggal(new Date())}\n`,`${halalo}`) +
color(`⌬ waktu : `,`${halale}`),color(`${time}\n`,`${halali}`) +
color(`⌬ Pesan : `,`${halalo}`),color(`${m.body || m.mtype}\n`,`${halala}`) +
color(`⌬ Pengirim : `,`${halali}`),color(`${pushname}\n`,`${halale}`) +
color(`⌬ Nomor : `,`${halala}`),color(`${senderNumber}`,`${halali}`)) 
  
if (m.isGroup) {
console.log(
color(`⌬ Grup : `, `${halalu}`),color(`${groupName}\n`, `${halalo}`) +
color(`⌬ GroupId : `, `${halale}`),color(`${m.chat}`, `${halalu}`));
}
console.log();
}

//======================================== KEAMANAN ===================================

if (isAntiSalur) {
  if (budy.match(`whatsapp.com/channel`)) {
  if (isAdmins) return
  if (m.key.fromMe) return
  if (isCreator) return
                 await faykal.sendMessage(m.chat,
            {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
              }
      }

      if (isAntiBot) {
        const prefixes = ["B1EY","3EB0"];
        if (prefixes.some(prefix => m.id.startsWith(prefix))) {
            if (!isBotAdmins) {
                return m.reply('Bot Bukan Admin T-T');
            }
            if (!isAdmins) {
                await m.reply("*ANOTHER BOT DETECT*\n\n> Husshhh, pergi dari grup ini!");
                if (m.chat && m.sender) {
                    await faykal.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                } else {
                    console.error("Chat atau sender tidak valid");
                }
            }
        }
    }

  if (isAntiLinkGc) {
    if (budy.match(`chat.whatsapp.com`)) {
    //m.reply(`*「 ANTI LINK 」*\n\nLink grup detected, maaf kamu akan di kick !`)
    if (!isBotAdmins) return m.reply(`Upsss... gajadi, bot bukan admin`)
    var link = /chat.whatsapp.com|buka tautaniniuntukbergabungkegrupwhatsapp/gi
    if (link.test(m.text)) {
    let gclink = (`https://chat.whatsapp.com/`+await faykal.groupInviteCode(m.chat))
    let isLinkThisGc = new RegExp(gclink, 'i')
    let isgclink = isLinkThisGc.test(m.text)
    if (isgclink) return //m.reply(`Upsss... gak jadi, untung link gc sendiri`)
    if (isAdmins) return //m.reply(`Upsss... gak jadi, kasian adminnya klo di kick`)
    if (isCreator) return //m.reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
    if (m.key.fromMe) return //m.reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
await faykal.sendMessage(m.chat, {
           delete: {
              remoteJid: m.chat,

              fromMe: false,
              id: m.key.id,
              participant: m.key.participant
           }
        })
        faykal.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }
    }}
  if (isAntiLinkGc2) {
    if (budy.match(`chat.whatsapp.com`)) {
    if (!isBotAdmins) return //m.reply(`Upsss... gajadi, bot bukan admin`)
    if (!isBotAdmins) return m.reply(`Upsss... gajadi, bot bukan admin`)
    var link = /chat.whatsapp.com|buka tautaniniuntukbergabungkegrupwhatsapp/gi
    if (link.test(m.text)) {
    let gclink = (`https://chat.whatsapp.com/`+await faykal.groupInviteCode(m.chat))
    let isLinkThisGc = new RegExp(gclink, 'i')
    let isgclink = isLinkThisGc.test(m.text)
    if (isgclink) return //m.reply(`Upsss... gak jadi, untung link gc sendiri`)
    if (isAdmins) return //m.reply(`Upsss... gak jadi, kasian adminnya klo di kick`)
    if (isCreator) return //m.reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
    if (m.key.fromMe) return //m.reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
await faykal.sendMessage(m.chat, {
           delete: {
              remoteJid: m.chat,

              fromMe: false,
              id: m.key.id,
              participant: m.key.participant
           }
        })
    }
    }}
  if (isAntiWame) {
    if (budy.match(`wa.me/`)) {
    // m.reply(`*「 ANTI WA ME 」*\n\nWa Me detected, maaf kamu akan di kick !`)
    if (!isBotAdmins) return //m.reply(`Upsss... gajadi, bot bukan admin`)
    if (isAdmins) return //m.reply(`Upsss... gak jadi, kasian adminnya klo di kick`)
    if (isCreator) return //m.reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
    if (m.key.fromMe) return //m.reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
await faykal.sendMessage(m.chat, {
           delete: {
              remoteJid: m.chat,

              fromMe: false,
              id: m.key.id,
              participant: m.key.participant
           }
        })        
        faykal.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }
    }
  if (isAntiWame2) {
    if (budy.match(`wa.me/`)) {
    if (!isBotAdmins) return //m.reply(`Upsss... gajadi, bot bukan admin`)
    if (isAdmins) return //m.reply(`Upsss... gak jadi, kasian adminnya klo di kick`)
    if (isCreator) return //m.reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
    if (m.key.fromMe) return //m.reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
await faykal.sendMessage(m.chat, {
           delete: {
              remoteJid: m.chat,

              fromMe: false,
              id: m.key.id,
              participant: m.key.participant
           }
        })        
    }
    }

  if (isAntiVirtex) {
    if (budy.length > 3500) {
    if (!isBotAdmins) return reply('_Bot Harus Menjadi Admin Terlebih Dahulu_')
            await faykal.sendMessage(m.chat,
            {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
        
        faykal.sendMessage(m.chat, {text:`\`\`\`「 Virus Detected 」\`\`\`\n\n@${m.sender.split("@")[0]}  because of sending virus in this group`, contextInfo:{mentionedJid:[m.sender]}}, {quoted:m})
        
    }
    }
  
  if (isAntiToxic)
  if (budy.includes("kontol") || budy.includes("kntl") || budy.includes("mmk") || budy.includes("pepek") || budy.includes("memek") || budy.includes("anjing") || budy.includes("ajg") || budy.includes("anjg")) {
  if (m.text) {
  bvl = `jangan toxic lah`
  if (isAdmins) return reply(bvl)
  if (m.key.fromMe) return reply(bvl)
  if (isCreator) return reply(bvl)
          await faykal.sendMessage(m.chat,
            {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
        await faykal.sendMessage(m.chat, {text:`jangan toxic lah`, contextInfo:{mentionedJid:[m.sender]}}, {quoted:m})}
} else {
}
  
  if (isAntiLinkTelegram)
     if (budy.includes("https://t.me/")){
  if (AntiLinkTelegram)
  if (!isBotAdmins) return
  bvl = `\`\`\`「 Telegram Link Detected 」\`\`\`\n\nAdmin kirim link telegram, admin mah bebas kirim link apapun😇`
  if (isAdmins) return reply(bvl)
  if (m.key.fromMe) return reply(bvl)
  if (isCreator) return reply(bvl)
          await faykal.sendMessage(m.chat,
            {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
        
  faykal.sendMessage(m.chat, {text:`\`\`\`「 Telegram Link Detected 」\`\`\`\n\n@${m.sender.split("@")[0]} Telah di kick karena mengirim tautan telegram di grup ini`, contextInfo:{mentionedJid:[m.sender]}}, {quoted:m})
} else {
}

// ===================================================================================================================

    if (isAlreadyResponList((m.isGroup ? m.chat: botNumber), body.toLowerCase(), db_respon_list)) {
        var get_data_respon = getDataResponList((m.isGroup ? m.chat: botNumber), body.toLowerCase(), db_respon_list)
        if (get_data_respon.isImage === false) {
          faykal.sendMessage(m.chat, { text: sendResponList((m.isGroup ? m.chat: botNumber), body.toLowerCase(), db_respon_list) }, {
                quoted: m
            })
        } else {
          faykal.sendMessage(m.chat, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
                quoted: m
            })
        }
    }

    if (m.isGroup && !m.key.fromMe) {
			let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
			for (let ment of mentionUser) {
				if (checkAfkUser(ment, afk)) {
					let getId2 = getAfkId(ment, afk)
					let getReason2 = getAfkReason(getId2, afk)
					let getTimee = Date.now() - getAfkTime(getId2, afk)
					let anu2 = ms(getTimee)
					reply(
						`𝖾𝗁, 𝗃𝖺𝗇𝗀𝖺𝗇 𝖽𝗂 𝗍𝖺𝗀 𝖽𝗎𝗅𝗎 𝗒𝖺! 𝖺𝖽𝗆𝗂𝗇 𝗅𝖺𝗀𝗂 𝖠𝖥𝖪 𝗇𝗂𝗁 🤭\n\n` +
						`*𝖺𝗅𝖺𝗌𝖺𝗇 :* ${getReason2}\n` +
						`*𝗌𝖾𝗃𝖺𝗄 :* ${anu2.hours} 𝗃𝖺𝗆, ${anu2.minutes} 𝗆𝖾𝗇𝗂𝗍, ${anu2.seconds} 𝖽𝖾𝗍𝗂𝗄`
					)
				}
			}

			if (checkAfkUser(m.sender, afk)) {
				let getId = getAfkId(m.sender, afk)
				let getReason = getAfkReason(getId, afk)
				let getTime = Date.now() - getAfkTime(getId, afk)
				let anu = ms(getTime)
				afk.splice(getAfkPosition(m.sender, afk), 1)
				fs.writeFileSync('./database/afk.json', JSON.stringify(afk))
				faykal.sendTextWithMentions(
					m.chat, 
					`𝗒𝖾𝖺𝗒! @${m.sender.split('@')[0]} 𝗎𝖽𝖺𝗁 𝖻𝖺𝗅𝗂𝗄 𝖽𝖺𝗋𝗂 𝖠𝖥𝖪 𝗇𝗂𝗁 🥳\n\n` +
					`*𝖺𝗅𝖺𝗌𝖺𝗇 :* ${getReason}\n` +
					`*𝗌𝖾𝗅𝖺𝗆𝖺 :* ${anu.hours} 𝗃𝖺𝗆, ${anu.minutes} 𝗆𝖾𝗇𝗂𝗍, ${anu.seconds} 𝖽𝖾𝗍𝗂𝗄`, 
					m
				)
			}
		}

// =========================================================================================================================================
    switch(command) {
      case 'owner': {
        let list = [{
              displayName: "𝐑𝐚𝐣𝐚 𝐈𝐛𝐥𝐢𝐬",
              vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${namaowner}\nFN:${namaowner}\nitem1.TEL;waid=${owner}:${owner}\nitem1.X-ABLabel:Ponsel\nitem1.URL:https://faykalbotz.my.id\nitem1.X-ABLabel:Internet\nitem2.ADR:;;Banjarnegara, Jawa Tengah, Indonesia;;;;\nitem2.X-ABLabel:Region\nEND:VCARD`,
              }]
           faykal.sendMessage(m.chat, {
                    contacts: {
                        displayName: `${list.length} Kontak`,
                        contacts: list
                    }
                }, { quoted: m })
        }
        let media = `https://autoresbot.com/tmp_files/6b0f7c0f-9b02-4b93-8259-eb4ff6af5198.png`
        await faykal.sendImageAsSticker(m.chat, media, m, { packname: `owner faykal` });
        break
     case 'help':{
      if (!m.isGroup) return
      if (!isAdmins) return
      let anu = `╭┈┈「 *Information Bot* 」
┆✗ Name Bot : [ Klee Botz ]
┆✗ Library : [ Baileys-MD ]
┆✗ Owner : [ Faykal ]
┆✗ Platform : [ Linux ]
╰┈┈┈┈┈┈┈┈┈❖
    
╭┈┈「 *STORE* 」
┆✦ list
┆✦ addlist
┆✦ updatelist
┆✦ dellist
┆✦ renamelist
╰┈┈┈┈┈┈┈┈┈❖
╭┈┈「 *PROSES/DONE* 」
┆✦ proses/p
┆✦ done/d
┆✦ setproses
┆✦ changeproses
┆✦ delsetproses
┆✦ setdone
┆✦ changedone
┆✦ delsetdone
╰┈┈┈┈┈┈┈┈┈❖
╭┈┈「 *BOT* 」
┆✦ setbot
┆✦ updatesetbot
┆✦ delsetbot
┆✦ bot
╰┈┈┈┈┈┈┈┈┈❖
╭┈┈「 *WELCOME/LEFT* 」
┆✦ welcome on/off
┆✦ left on/off
┆✦ setwelcome
┆✦ changewelcome
┆✦ delsetwelcome
┆✦ setleft
┆✦ changeleft
┆✦ delsetleft
╰┈┈┈┈┈┈┈┈┈❖
╭┈┈「 *OPEN/CLOSE* 」
┆✦ open
┆✦ close
┆✦ setopen
┆✦ changeopen
┆✦ delsetopen
┆✦ setclose
┆✦ changeclose
┆✦ delsetclose
╰┈┈┈┈┈┈┈┈┈❖
╭┈┈「 *KEAMANAN* 」
┆✦ antilinkgc on/off
┆✦ antilinkgc2 on/off
┆✦ antiwame on/off
┆✦ antiwame2 on/off
┆✦ antisaluran on/off
┆✦ antilinktg on/off
┆✦ antivirtex on/off
┆✦ antitoxic on/off
╰┈┈┈┈┈┈┈┈┈❖
╭┈┈「 *GROUP* 」
┆✦ hidetag
┆✦ kick
┆✦ closetime
┆✦ opentime
┆✦ ceksewa
┆✦ delete
┆✦ setppgc
┆✦ setnamegc
┆✦ setdesgc
┆✦ linkgc
┆✦ resetlinkgc
┆✦ promote
┆✦ demote
┆✦ gcstatus
┆✦ jeda
┆✦ afk
╰┈┈┈┈┈┈┈┈┈❖
╭┈┈「 *KALKULATOR* 」
┆✦ tambah
┆✦ kurang
┆✦ kali
┆✦ bagi
╰┈┈┈┈┈┈┈┈┈❖
╭┈┈「 *STALK GAME* 」
┆✦ cekwr
┆✦ ffid
┆✦ mlid
┆✦ regml
╰┈┈┈┈┈┈┈┈┈❖
╭┈┈「 *RANDOM* 」
┆✦ sticker
┆✦ qc
┆✦ qc2
╰┈┈┈┈┈┈┈┈┈❖
╭┈┈「 *OWNER* 」
┆✦ addsewa
┆✦ delsewa
┆✦ listsewa
┆✦ delsession
┆✦ getsession
┆✦ listgc
┆✦ backupsc
┆✦ getdb
┆✦ getip
┆✦ getidch
┆✦ bcgc
┆✦ bcgctag
╰┈┈┈┈┈┈┈┈┈❖
_© Create by Faykal_`
        m.reply(anu)
      }
break
// MENU STORE ==========================================================================================================================
case 'list':{
  if (!m.isGroup) return
  if (db_respon_list.length === 0) return m.reply(`Belum ada list di group ini`)
  if (!isAlreadyResponListGroup((m.isGroup ? m.chat: botNumber), db_respon_list)) return m.reply(`Belum ada list di group ini`)
    let teks = `˚˖𓍢ִ໋🦢˚ 안녕 𝗁𝖾𝗅𝗅𝗈𝗐 𝗌𝗐𝖾𝖾𝗍𝗂𝖾 *${pushname}*, 𝗐𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 *${groupName}*, 𝖻𝖾𝗅𝗈𝗐 𝖺𝗋𝖾 𝗌𝗈𝗆𝖾 𝗈𝖿 𝗍𝗁𝖾 𝗅𝗂𝗌𝗍 𝗍𝗁𝖺𝗍 𝗐𝖾 𝗌𝗁𝗈𝗐, 𝗐𝖾 𝗁𝗈𝗉𝖾 𝗒𝗈𝗎 𝗅𝗂𝗄𝖾 𝗍𝗁𝖾𝗆 ᡣ𐭩\n행복한 쇼핑 ~ \n\n   ╭∘₊───✧₊∘. my 𝖼𝖺𝗍𝖺𝗅𝗈𝗀𝗎𝖾₊∘.\n`
    let sortedList = db_respon_list.filter(i => i.id === m.chat).sort((a, b) => {
    if (a.key < b.key) return -1;
    if (a.key > b.key) return 1;
      return 0;
  })
  for (let i of sortedList) {
      teks += `   ╰┈ ☁︎ *${i.key}*\n`
  }
      teks += `   ╰┄ ──── જ⁀➴۫\n\n𝗻𝗼𝘁𝗲:\n♡ 𝖽𝗈𝗇'𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 !! 𝗍𝗒𝗉𝖾 *𝗅𝗂𝗌𝗍* 𝗍𝗈 𝗌𝖾𝖾 𝗉𝗋𝗈𝖽𝗎𝖼𝗍 𝖽𝖾𝗍𝖺𝗂𝗅𝗌 𝗒𝖺𝗐𝗐 !`
    faykal.sendMessage(m.chat, {text: teks, mentions: [m.sender]}, {quoted:m})
}
  break
  case'addlist':{
    if (!m.isGroup) return
    if (!(m.isGroup? isAdmins : isCreator)) return
    let med = m.quoted ? m.quoted : m;
    try {
      const uploadToSupa = async (buffer) => {
      const FormData = require('form-data');
      const { fromBuffer } = require('file-type');
      const fetch = (await import('node-fetch')).default;
  
      let { ext } = await fromBuffer(buffer);
      let bodyForm = new FormData();
      bodyForm.append("file", buffer, "file." + ext);
      let res = await fetch("https://i.supa.codes/api/upload", {
      method: "post",
      body: bodyForm,
      });
      let data = await res.json();
      let resultUrl = data
      return resultUrl.link
    }
    var args1 = q.split("@")[0].toLowerCase()
    var args2 = q.split("@")[1]
    if (!q.includes("@")) return m.reply(`Gunakan dengan cara ${command} *key@response*\n\nContoh : ${command} tes@raja iblis\n\n*NOTE !!!*\njangan ada spasi diantara tanda *@*`)
    if (isAlreadyResponList((m.isGroup ? m.chat :botNumber), args1, db_respon_list)) return m.reply(`respon dengan key : *${args1}* sudah ada di list ini.`)
    if(m.isGroup){
    if (/image/.test(mime)) {
        let media = await med.download();
        let mem = await uploadToSupa(media)
                addResponList(m.chat, args1, args2, true, mem, db_respon_list)
                reply(`Sukses menambahkan list *${args1}*`)
                if (fs.existsSync(media)) fs.unlinkSync(media)
    } else {
        addResponList(m.chat, args1, args2, false, '-', db_respon_list)
        reply(`Sukses menambahkan list *${args1}*`)
     }
    }
  }
    catch (err) {
      console.error(err)
      m.reply(mess.kalleror)
   }
  }
    break
    case 'updatelist': case 'update':{
      if (!m.isGroup) return
      if (!(m.isGroup? isAdmins : isCreator)) return
      let med = m.quoted ? m.quoted : m;
      try {
        const uploadToSupa = async (buffer) => {
        const FormData = require('form-data');
        const { fromBuffer } = require('file-type');
        const fetch = (await import('node-fetch')).default;
      
        let { ext } = await fromBuffer(buffer);
        let bodyForm = new FormData();
        bodyForm.append("file", buffer, "file." + ext);
        let res = await fetch("https://i.supa.codes/api/upload", {
        method: "post",
        body: bodyForm,
        });
        let data = await res.json();
        let resultUrl = data
        return resultUrl.link
        }
      var args1 = q.split("@")[0].toLowerCase()
      var args2 = q.split("@")[1]
      if (!q.includes("@")) return m.reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@raja iblis`)
      if (!isAlreadyResponList((m.isGroup? m.chat: botNumber), args1, db_respon_list)) return m.reply(`Maaf, untuk key *${args1}* belum terdaftar di chat ini`)
      if (/image/.test(mime)) {
        let media = await med.download();
        let mem = await uploadToSupa(media)
        updateResponList((m.isGroup? m.chat: botNumber), args1, args2, true, mem, db_respon_list)
        reply(`Sukses update list *${args1}*`)
        if (fs.existsSync(media)) fs.unlinkSync(media)
      } else {
          updateResponList((m.isGroup? m.chat: botNumber), args1, args2, false, '-', db_respon_list)
          reply(`Sukses update list *${args1}*`)
      }
      }
      catch (err) {
        console.error(err)
        m.reply(mess.kalleror)
    }
      }
      break
  case 'dellist':{
  if (!m.isGroup) return
  if (!(m.isGroup? isAdmins : isCreator)) return
  if (db_respon_list.length === 0) return m.reply(`Belum ada list di group`)
  if (!text) return m.reply(`Gunakan dengan cara ${prefix + command} *key*\n\n_Contoh_\n\n${prefix + command} hello`)
  if (!isAlreadyResponList((m.isGroup? m.chat: botNumber), q.toLowerCase(), db_respon_list)) return m.reply(`tidak ada list dengan key *${q}* tidak ada di database, jika ada kesalahan dalam input list segera hubungi owner!`)
  delResponList((m.isGroup? m.chat: botNumber), q.toLowerCase(), db_respon_list)
  reply(`Sukses delete list *${q}*`)
  }
  break
  case 'rename':
  case 'renamelist': {
    if (!m.isGroup) return
    if (!(m.isGroup? isAdmins : isCreator)) return
          var args1 = q.split("@")[0].toLowerCase()
          var args2 = q.split("@")[1]
          if (!q.includes("@")) return m.reply(`Gunakan dengan cara ${prefix+command} *key@new key*\n\n_Contoh_\n\n${prefix+command} list dm@list dm baru`)
          if (!isAlreadyResponList((m.isGroup? m.chat: botNumber), args1, db_respon_list)) return m.reply(`Maaf, untuk key *${args1}* belum terdaftar di chat ini`)
          renameList((m.isGroup? m.chat: botNumber), args1, args2, db_respon_list)
          reply(`Sukses ganti nama list`)
  }
  break
// MENU PROSES DONE ===================================================================================================================
case 'setproses': case 'setp':{
  if (!(m.isGroup? isAdmins : isCreator)) return
      if (!text) return m.reply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Pesanan sedang di proses ya @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
      if (isSetProses((m.isGroup? m.chat: botNumber), set_proses)) return m.reply(`Set proses already active`)
      addSetProses(text, (m.isGroup? m.chat: botNumber), set_proses)
      reply(`✅ Done set proses!`)
  }
      break
  case 'changeproses': case 'changep':{
  if (!(m.isGroup? isAdmins : isCreator)) return
      if (!text) return m.reply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Pesanan sedang di proses ya @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
      if (isSetProses((m.isGroup? m.chat: botNumber), set_proses)) {
          changeSetProses(text, (m.isGroup? m.chat: botNumber), set_proses)
          m.reply(`Sukses ubah set proses!`)
      } else {
          addSetProses(text, (m.isGroup? m.chat: botNumber), set_proses)
          m.reply(`Sukses ubah set proses!`)
      }
  }
      break
  case 'delsetproses': case 'delsetp':{
  if (!(m.isGroup? isAdmins : isCreator)) return
      if (!isSetProses((m.isGroup? m.chat: botNumber), set_proses)) return m.reply(`Belum ada set proses di gc ini`)
      removeSetProses((m.isGroup? m.chat: botNumber), set_proses)
      reply(`Sukses delete set proses`)
  }
      break
  case 'setdone':{
  if (!(m.isGroup? isAdmins : isCreator)) return
      if (!text) return m.reply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Done @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
      if (isSetDone((m.isGroup? m.chat: botNumber), set_done)) return m.reply(`Udh set done sebelumnya`)
      addSetDone(text, (m.isGroup? m.chat: botNumber), set_done)
      reply(`Sukses set done!`)
      break
      }
     case 'changedone': case 'changed':{
  if (!(m.isGroup? isAdmins : isCreator)) return
      if (!text) return m.reply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Done @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
      if (isSetDone((m.isGroup? m.chat: botNumber), set_done)) {
          changeSetDone(text, (m.isGroup? m.chat: botNumber), set_done)
          m.reply(`Sukses ubah set done!`)
      } else {
          addSetDone(text, (m.isGroup? m.chat: botNumber), set_done)
          m.reply(`Sukses ubah set done!`)
      }
     }
      break
  case 'delsetdone': case 'delsetd':{
  if (!(m.isGroup? isAdmins : isCreator)) return
      if (!isSetDone((m.isGroup? m.chat: botNumber), set_done)) return m.reply(`Belum ada set done di gc ini`)
      removeSetDone((m.isGroup? m.chat: botNumber), set_done)
      m.reply(`Sukses delete set done`)
  }
      break
      case"p": case"proses":{
  if (!(m.isGroup? isAdmins : isCreator)) return
      if (!m.quoted) return m.reply('Reply pesanan yang akan proses')
      let tek = m.quoted ? quoted.text : quoted.text.split(args[0])[1]
      let proses = `╭┈ 𝅄 𖤅  𝘁𝗿𝗮𝗻𝘀𝗮𝗸𝘀𝗶 𝗽𝗿𝗼𝘀𝗲𝘀 ◌ 𖣁 
│          ˗ˏˋ ꒰ 𝗮𝗱𝗺𝗶𝗻 || 𝘀𝘁𝗼𝗿𝗲‌ ꒱ ˎˊ˗
│
│ʚɞ 𝘁𝗮𝗻𝗴𝗴𝗮𝗹 ⵓ @tanggal 
│ʚɞ 𝗷𝗮𝗺 ⵓ @jam
│ʚɞ 𝘀𝘁𝗮𝘁𝘂𝘀 ⵓ 𝗽𝗿𝗼𝘀𝗲𝘀 🔄  
╰────────────────────  
 𝗽𝗲𝘀𝗮𝗻𝗮𝗻 @user 𝘀𝗲𝗱𝗮𝗻𝗴 𝗱𝗶 𝗽𝗿𝗼𝘀𝗲𝘀!`
      const getTextP = getTextSetProses((m.isGroup? m.chat: botNumber), set_proses);
      if (getTextP !== undefined) {
          var anunya = (getTextP.replace('@pesanan', tek ? tek : '-').replace('@user', '@' + m.quoted.sender.split("@")[0]).replace('@jam', time).replace('@tanggal', tanggal(new Date())).replace('@user', '@' + m.quoted.sender.split("@")[0]))
          faykal.sendTextWithMentions(m.chat, anunya, m)
      } else {
        faykal.sendTextWithMentions(m.chat, (proses.replace('@pesanan', tek ? tek : '-').replace('@user', '@' + m.quoted.sender.split("@")[0]).replace('@jam', time).replace('@tanggal', tanggal(new Date())).replace('@user', '@' + m.quoted.sender.split("@")[0])), m)
      }
      }
      break
      case "d": case'done':{
  if (!(m.isGroup? isAdmins : isCreator)) return
      if (!m.quoted) return m.reply('Reply pesanan yang telah di proses')
      let tek = m.quoted ? quoted.text : quoted.text.split(args[0])[1]
      let sukses = `╭┈ 𝅄 𖤅  𝘁𝗿𝗮𝗻𝘀𝗮𝗸𝘀𝗶 𝗯𝗲𝗿𝗵𝗮𝘀𝗶𝗹 ◌ 𖣁 
│           ˗ˏˋ ꒰ 𝗮𝗱𝗺𝗶𝗻 || 𝘀𝘁𝗼𝗿𝗲‌ ꒱ ˎˊ˗
│
│ʚɞ 𝘁𝗮𝗻𝗴𝗴𝗮𝗹 ⵓ @tanggal       
│ʚɞ 𝗷𝗮𝗺 ⵓ @jam
│ʚɞ 𝘀𝘁𝗮𝘁𝘂𝘀 ⵓ 𝗱𝗼𝗻𝗲 ✅             
╰──────────────────── 
𖣁 𝘁𝗶𝗺𝗮𝗸𝗮𝘀𝗶 @user 𝗻𝗲𝘅𝘁 𝗼𝗿𝗱𝗲𝗿 𝘆𝗮  !`            
      const getTextD = getTextSetDone((m.isGroup? m.chat: botNumber), set_done);
      if (getTextD !== undefined) {
          var anunya = (getTextD.replace('@pesanan', tek ? tek : '-').replace('@user', '@' + m.quoted.sender.split("@")[0]).replace('@jam', time).replace('@tanggal', tanggal(new Date())).replace('@user', '@' + m.quoted.sender.split("@")[0]))
          faykal.sendTextWithMentions(m.chat, anunya, m)
         } else {
          faykal.sendTextWithMentions(m.chat, (sukses.replace('@pesanan', tek ? tek : '-').replace('@user', '@' + m.quoted.sender.split("@")[0]).replace('@jam', time).replace('@tanggal', tanggal(new Date())).replace('@user', '@' + m.quoted.sender.split("@")[0])), m)
         }
}
break
// MENU SET BOT ======================================================================================================================
case 'bot':{
  var bot = `ada apa sayang ?`
  const getTextB = getTextSetBot((m.isGroup? m.chat: botNumber), set_bot);
  if (getTextB !== undefined) {
      var pull_pesan = (getTextB.replace('@bot', namabot).replace('@owner', namaowner).replace('@jam', time).replace('@tanggal', tanggal(new Date())))
      faykal.sendMessage(m.chat, { text: `${pull_pesan}` }, { quoted: m })
  } else {
    faykal.sendMessage(m.chat, { text: bot }, { quoted: m })
  }
}
  break
case "updatesetbot": case 'setbot': case 'changebot':{
  if (!(m.isGroup? isAdmins : isCreator)) return
  if (!q) return reply(`Gunakan dengan cara ${command} *teks_bot*\n\n_Contoh_\n\n${command} Halo saya adalah @bot\n\n@bot = nama bot\n@owner = nama owner\n@jam = jam\n@tanggal = tanggal`)
  if (isSetBot((m.isGroup? m.chat: botNumber), set_bot)) {
      changeSetBot(q, (m.isGroup? m.chat: botNumber), set_bot)
      reply(`Sukses update set bot teks!`)
  } else {
      addSetBot(q, (m.isGroup? m.chat: botNumber), set_bot)
      reply(`Sukses set teks bot!`)
  }
}
  break
case 'delsetbot':{
  if (!(m.isGroup? isAdmins : isCreator)) return
  if (!isSetBot((m.isGroup? m.chat: botNumber), set_bot)) return reply(`Belum ada set bot di chat ini`)
  removeSetBot((m.isGroup? m.chat: botNumber), set_bot)
  reply(`Sukses delete set bot`)
}
  break
// MENU WELCOME/LEFT ===================================================================================================================
case'welcome':{
  if (!m.isGroup) return
  if (!isAdmins) return
  if (args[0] === "on") {
     if (isWelcome) return m.reply(`Udah on`)
      _welcome.push(m.chat)
      fs.writeFileSync('./database/welcome.json', JSON.stringify(_welcome, null, 2))
      reply('Sukses mengaktifkan welcome di grup ini')
  } else if (args[0] === "off") {
     if (!isWelcome) return m.reply(`Udah off`)
      let anu = _welcome.indexOf(m.chat)
     _welcome.splice(anu, 1)
      fs.writeFileSync('./database/welcome.json', JSON.stringify(_welcome, null, 2))
      reply('Sukses menonaktifkan welcome di grup ini')
  } else {
      reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
  }
  }
  break
case'left': case 'goodbye':{
  if (!m.isGroup) return
  if (!isAdmins) return
  if (args[0] === "on") {
     if (isLeft) return m.reply(`Udah on`)
      _left.push(m.chat)
      fs.writeFileSync('./database/left.json', JSON.stringify(_left, null, 2))
      reply('Sukses mengaktifkan goodbye di grup ini')
  } else if (args[0] === "off") {
     if (!isLeft) return m.reply(`Udah off`)
      let anu = _left.indexOf(m.chat)
     _left.splice(anu, 1)
      fs.writeFileSync('./database/left.json', JSON.stringify(_left, null, 2))
      reply('Sukses menonaktifkan goodbye di grup ini')
  } else {
      reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
  }
}
  break
  case'setwelcome':{
  if (!m.isGroup) return
  if (!isCreator && !isAdmins) return
  if (!text) return m.reply(`Gunakan dengan cara ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
  if (isSetWelcome(m.chat, set_welcome_db)) return m.reply(`Set welcome already active`)
  addSetWelcome(text, m.chat, set_welcome_db)
 reply(`Successfully set welcome!`)
  }
  break
case'changewelcome':{
  if (!m.isGroup) return
  if (!isCreator && !isAdmins) return
  if (!text) return m.reply(`Gunakan dengan cara ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
  if (isSetWelcome(m.chat, set_welcome_db)) {
     changeSetWelcome(q, m.chat, set_welcome_db)
      reply(`Sukses change set welcome teks!`)
  } else {
    addSetWelcome(q, m.chat, set_welcome_db)
      reply(`Sukses change set welcome teks!`)
  }}
  break
case'delsetwelcome':{
  if (!m.isGroup) return
  if (!isCreator && !isAdmins) return
  if (!isSetWelcome(m.chat, set_welcome_db)) return m.reply(`Belum ada set welcome di sini..`)
  removeSetWelcome(m.chat, set_welcome_db)
 reply(`Sukses delete set welcome`)
}
  break
case'setleft':{
  if (!m.isGroup) return
  if (!isCreator && !isAdmins) return
  if (!text) return m.reply(`Gunakan dengan cara ${prefix + command} *teks_left*\n\n_Contoh_\n\n${prefix + command} Halo @user, Selamat tinggal dari @group`)
  if (isSetLeft(m.chat, set_left_db)) return m.reply(`Set left already active`)
 addSetLeft(q, m.chat, set_left_db)
  reply(`Successfully set left!`)
}
  break
case'changeleft':{
  if (!m.isGroup) return
  if (!isCreator && !isAdmins) return
  if (!text) return m.reply(`Gunakan dengan cara ${prefix + command} *teks_left*\n\n_Contoh_\n\n${prefix + command} Halo @user, Selamat tinggal dari @group`)
  if (isSetLeft(m.chat, set_left_db)) {
     changeSetLeft(q, m.chat, set_left_db)
      reply(`Sukses change set left teks!`)
  } else {
      addSetLeft(q, m.chat, set_left_db)
      reply(`Sukses change set left teks!`)
  }
}
  break
case'delsetleft':{
  if (!m.isGroup) return
  if (!isCreator && !isAdmins) return
  if (!isSetLeft(m.chat, set_left_db)) return m.reply(`Belum ada set left di sini..`)
  removeSetLeft(m.chat, set_left_db)
  reply(`Sukses delete set left`)
}
  break
// MENU OPEN/CLOSE =================================================================================================================
case'open':{
  if (!m.isGroup) return
      if (!isAdmins) return
      if (!isBotAdmins) return m.reply(mess.botAdmin)
        faykal.groupSettingUpdate(m.chat, 'not_announcement')
  const textOpen = await getTextSetOpen(m.chat, set_open);
  reply(textOpen || `𝗵𝗲𝗹𝗹𝗼 !! ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა
𝘁𝗵𝗶𝘀 𝘀𝘁𝗼𝗿𝗲 𝗼𝗽𝗲𝗻
          
ʚɞ 𝗸𝗲𝘁𝗶𝗸 𝗹𝗶𝘀𝘁 𝘂𝗻𝘁𝘂𝗸 𝗹𝗶𝗵𝗮𝘁 𝘆𝗮𝗻𝗴 𝗺𝗮𝘂 𝗸𝗮𝗺𝘂 𝗯𝗲𝗹𝗶 𝘆𝗮𝗮 ʚɞ
          
𝗮𝘆𝗼𝗼 𝗺𝗮𝗿𝗶 𝗷𝗮𝗷𝗮𝗻 !!⸜(｡˃ ᵕ ˂ )⸝♡`)
  }
  break
  case'setopen':{
      if (!m.isGroup) return
      if (!isCreator && !isAdmins) return
      if (!text) return m.reply(`Gunakan dengan cara ${command} *teks_open*\n\n_Contoh_\n\n${command} Halo grup sudah open kembali`)
      if (isSetOpen(m.chat, set_open)) return m.reply(`Set open already active`)
      addSetOpen(text, m.chat, set_open)
     reply(`Successfully set open!`)
      }
      break
  case'changeopen':{
      if (!m.isGroup) return
      if (!isCreator && !isAdmins) return
      if (!text) return m.reply(`Gunakan dengan cara ${command} *teks_open*\n\n_Contoh_\n\n${command} Halo Halo grup sudah open kembali`)
      if (isSetOpen(m.chat, set_open)) {
         changeSetOpen(q, m.chat, set_open)
          reply(`Sukses change set open teks!`)
      } else {
        addSetOpen(q, m.chat, set_open)
          reply(`Sukses change set open teks!`)
      }}
      break
  case'delsetopen':{
      if (!m.isGroup) return
      if (!isCreator && !isAdmins) return
      if (!isSetOpen(m.chat, set_open)) return m.reply(`Belum ada set open di sini..`)
      removeSetOpen(m.chat, set_open)
     reply(`Sukses delete set open`)
  }
      break
case'close':{
  if (!m.isGroup) return
      if (!isAdmins) return
      if (!isBotAdmins) return m.reply(mess.botAdmin)
        faykal.groupSettingUpdate(m.chat, 'announcement')
  const textClose = await getTextSetClose(m.chat, set_close);
  reply(textClose || `𝘆𝗮𝗵𝗵 𝘀𝗮𝗮𝘁 𝗻𝘆𝗮 𝗸𝗶𝘁𝗮 𝗰𝗹𝗼𝘀𝗲 𝗴𝗮𝗶𝘀 !! ૮(˶╥︿╥)ა

𝗷𝗮𝗷𝗮𝗻 𝗹𝗮𝗴𝗶 𝗯𝗲𝘀𝗼𝗸 𝘆𝗮𝗵𝗵 (੭˃ᴗ˂)੭
𝘀𝗲𝗲 𝘆𝗼𝘂 , 𝗱𝗮𝗱𝗮𝗵 !! 𖹭`)
}
  break
  case'setclose':{
      if (!m.isGroup) return
      if (!isCreator && !isAdmins) return
      if (!text) return m.reply(`Gunakan dengan cara ${command} *teks_close*\n\n_Contoh_\n\n${command} Halo grup sudah close jajan besok lagi`)
      if (isSetClose(m.chat, set_close)) return m.reply(`Set open already active`)
      addSetClose(text, m.chat, set_close)
     reply(`Successfully set close!`)
      }
      break
  case'changeclose':{
      if (!m.isGroup) return
      if (!isCreator && !isAdmins) return
      if (!text) return m.reply(`Gunakan dengan cara ${command} *teks_close*\n\n_Contoh_\n\n${command} Halo grup sudah close jajan besok lagi`)
      if (isSetClose(m.chat, set_close)) {
         changeSetClose(q, m.chat, set_close)
          reply(`Sukses change set close teks!`)
      } else {
        addSetClose(q, m.chat, set_close)
          reply(`Sukses change set close teks!`)
      }}
      break
  case'delsetclose':{
      if (!m.isGroup) return
      if (!isCreator && !isAdmins) return
      if (!isSetClose(m.chat, set_close)) return m.reply(`Belum ada set close di sini..`)
      removeSetClose(m.chat, set_close)
     reply(`Sukses delete set close`)
  }
      break
// MENU KEAMANAN =====================================================================================================================
case'antibot':{
  if (!m.isGroup) return
      if (!isAdmins) return
      if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (args[0] === "on") {
     if (isAntiBot) return m.reply(`Udah aktif`)
      antibott.push(m.chat)
      fs.writeFileSync('./database/antibot.json', JSON.stringify(antibott, null, 2))
      reply('Successfully Activate Antibot In This Group')
      var groupe = await faykal.groupMetadata(m.chat)
  var members = groupe['participants']
  var mems = []
  members.map(async adm => {
  mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
  })
  faykal.sendMessage(m.chat, {text: `\`\`\`「 ⚠️Warning⚠️ 」\`\`\`\n\nTolong jika ada bot ada disini mohon di self atau mute, jika ada bot maka akan kena kick otomatis`, contextInfo: { mentionedJid : mems }}, {quoted:m})
  } else if (args[0] === "off") {
     if (!isAntiBot) return m.reply(`Udah nonaktif`)
      let anu = antibott.indexOf(m.chat)
      antibott.splice(anu, 1)
      fs.writeFileSync('./database/antibot.json', JSON.stringify(antibott, null, 2))
      reply('Successfully Disabling Antibot In This Group')
  } else {
      reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
  }

}
  break
    case'antisaluran':{
      if (!m.isGroup) return
          if (!isAdmins) return
          if (!isBotAdmins) return m.reply(mess.botAdmin)
      if (args[0] === "on") {
         if (isAntiSalur) return m.reply(`Udah aktif`)
          antisaluran.push(m.chat)
          fs.writeFileSync('./database/antisaluran.json', JSON.stringify(antisaluran, null, 2))
          reply('Successfully Activate Antisaluran In This Group')
      } else if (args[0] === "off") {
         if (!isAntiSalur) return m.reply(`Udah nonaktif`)
          let anu = antisaluran.indexOf(m.chat)
          antisaluran.splice(anu, 1)
          fs.writeFileSync('./database/antisaluran.json', JSON.stringify(antisaluran, null, 2))
          reply('Successfully Disabling Antisaluran In This Group')
      } else {
          reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
      }
}
break
  case'antilinkgc':{
    if (!m.isGroup) return
        if (!isAdmins) return
        if (!isBotAdmins) return m.reply(mess.botAdmin)
     if (args[0] === "on") {
        if (isAntiLinkGc) return m.reply(`Udah aktif`)
        antilinkgc.push(m.chat)
        fs.writeFileSync('./database/antilinkgc.json', JSON.stringify(antilinkgc, null, 2))
        reply('Successfully Activate AntilinkGc In This Group')
    } else if (args[0] === "off") {
        if (!isAntiLinkGc) return m.reply(`Udah nonaktif`)
        let anu = antilinkgc.indexOf(m.chat)
        antilinkgc.splice(anu, 1)
        fs.writeFileSync('./database/antilinkgc.json', JSON.stringify(antilinkgc, null, 2))
        reply('Successfully Disabling AntilinkGc In This Group')
    } else {
        reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
    }
  }
    break
    case'antilinkgc2':{
      if (!m.isGroup) return
          if (!isAdmins) return
          if (!isBotAdmins) return m.reply(mess.botAdmin)
       if (args[0] === "on") {
          if (isAntiLinkGc2) return m.reply(`Udah aktif`)
          antilinkgc2.push(m.chat)
          fs.writeFileSync('./database/antilinkgc2.json', JSON.stringify(antilinkgc2, null, 2))
          reply('Successfully Activate AntilinkGc2 In This Group')
      } else if (args[0] === "off") {
          if (!isAntiLinkGc2) return m.reply(`Udah nonaktif`)
          let anu = antilinkgc2.indexOf(m.chat)
          antilinkgc2.splice(anu, 1)
          fs.writeFileSync('./database/antilinkgc2.json', JSON.stringify(antilinkgc2, null, 2))
          reply('Successfully Disabling AntilinkGc2 In This Group')
      } else {
          reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
      }
    }
      break
case'antiwame':{
  if (!m.isGroup) return
      if (!isAdmins) return
      if (!isBotAdmins) return m.reply(mess.botAdmin)
   if (args[0] === "on") {
      if (isAntiWame) return m.reply(`Udah aktif`)
      antiwame.push(m.chat)
      fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 2))
      reply('Successfully Activate Antiwame In This Group')
  } else if (args[0] === "off") {
      if (!isAntiWame) return m.reply(`Udah nonaktif`)
      let anu = antiwame.indexOf(m.chat)
      antiwame.splice(anu, 1)
      fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 2))
      reply('Successfully Disabling Antiwame In This Group')
  } else {
      reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
  }
}
  break
case'antiwame2':{
  if (!m.isGroup) return
      if (!isAdmins) return
      if (!isBotAdmins) return m.reply(mess.botAdmin)
   if (args[0] === "on") {
      if (isAntiWame2) return m.reply(`Udah aktif`)
      antiwame2.push(m.chat)
      fs.writeFileSync('./database/antiwame2.json', JSON.stringify(antiwame2, null, 2))
      reply('Successfully Activate antiwame2 In This Group')
  } else if (args[0] === "off") {
      if (!isAntiWame2) return m.reply(`Udah nonaktif`)
      let anu = antiwame2.indexOf(m.chat)
      antiwame2.splice(anu, 1)
      fs.writeFileSync('./database/antiwame2.json', JSON.stringify(antiwame2, null, 2))
      reply('Successfully Disabling antiwame2 In This Group')
  } else {
      reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
  }
}
  break
  case'antitoxic':{
    if (!m.isGroup) return
    if (!isAdmins) return
    if (!isBotAdmins) return m.reply(mess.botAdmin)
    if (args[0] === "on") {
    if (isAntiToxic) return m.reply(`Udah aktif`)
    antitoxic.push(m.chat)
    fs.writeFileSync('./database/antitoxic.json', JSON.stringify(antitoxic, null, 2))
    reply('Successfully Activate Antitoxic In This Group')
    } else if (args[0] === "off") {
    if (!isAntiToxic) return m.reply(`Udah nonaktif`)
    let anu = antitoxic.indexOf(m.chat)
    antitoxic.splice(anu, 1)
    fs.writeFileSync('./database/antitoxic.json', JSON.stringify(antitoxic, null, 2))
    reply('Successfully Disabling Antitoxic In This Group')
    } else {
    reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
    }
    }
    break
            case'antivirtex':{
              if (!m.isGroup) return
              if (!isAdmins) return
              if (!isBotAdmins) return m.reply(mess.botAdmin)
              if (args[0] === "on") {
              if (isAntiVirtex) return m.reply(`Udah aktif`)
              antivirtex.push(m.chat)
              fs.writeFileSync('./database/antivirus.json', JSON.stringify(antivirtex, null, 2))
              reply('Successfully Activate AntiVirtex In This Group')
              } else if (args[0] === "off") {
              if (!isAntiVirtex) return m.reply(`Udah nonaktif`)
              let anu = antivirtex.indexOf(m.chat)
              antivirtex.splice(anu, 1)
              fs.writeFileSync('./database/antivirus.json', JSON.stringify(antivirtex, null, 2))
              reply('Successfully Disabling AntiVirtex In This Group')
              } else {
              reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
              }
              }
              break
                case'antilinktg':{
                  if (!m.isGroup) return
                  if (!isAdmins) return
                  if (!isBotAdmins) return m.reply(mess.botAdmin)
                  if (args[0] === "on") {
                  if (isAntiLinkTelegram) return m.reply(`Udah aktif`)
                  antilinktg.push(m.chat)
                  fs.writeFileSync('./database/antilinktelegram.json', JSON.stringify(antilinktg, null, 2))
                  reply('Successfully Activate Antilinktg In This Group')
                  } else if (args[0] === "off") {
                  if (!isAntiLinkTelegram) return m.reply(`Udah nonaktif`)
                  let anu = antilinktg.indexOf(m.chat)
                  antilinktg.splice(anu, 1)
                  fs.writeFileSync('./database/antilinktelegram.json', JSON.stringify(antilinktg, null, 2))
                  reply('Successfully Disabling Antilinktg In This Group')
                  } else {
                  reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
                  }
                  }
                  break
// MENU GROUP =======================================================================================================================
case 'gcstatus': {
  if (!m.isGroup) return
  if (!(isAdmins || isCreator)) return
  const statusList = {
    ᴡᴇʟᴄᴏᴍᴇ: isWelcome,
    ɢᴏᴏᴅʙʏᴇ: isLeft,
    ᴀɴᴛɪʙᴏᴛ: isAntiBot,
    ᴀɴᴛɪʟɪɴᴋɢᴄ: isAntiLinkGc,
    ᴀɴᴛɪʟɪɴᴋɢᴄ2: isAntiLinkGc2,
    ᴀɴᴛɪꜱᴀʟᴜʀᴀɴ: isAntiSalur,
    ᴀɴᴛɪᴠɪʀᴛᴇx: isAntiVirtex,
    ᴀɴᴛɪᴡᴀᴍᴇ: isAntiWame,
    ᴀɴᴛɪᴡᴀᴍᴇ2: isAntiWame2,
    ᴀɴᴛɪʟɪɴᴋᴛɢ: isAntiLinkTelegram
      };
  
  let textnya = 'ꜱᴛᴀᴛᴜꜱ ɢʀᴏᴜᴘ ꜱᴀᴀᴛ ɪɴɪ\n\n';
  for (const [key , value] of Object.entries(statusList)) {
          textnya += `[${value ? ' 🟢 ' : ' 🔴 '}] ${key}\n`;
  }
  
      textnya += `
ᴋᴇᴛᴇʀᴀɴɢᴀɴ
🟢 = ꜰɪᴛᴜʀ ᴀᴋᴛɪꜰ
🔴 = ꜰɪᴛᴜʀ ᴛɪᴅᴀᴋ ᴀᴋᴛɪꜰ
  
ᴄᴀʀᴀ ᴘᴇɴɢɢᴜɴᴀᴀɴ :
ᴄᴏɴᴛᴏʜ ᴡᴇʟᴄᴏᴍᴇ ᴏɴ/ᴏꜰꜰ
  `;
  reply(textnya);
  }
  break
case 'ceksewa':{
  if (!m.isGroup) return
  if (!isSewa) return reply(`Tidak disewa pada grup ini!`)
  var expire = getSewaExpired(m.chat, sewa)
  var selisihHari_ceksewa = selisihHari(expire);
  var remainingTimeString = `*\`[ Info Expired ]\`*\n\n${selisihHari_ceksewa}.`
  reply(remainingTimeString)
  }
  break
     case 'h':
     case 'hidetag':{
      if (!m.isGroup) return
      if (!(isAdmins || isCreator)) return
      if (!m.quoted && !text) return m.reply("teksnya/replyteks")
      let userss = await groupMetadata.participants.map(a => a.id)
      let q = m.quoted ? m.quoted : m
      let c = m.quoted ? m.quoted : m.msg
      const msg = faykal.cMod(m.chat,
        generateWAMessageFromContent(m.chat, {
          [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? c.toJSON() : {
            text: c || ''
          }
        }, {
          quoted: null,
          userJid: faykal.user.id
        }),
        text || q.text, faykal.user.jid, { mentions: userss }
      )
      await faykal.relayMessage(m.chat, msg.message, { messageId: msg.key.id, mentions: participants.map(a => a.id)})
    }
    break
      case 'h1':
      case 'hidetag2':{
        if (!m.isGroup) return
        if (!(isAdmins || isCreator)) return
        let tek = m.quoted ? quoted.text : (text ? text : "")
        const groupId = m.chat;
        const groupMetadata = await faykal.groupMetadata(groupId);
        const participants = groupMetadata?.participants || []; 
        const mentions = participants.map(participant => participant.id);
          faykal.sendMessage(groupId, {
              text: tek ? `${tek}\n\ntag : @${groupId}` : `@${groupId}`,
              contextInfo: {
                mentionedJid: mentions,
                groupMentions: [{ groupSubject: "everyone", groupJid: groupId }]
              }
            }
          );
        }
          break
case "kick": {
  if (!m.isGroup) return
  if (!isAdmins) return
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (text || m.quoted) {
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await faykal.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => faykal.sendMessage(m.chat, {text: `Berhasil Mengeluarkan Beban Dari Grup Ini`}, {quoted: m})).catch((err) => m.reply('❌ Terjadi kesalahan'))
  } else return m.reply('nomornya/@tag')}
  break
case 'del': case 'delete': {
  if (!m.isGroup) return
  if (!isAdmins) return
  if (!m.quoted) return reply('Reply pesan yang ingin dihapus!')
  if (!isBotAdmins) return reply(mess.botAdmin)
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await faykal.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: m.quoted.id, participant: m.quoted.sender } })
  }
  break
case 'afk': {
if (!m.isGroup) return
if (!isAdmins) return // Cek apakah perintah dijalankan di grup
if (isAfkOn) return; // Cek apakah pengguna sudah dalam mode AFK
// Tentukan alasan AFK
let reason = text ? text : 'tanpa alasan 🤭';
// Tambahkan pengguna ke daftar AFK
addAfkUser(m.sender, Date.now(), reason, afk);
// Kirim pesan konfirmasi dengan mention
faykal.sendTextWithMentions(m.chat,
`*\`[ 𝖠𝖥𝖪 𝖬𝗈𝖽𝖾 𝖠𝗄𝗍𝗂𝖿! ]\`*\n\n` + 
`𝖺𝖽𝗆𝗂𝗇 *@${m.sender.split('@')[0]}* 𝗅𝖺𝗀𝗂 𝖠𝖥𝖪 𝗇𝗂𝗁!\n` + 
`𝖺𝗅𝖺𝗌𝖺𝗇 : ${reason}\n\n` + 
`𝗃𝖺𝗇𝗀𝖺𝗇 𝗅𝗎𝗉𝖺 𝖻𝖺𝗅𝗂𝗄 𝗅𝖺𝗀𝗂 𝗒𝖺 😊✨`, m );
}
break;
case 'jeda': {
  if (!m.isGroup) return
  if (!isAdmins) return
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!text) return m.reply(`kirim ${command} waktu\nContoh: ${command} 30m\n\nlist waktu:\ns = detik\nm = menit\nh = jam\nd = hari`)
  opengc[m.chat] = { id: m.chat, time: Date.now() + toMs(text) }
  fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
  faykal.groupSettingUpdate(m.chat, "announcement")
  .then((res) => reply(`Sukses, group akan dibuka ${text} lagi`))
  .catch((err) => reply('Error'))
  }
  break
  case 'closetime': {
      if (!m.isGroup) return
      if (!isAdmins) return
      if (!isBotAdmins) return m.reply(mess.botAdmin)
      if (args[1]=="detik") {var timer = args[0]*`1000`
      } else if (args[1]=="menit") {var timer = args[0]*`60000`
      } else if (args[1]=="jam") {var timer = args[0]*`3600000`
      } else if (args[1]=="hari") {var timer = args[0]*`86400000`
      } else {return reply("*pilih:*\ndetik\nmenit\njam\n\n*contoh*\n10 detik")}
      reply(`Group akan ditutup ${q} dimulai dari sekarang`)
      setTimeout( () => {
      const close = `*Grup ditutup otomatis oleh bot*`
      faykal.groupSettingUpdate(m.chat, 'announcement')
      m.reply(close)
      }, timer)
      }
      break
      case 'opentime': {
      if (!m.isGroup) return
      if (!isAdmins) return
      if (!isBotAdmins) return m.reply(mess.botAdmin)
      if (args[1]=="detik") {var timer = args[0]*`1000`
      } else if (args[1]=="menit") {var timer = args[0]*`60000`
      } else if (args[1]=="jam") {var timer = args[0]*`3600000`
      } else if (args[1]=="hari") {var timer = args[0]*`86400000`
      } else {return reply("*pilih:*\ndetik\nmenit\njam\n\n*contoh*\n10 detik")}
      reply(`Group akan dibuka ${q} dimulai dari sekarang`)
      setTimeout( () => {
      const close = `*Grup dibuka otomatis oleh bot*`
      faykal.groupSettingUpdate(m.chat, 'not_announcement')
      m.reply(close)
      }, timer)
      }
      break
case 'setdesc': case 'setdesk': {
  if (!m.isGroup) return
  if (!isAdmins) return
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!text) return m.reply(`Example ${prefix + command} WhatsApp Bot`)
  await faykal.groupUpdateDescription(m.chat, text).then((res) => m.reply("Done")).catch((err) => m.reply("Terjadi kesalahan"))
}
break
case 'promote': {
if (!m.isGroup) return
if (!isAdmins) return
if (!isBotAdmins) return m.reply(mess.botAdmin)
if (m.quoted || text) {
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await faykal.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply('Sukses promote member✅')).catch((err) => m.reply('❌ Terjadi kesalahan'))
} else return m.reply('nomornya/@tag yang mau jadi admin')}
break
case 'demote': {
if (!m.isGroup) return
if (!isAdmins) return
if (!isBotAdmins) return m.reply(mess.botAdmin)
if (text || m.quoted) {
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await faykal.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply('Sukses demote admin✅')).catch((err) => m.reply('❌ Terjadi kesalahan'))
} else return m.reply('nomornya/@tag yang mau jadi member biasa')}
break
case "resetlinkgc": case'revoke':{
if (!m.isGroup) return
  if (!isAdmins) return
  if (!isBotAdmins) return m.reply(mess.botAdmin)
await faykal.groupRevokeInvite(m.chat)
.then( res => {
  reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply(mess.kalleror))
}
break
case 'linkgrup': case 'linkgroup': case 'linkgc': {
  if (!m.isGroup) return
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  let response = await faykal.groupInviteCode(m.chat)
  m.reply(`*INFO GROUP*\n\n*Name :* ${groupMetadata.subject}\n*ID :* ${groupMetadata.id}\n*Member :* ${groupMetadata.participants.length}\n*Link :* https://chat.whatsapp.com/${response}`)
}
break
case 'setppgroup': case 'setppgrup': case 'setppgc': {
  if (!m.isGroup) return
  if (!isAdmins) return
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!quoted) return m.reply (`Kirim/Reply Image Dengan Caption ${prefix + command}`)
  if (!/image/.test(mime)) return m.reply (`Kirim/Reply Image Dengan Caption ${prefix + command}`)
  if (/webp/.test(mime)) return m.reply (`Kirim/Reply Image Dengan Caption ${prefix + command}`)
  let media = await faykal.downloadAndSaveMediaMessage(quoted)
  await faykal.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
  m.reply("Berhasil mengganti pp group")
  }
  break
case 'setname':
case 'setnamegc':
case 'setsubject': {
if (!m.isGroup) return
  if (!isAdmins) return
  if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!text) return reply(`Contoh ${prefix+command} bot WhatsApp`)
await faykal.groupUpdateSubject(m.chat, text).then((res) => reply("Done")).catch((err) => reply("Terjadi kesalahan"))
}
break
// MENU KALKULATOR
case 'tambah':{
  if (!text.includes('+')) return m.reply(`Gunakan dengan cara ${command} *angka* + *angka*\n\n_Contoh_\n\n${command} 1+2`)
  arg = args.join(' ')
  atas = arg.split('+')[0]
  bawah = arg.split('+')[1]
          var nilai_one = Number(atas)
          var nilai_two = Number(bawah)
          reply(`${nilai_one + nilai_two}`)}
          break
      case 'kurang':{
          if (!text.includes('-')) return m.reply(`Gunakan dengan cara ${command} *angka* - *angka*\n\n_Contoh_\n\n${command} 1-2`)
  arg = args.join(' ')
  atas = arg.split('-')[0]
  bawah = arg.split('-')[1]
          var nilai_one = Number(atas)
          var nilai_two = Number(bawah)
          reply(`${nilai_one - nilai_two}`)}
          break
      case 'kali':{
          if (!text.includes('*')) return m.reply(`Gunakan dengan cara ${command} *angka* * *angka*\n\n_Contoh_\n\n${command} 1*2`)
  arg = args.join(' ')
  atas = arg.split('*')[0]
  bawah = arg.split('*')[1]
          var nilai_one = Number(atas)
          var nilai_two = Number(bawah)
          reply(`${nilai_one * nilai_two}`)}
          break
      case 'bagi':{
          if (!text.includes('/')) return m.reply(`Gunakan dengan cara ${command} *angka* / *angka*\n\n_Contoh_\n\n${command} 1/2`)
  arg = args.join(' ')
  atas = arg.split('/')[0]
  bawah = arg.split('/')[1]
          var nilai_one = Number(atas)
          var nilai_two = Number(bawah)
          reply(`${nilai_one / nilai_two}`)}
          break
// MENU STALK GAME
case "cekwr": {
  if (!text) return m.reply("Masukan total match total wr tujuan wr\n\nContoh cekwr 650 58 89")
  let [tm, tw, mw] = text.split(" ")
  if (isNaN(tm)) return m.reply("Masukan total Match")
  if (isNaN(tw)) return m.reply("Masukan total Winrate")
  if (isNaN(mw)) return m.reply("Masukan tujuan Winrate")
  try {
    const TotalMatch = tm
    const TotalWr = tw
    const MauWr = mw

    function result() {
      if (MauWr === 100) {
        m.reply("Mana bisalahh 100% 😂");
      }
      const resultNum = rumus(TotalMatch, TotalWr, MauWr);
      const x = `Kamu memerlukan sekitar ${resultNum} win tanpa lose untuk mendapatkan win rate ${MauWr}%`;
      m.reply(x)
    }

    function rumus(TotalMatch, TotalWr, MauWr) {
      let tWin = TotalMatch * (TotalWr / 100);
      let tLose = TotalMatch - tWin;
      let sisaWr = 100 - MauWr;
      let wrResult = 100 / sisaWr;
      let seratusPersen = tLose * wrResult;
      let final = seratusPersen - TotalMatch;
      return Math.round(final);
    }
    result()
  } catch (e) {
    console.log(mess.kalleror)
  }
}
break
case 'ffid': case 'ffstalk': {
  if (!args[0]) return reply(`Input Id Game Free Fire\n\nExample : ${prefix + command} 1090537872`)
  try {
  let url = `https://api.vreden.web.id/api/ffstalk?id=${args[0]}`
  let response = await axios(url);
  let res = response.data.result;
  faykal.sendMessage(m.chat, {
  text: `*[ FREE FIRE ]*

Id : ${args[0]}
Region : ${res.account.region}
Nickname : ${res.account.name}
Dibuat pada : ${res.account.create_time}
Terakhir login : ${res.account.last_login}
`,
  mentions: [m.sender]
  }, {
    quoted: m
  })
} catch (error) {
  reply('Terjadi Kesalahan!!\nid tidak ditemukan')
}
  break
}
case 'mlstalk': case 'mlid': {
if (!q) return reply(`Kirim perintah ${prefix+command} id zone\nContoh: ${prefix+command} 1234578 1234`)
var id = q.split(' ')[0]
var zon = q.split(' ')[1]
if (!id) return reply('ID wajib di isi')
if (!zon) return reply('ZoneID wajib di isi')
stalkml(id, zon).then(i=>{
if (i.status !== 200) return reply('𝘔𝘢𝘢𝘧, 𝘵𝘪𝘥𝘢𝘬 𝘥𝘢𝘱𝘢𝘵 𝘮𝘦𝘯𝘦𝘮𝘶𝘬𝘢𝘯 𝘥𝘢𝘵𝘢, 𝘚𝘪𝘭𝘢𝘩𝘬𝘢𝘯 𝘤𝘦𝘬 𝘬𝘦𝘮𝘣𝘢𝘭𝘪 𝘐𝘋 / 𝘚𝘦𝘳𝘷𝘦𝘳 𝘺𝘢𝘯𝘨 𝘬𝘢𝘮𝘶 𝘪𝘯𝘱𝘶𝘵')
reply(`*[ 𝖬𝖮𝖡𝖨𝖫𝖤 𝖫𝖤𝖦𝖤𝖭𝖣𝖲 ]*
  
𝗂𝖽 : ${id}
𝗓𝗈𝗇𝖾 : ${zon}
𝗇𝗂𝖼𝗄𝗇𝖺𝗆𝖾 : ${i.nickname}

_𝗎𝗇𝗍𝗎𝗄 𝖼𝖾𝗄 𝗋𝖾𝗀𝗂𝗈𝗇 𝖺𝗄𝗎𝗇 𝗄𝖾𝗍𝗂𝗄 𝗋𝖾𝗀𝗆𝗅 𝗂𝖽 𝗌𝖾𝗋𝗏𝖾𝗋_`)
})
}
break
case 'regml': {
  if (!text) {
    return m.reply(`*𝖬𝖮𝖡𝖨𝖫𝖤 𝖫𝖤𝖦𝖤𝖭𝖣𝖲 𝖵𝖠𝖫𝖨𝖣𝖠𝖲𝖨 𝖨𝖣*\n\n𝖦𝗎𝗇𝖺𝗄𝖺𝗇 𝖽𝖾𝗇𝗀𝖺𝗇 𝖼𝖺𝗋𝖺 :\n> ${prefix + command} 𝖨𝖣 𝖲𝖤𝖱𝖵𝖤𝖱\n\n𝖢𝗈𝗇𝗍𝗈𝗁 :\n> ${prefix + command} 87645372 1711`);
  }

  const userId = args[0];
  const zoneId = args[1];

  if (!userId || !zoneId) {
    return m.reply(`𝖲𝗂𝗅𝖺𝗁𝗄𝖺𝗇 𝗀𝗎𝗇𝖺𝗄𝖺𝗇 𝖽𝖾𝗇𝗀𝖺𝗇 𝖼𝖺𝗋𝖺 :\n\n${prefix + command} 𝖨𝖣 𝖲𝖤𝖱𝖵𝖤𝖱\n\n𝖢𝗈𝗇𝗍𝗈𝗁 :\n> ${prefix + command} 627333933 10131`);
  }

  try {
    const data = await validateMobileLegendsMoogold(userId, zoneId);

    if (data.message) {
      const userData = data.message;
      const nicknameMatch = userData.match(/In-Game Nickname:\s*(\S+)/);
      const countryMatch = userData.match(/Country:\s*(\S+)/);
      const nicknameUser = nicknameMatch ? nicknameMatch[1] : '𝖳𝗂𝖽𝖺𝗄 𝖣𝗂𝗍𝖾𝗆𝗎𝗄𝖺𝗇';
      const countryCode = countryMatch ? countryMatch[1] : '𝖳𝗂𝖽𝖺𝗄 𝖣𝗂𝗍𝖾𝗆𝗎𝗄𝖺𝗇';

      // Konversi country code menjadi region menggunakan fungsi mooCountry
      const regionUser = mooCountry(countryCode);

      const message = `*[ 𝖱𝖤𝖦𝖨𝖮𝖭 𝖬𝖮𝖡𝖨𝖫𝖤 𝖫𝖤𝖦𝖤𝖭𝖣𝖲 ]*\n\n𝗂𝖽 : ${userId}\n𝗓𝗈𝗇𝖾 : ${zoneId}\n𝗋𝖾𝗀𝗂𝗈𝗇 : ${regionUser}`;
      return m.reply(message);

    } else {
      return m.reply(`𝘔𝘢𝘢𝘧, 𝘵𝘪𝘥𝘢𝘬 𝘥𝘢𝘱𝘢𝘵 𝘮𝘦𝘯𝘦𝘮𝘶𝘬𝘢𝘯 𝘥𝘢𝘵𝘢, 𝘚𝘪𝘭𝘢𝘩𝘬𝘢𝘯 𝘤𝘦𝘬 𝘬𝘦𝘮𝘣𝘢𝘭𝘪 𝘐𝘋 / 𝘚𝘦𝘳𝘷𝘦𝘳 𝘺𝘢𝘯𝘨 𝘬𝘢𝘮𝘶 𝘪𝘯𝘱𝘶𝘵`);
    }
  } catch (error) {
    console.error('Error:', error);
    return m.reply('𝘔𝘢𝘢𝘧, 𝘵𝘦𝘳𝘫𝘢𝘥𝘪 𝘬𝘦𝘴𝘢𝘭𝘢𝘩𝘢𝘯. 𝘚𝘪𝘭𝘢𝘩𝘬𝘢𝘯 𝘤𝘦𝘬 𝘬𝘦𝘮𝘣𝘢𝘭𝘪 / 𝘤𝘦𝘬 𝘤𝘰𝘯𝘴𝘰𝘭𝘦 𝘶𝘯𝘵𝘶𝘬 𝘪𝘯𝘧𝘰𝘳𝘮𝘢𝘴𝘪 𝘭𝘦𝘣𝘪𝘩 𝘭𝘢𝘯𝘫𝘶𝘵.');
  }
  break;
}
   
// MENU RANDOM ===========================================================================================================================
case 's':
     case 'sticker':
     case 'stiker': {
       if (!m.isGroup) return
       if (!quoted) return reply(`Reply foto/video dengan caption ${prefix + command}\n\ndurasi video maks 1-9 detik`)
        if (/image/.test(mime)) {
           let media = await quoted.download()
           let encmedia = await faykal.sendImageAsSticker(m.chat, media, m, {
              packname: global.namabot,
              author: global.namaowner
           })
           await fs.unlinkSync(encmedia)
        } else if (/video/.test(mime)) {
           if ((quoted.msg || quoted).seconds > 11) return reply(`Reply foto/video dengan caption ${prefix + command}\n\ndurasi video maks 1-9 detik`)
           let media = await quoted.download()
           let encmedia = await faykal.sendVideoAsSticker(m.chat, media, m, {
              packname: global.namabot,
              author: global.namaowner
           })
           await fs.unlinkSync(encmedia)
        } else {
           reply(`Reply foto/video dengan caption ${prefix + command}\n\ndurasi video maks 1-9 detik`)
        }
     }
     break
     case 'qc': {
      if (!text) return m.reply(`textnya mana ?`)
      if (text > 25) return m.reply(`Maksimal 25 karakter`)
      let ppuser
      try {
      ppuser = await faykal.profilePictureUrl(m.sender, 'image')
      } catch (err) {
      ppuser = 'https://telegra.ph/file/320b066dc81928b782c7b.png'
      }
      const obj = {
            "type": "quote",
            "format": "png",
            "backgroundColor":"#ffffff",
            "width": 512,
            "height": 768,
            "scale": 2,
            "messages": [{
               "entities": [],
               "avatar": true,
               "from": {
                  "id": 1,
                  "name": pushname,
                  "photo": {
                     "url": ppuser
                  }
               },
               "text": text,
               "replyMessage": {}
            }]
         }
         try {
         const json = await axios.post('https://qc.botcahx.eu.org/generate', obj, {
            headers: {
               'Content-Type': 'application/json'
            }
         })
         const buffer = Buffer.from(json.data.result.image, 'base64')
      faykal.sendImageAsSticker(m.chat, buffer, m, { packname: namabot , author: wm })
         } catch (error) {
         reply(mess.kalleror)
         }
      }
      break
     case 'qc2': {
        if (!m.isGroup) return
        if (!q) return reply(`Contoh: ${prefix + command} pink hallo\n\nlist warna\npink\nbiru\mmerah\nhijau\nkuning\nungu\nbirutua\nbirumuda\nabu\norange\nhitam\nputih\nteal\nmerahmuda\ncokelat\nsalmon\nmagenta\ntan\nwheat\ndeeppink\napi\nbirulangit\njingga\nbirulangitcerah\nhotpink\nbirumudalangit\nhijaulaut\nmerahtua\noranyemerah\ncyan\nungutua\nhijaulumut\nhijaugelap\nbirulaut\noranyetua\nungukehitaman\nfuchsia\nmagentagelap\nabu-abutua\npeachpuff\nhijautua\nmerahgelap\ngoldenrod\nabu-abutua\nungugelap\nemas\nperak`)
        if (text.length > 100) return reply(`🚩 Max 100 character.`)
        let [color, ...message] = text.split(' ');
        message = message.join(' ');
        let backgroundColor;
        switch(color) {
        case 'pink':
        backgroundColor = '#f68ac9';
        break;
        case 'biru':
        backgroundColor = '#6cace4';
        break;
        case 'merah':
        backgroundColor = '#f44336';
        break;
        case 'hijau':
        backgroundColor = '#4caf50';
        break;
        case 'kuning':
        backgroundColor = '#ffeb3b';
        break;
        case 'ungu':
        backgroundColor = '#9c27b0';
        break;
        case 'birutua':
        backgroundColor = '#0d47a1';
        break;
        case 'birumuda':
        backgroundColor = '#03a9f4'; 
        break;
        case 'abu':
        backgroundColor = '#9e9e9e';
        break;
        case 'orange':
        backgroundColor = '#ff9800';
        break;
        case 'hitam':
        backgroundColor = '#000000';
        break;
        case 'putih':
        backgroundColor = '#ffffff';
        break;
        case 'teal':
        backgroundColor = '#008080';
        break;
        case 'merahmuda':
        backgroundColor = '#FFC0CB';
        break;
        case 'cokelat':
        backgroundColor = '#A52A2A';
        case 'salmon':
        backgroundColor = '#FFA07A'; 
        break; 
        case 'magenta':
        backgroundColor = '#FF00FF'; 
        break; 
        case 'tan':
        backgroundColor = '#D2B48C'; 
        break;
        case 'wheat':
        backgroundColor = '#F5DEB3'; 
        break;
        case 'deeppink':
        backgroundColor = '#FF1493'; 
        break; 
        case 'api':
        backgroundColor = '#B22222';
        break;
        case 'birulangit':
        backgroundColor = '#00BFFF';
        break; 
        case 'jingga':
        backgroundColor = '#FF7F50';
        break;
        case 'birulangitcerah':
        backgroundColor = '#1E90FF'; 
        break; 
        case 'hotpink':
        backgroundColor = '#FF69B4'; 
        break; 
        case 'birumudalangit':
        backgroundColor = '#87CEEB'; 
        break; 
        case 'hijaulaut':
        backgroundColor = '#20B2AA'; 
        break; 
        case 'merahtua':
        backgroundColor = '#8B0000'; 
        break; 
        case 'oranyemerah':
        backgroundColor = '#FF4500'; 
        break; 
        case 'cyan':
        backgroundColor = '#48D1CC'; 
        break; 
        case 'ungutua':
        backgroundColor = '#BA55D3'; 
        break; 
        case 'hijaulumut':
        backgroundColor = '#00FF7F'; 
        break; 
        case 'hijaugelap':
        backgroundColor = '#008000'; 
        break; 
        case 'birulaut':
        backgroundColor = '#191970'; 
        break; 
        case 'oranyetua':
        backgroundColor = '#FF8C00'; 
        break; 
        case 'ungukehitaman':
        backgroundColor = '#9400D3'; 
        break; 
        case 'fuchsia':
        backgroundColor = '#FF00FF'; 
        break; 
        case 'magentagelap':
        backgroundColor = '#8B008B'; 
        break;
        case 'abu-abutua':
        backgroundColor = '#2F4F4F'; 
        break;
        case 'peachpuff':
        backgroundColor = '#FFDAB9'; 
        break;
        case 'hijautua':
        backgroundColor = '#BDB76B'; 
        break;
        case 'merahgelap':
        backgroundColor = '#DC143C'; 
        break;
        case 'goldenrod':
        backgroundColor = '#DAA520'; 
        break;
        case 'abu-abutua':
        backgroundColor = '#696969'; 
        break;
        case 'ungugelap':
        backgroundColor = '#483D8B'; 
        break;
        case 'emas':
        backgroundColor = '#FFD700'; 
        break;
        case 'perak':
        backgroundColor = '#C0C0C0'; 
        break;
        default:
        return reply('Warna yang dipilih tidak tersedia.')
        }
        try {
        let obj = {
        type: 'quote',
        format: 'png',
        backgroundColor,
        width: 512,
        height: 768,
        scale: 2,
        messages: [
        {
        entities: [],
        avatar: true,
        from: {
        id: 1,
        name: pushname,
        photo: { 
        url: await faykal.profilePictureUrl(m.sender, "image").catch(() => 'https://telegra.ph/file/320b066dc81928b782c7b.png'),
        }
        },
        text: message,
        replyMessage: {},
        },
        ],
        };
        let response = await axios.post('https://qc.botcahx.eu.org/generate', obj, {
        headers: {
        'Content-Type': 'application/json',
        },
        });
        let buffer = Buffer.from(response.data.result.image, 'base64');
        faykal.sendImageAsSticker(m.chat, buffer, m, { packname: `${global.namabot}`, author: `${global.wm}`})
      } catch (e) {
        console.log(e)
        reply(mess.kalleror)
     }
     }
      break
case 'ping': case 'runtime': {
  m.reply(`aktif selama ${runtime(process.uptime())}`)
  }
  break
// MENU OWNER ============================================================================================================================
case'addsewa':{
  if (!isCreator) return
  if (text < 2) return m.reply(`Gunakan dengan cara ${prefix + command} *linkgc waktu*\n\nContoh : ${command} https://chat.whatsapp.com/JanPql7MaMLa 30d\n\n*CATATAN:*\nd = hari (day)\nm = menit(minute)\ns = detik (second)\ny = tahun (year)\nh = jam (hour)`)
  if (!isUrl(args[0])) return m.reply("Link grup wa gk gitu modelnya cuy")
  var url = args[0]
  url = url.split('https://chat.whatsapp.com/')[1]
  if (!args[1]) return m.reply(`Waktunya?`)
  var data = await faykal.groupAcceptInvite(url)
  if(checkSewaGroup(data, sewa)) return m.reply(`Bot sudah disewa oleh grup tersebut!`)
  addSewaGroup(data, args[1], sewa)
  reply(`Sukses Menambahkan Ke List Sewa`)
 }
  break
  case 'delsewa':{
  if (!isCreator) return
  if (!text) return m.reply(`mana id groupnya ?`)
  sewa.splice(getSewaPosition(`${text}`, sewa), 1)
  fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 2))
  console.log(`group sewa delete sukses`)
  reply(`Sukses Menghapus Dari List Sewa`)
  }
  break
  case 'listsewa':{
  if (!isCreator) return
  let list_sewa_list = `*LIST SEWA ${sewa.length} GROUP*\n\n`
  for (let x of sewa) {
      list_sewa_list += `*Name:* ${await getGcName(x.id)}\n*ID :* ${x.id}\n`
      let ceksewa = x.expired - Date.now()
      list_sewa_list += `*Expired :* ${msToDate(ceksewa)}\n\n`
  }
  m.reply(list_sewa_list)
}
  break
case 'outgrup':{
  if (!isCreator) return
  if (!text) return reply(`Contoh: ${prefix + command} 120363204743427585@g.us`);

  try {
      await faykal.groupLeave(text);
      reply('Berhasil Keluar Dari Grup');
  } catch (err) {
      reply('Keluar Grup Gagal');
  }
}
break;
    case 'os': {
        if (!isCreator) return
        const response = await axios.get('http://ip-api.com/json/');
         const serverInfo = response.data;
        
        function formatUptime(uptime) {
         let seconds = Math.floor(uptime % 60);
         let minutes = Math.floor((uptime / 60) % 60);
         let hours = Math.floor((uptime / (60 * 60)) % 24);
         let days = Math.floor(uptime / (60 * 60 * 24));
        
         let formattedUptime = '';
         if (days > 0) formattedUptime += `${days} days `;
         if (hours > 0) formattedUptime += `${hours} hours `;
         if (minutes > 0) formattedUptime += `${minutes} minutes `;
         if (seconds > 0) formattedUptime += `${seconds} seconds`;
        
         return formattedUptime;
        }
        
         let serverMessage = `*S E R V E R - I N F O*\n\n`;
         const osInfo = os.platform();
         const totalRAM = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(1); // in GB
         const freeRAM = (os.freemem() / (1024 * 1024 * 1024)).toFixed(1); // in GB
         const uptime = os.uptime();
         const uptimeFormatted = formatUptime(uptime);
         const processor = os.cpus()[0].model;
         const totalCores = os.cpus().length;
        
         serverMessage += `┌ ◦ *OS :* ${osInfo}\n`;
         serverMessage += `│ ◦ *CPU :* ${totalCores} Core\n`;
         serverMessage += `│ ◦ *RAM :* ${freeRAM} GB / ${totalRAM} GB\n`;
         serverMessage += `│ ◦ *Country :* ${serverInfo.country}\n`;
         serverMessage += `│ ◦ *CountryCode :* ${serverInfo.countryCode}\n`;
         serverMessage += `│ ◦ *Region :* ${serverInfo.region}\n`;
         serverMessage += `│ ◦ *RegionName :* ${serverInfo.regionName}\n`;
         serverMessage += `│ ◦ *City :* ${serverInfo.city}\n`;
         serverMessage += `│ ◦ *Zip :* ${serverInfo.zip}\n`;
         serverMessage += `│ ◦ *Lat :* ${serverInfo.lat}\n`;
         serverMessage += `│ ◦ *Lon :* ${serverInfo.lon}\n`;
         serverMessage += `│ ◦ *Timezone :* ${serverInfo.timezone}\n`;
         serverMessage += `│ ◦ *Isp :* ${serverInfo.isp}\n`;
         serverMessage += `│ ◦ *Org :* ${serverInfo.org}\n`;
         serverMessage += `│ ◦ *As :* ${serverInfo.as}\n`;
         serverMessage += `│ ◦ *Query :* ${serverInfo.query}\n`;
         serverMessage += `│ ◦ *Uptime :* ${uptimeFormatted}\n`;
         serverMessage += `└ ◦ *Processor :* ${processor}`;
        reply(serverMessage);
        }
        break
        case 'getip':{
          if (!isCreator) return
          let anu = await fetch(`https://api.myip.com`)
          let res = await anu.json()
          let ip = `*📮INFO SERVER*\n\n*IP :* ${res.ip}\n*Country :* ${res.country}\n\n*_jangan menyebarkan ip diatas ke sembarang orang!!_*`
          m.reply(ip)
          }
          break
          case 'getidch': {
            if (!isCreator) return
            if (!m.quoted) return m.reply('reply saluran channel nya lah')
            try {
            let id = (await m.getQuotedObj()).msg.contextInfo.forwardedNewsletterMessageInfo
            await m.reply(`*Name :* ${id.newsletterName}\n*Id :* ${id.newsletterJid}`)
            } catch (e) {
            m.reply('Harus chat dari channel bang')
            }
            }
            break
        case 'bcgctag':{
        if (!isCreator) return
        if (!text && !m.quoted) return m.reply("teksnya atau reply teks")
        var teks = m.quoted ? m.quoted.text : text
        let getGroups = await faykal.groupFetchAllParticipating()
        let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
        let anu = groups.map(v => v.id)
        reply(`Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${anu.length * 1.5} detik`)
        for (let i of anu) {
        await sleep(1500)
        faykal.sendMessage(i, {text: teks, mentions: getGroups[i].participants.map(e => e.id)}, {quoted: fbcgc})/*, {quoted:feriv})*/
          }
        reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
        }
        break
        case 'bcgc':{
          if (!isCreator) return
          if (!text) return m.reply(`teksnya atau reply teks`)
          let getGroups = await faykal.groupFetchAllParticipating()
          let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
          let anu = groups.map(v => v.id)
          reply(`Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${anu.length * 1.5} detik`)
          for (let i of anu) {
          await sleep(1500)
          faykal.sendMessage(i, {text: `${text}`}, {quoted:fbcgc})
          }
          m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
          }
          break
            case "listgc": {
            if (!isCreator) return
            let gcall = Object.values(await faykal.groupFetchAllParticipating().catch(_=> null))
            let listgc = '\n'
            await gcall.forEach((u, i) => {
            listgc += `*${i+1}.* ${u.subject}\n* *ID :* ${u.id}\n* *Total Member :* ${u.participants.length} Member\n* *Status Grup :* ${u.announce == true ? "Tertutup" : "Terbuka"}\n* *Pembuat :* ${u.owner ? u.owner.split('@')[0] : 'Sudah keluar'}\n\n`
            })
            m.reply(listgc)
            }
            break
            case 'backupsc': {
            if (!isCreator) return
            let filename = await generateRandomHexName(32);
            const { execSync } = require('child_process');
            const ls = (await execSync('ls')).toString().split('\n').filter((cek) => cek !== 'node_modules' && cek !== 'package-lock.json' && cek !== 'session' && cek !== '');
            reply('Hasil backup akan dikirim lewat chat pribadi ya!');
            await execSync(`zip -r ${filename}.zip ${ls.join(' ')}`);
            await faykal.sendMessage(m.chat, {
            document: await fs.readFileSync(`./${filename}.zip`),
            mimetype: 'application/zip',
            fileName: `${filename}.zip`,
            caption: 'Berhasil! Silakan download dan simpan file backup-nya ya.'
              });
            await execSync(`rm -rf ${filename}.zip`);
            console.log(`${filename}.zip telah dihapus dari file lokal.`);
          }
        break;
        case 'delsession': case 'delsesi':{
          if (!isCreator) return
          fs.readdir(`./${sessionName}`, async function(err, files) {
          if (err) {
          console.log('Tidak dapat memindai direktori : ' + err);
          return m.reply('Tidak dapat memindai direktori : ' + err);}
          let filteredArray = await files.filter(item => item.startsWith("pre-key") ||
          item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state"))
          console.log(filteredArray.length);
          let teks = `Menghapus ${filteredArray.length} file sampah\n\n`
          if (filteredArray.length == 0) return m.reply(teks)
          await filteredArray.forEach(function(file) {
          fs.unlinkSync(`./${sessionName}/${file}`)
          });
          await sleep(2000)
          m.reply('Berhasil menghapus semua sampah!')
          });
          }
          break
        case 'getsession': case 'getsesi':{
          if (!isCreator) return
            faykal.sendMessage(m.chat, { react: { text: "🔎",key: m.key,}})
          let sesi = await fs.readFileSync(`./${sessionName}/creds.json`)
          await faykal.sendMessage(m.chat, {
          document: sesi,
          mimetype: 'application/json',
          fileName: 'creds.json'
          }, {quoted: m})
          }
          break
    case 'getdb': {
    if (!isCreator) return
    await reply("Sabar Mas Lagi Backup database!!!");
          const { execSync } = require("child_process");
          const ls = (await execSync("ls"))
            .toString()
            .split("\n")
            .filter(
            (pe) =>
            pe != "node_modules" &&
            pe != "image" &&
            pe != "lib" &&
            pe != "session" &&
            pe != "faykal.js" &&
            pe != ".replit" &&
            pe != "Dockerfile" &&
            pe != "LICENSE" &&
            pe != "Procfile" &&
            pe != "replit.nix" &&
            pe != "docker-compose.yml" &&
            pe != "index.js" &&
            pe != "install.sh" &&
            pe != "owner-dan-menu.js" &&
            pe != "package.json" &&
            pe != "package-lock.json" &&
            pe != "store.js" &&
            pe != "yarn-error.log" &&
            pe != ""
            );
          const exec = await execSync(`zip -r Database.zip ${ls.join(" ")}`);
          await faykal.sendMessage(
            m.chat,
            {
              document: await fs.readFileSync("./Database.zip"),
              mimetype: "application/zip",
              fileName: "Database.zip",
            },
            { quoted: feriv }
          );
          await execSync("rm -rf Database.zip");
        }
        break
// =================================================================================================================================
        default:
if (budy.startsWith('>')) {
                if (!isCreator) return
                try {
                    let evaled = await eval(budy.slice(2))
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    await m.reply(evaled)
                } catch (err) {
                    await m.reply(util.format(err))
                }
            }
   }
   if (budy.startsWith('$')) {
    if (!isCreator) return
    exec(budy.slice(2), (err, stdout) => {
    if (err) return m.reply(`${err}`)
    if (stdout) return m.reply(stdout)
    })
    }
    
  } catch (err) {
    console.log(util.format(err))
    let e = String(err)
    faykal.sendMessage(owner + "@s.whatsapp.net", { text: "Halo Developer ! Sepertinya ada kesalahan nih... Tolong diperiksa ya 🥺✨\n\n" + util.format(e), 
    contextInfo:{
    forwardingScore: 5, 
    isForwarded: true
    }})
  }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Berhasil update 'store.js'`))
delete require.cache[file]
require(file)
})
