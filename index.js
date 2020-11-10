const Discord = require("discord.js");
const client = new Discord.Client();
const log = require(`./logs.js`);
const ms = require('ms');
var setTitle = require('console-title');
const readline = require("readline")
var center = require('center-align');
var colors = require("colors")
const fs = require("fs");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


client.on("error", (e) => {
	log.error(e);
	return;
});

client.on("warn", (e) => {
	log.warn(e);
	return;
});

(async function () {
	setTitle("KINGMAN4HACK | Setup");
	console.log(" ");
	console.log(" ");
	console.log(center(`
 /$$   /$$ /$$$$$$ /$$   /$$  /$$$$$$  /$$      /$$  /$$$$$$  /$$   /$$
| $$  /$$/|_  $$_/| $$$ | $$ /$$__  $$| $$$    /$$$ /$$__  $$| $$$ | $$
| $$ /$$/   | $$  | $$$$| $$| $$  \__/| $$$$  /$$$$| $$  \ $$| $$$$| $$
| $$$$$/    | $$  | $$ $$ $$| $$ /$$$$| $$ $$/$$ $$| $$$$$$$$| $$ $$ $$
| $$  $$    | $$  | $$  $$$$| $$|_  $$| $$  $$$| $$| $$__  $$| $$  $$$$
| $$\  $$   | $$  | $$\  $$$| $$  \ $$| $$\  $ | $$| $$  | $$| $$\  $$$
| $$ \  $$ /$$$$$$| $$ \  $$|  $$$$$$/| $$ \/  | $$| $$  | $$| $$ \  $$
|__/  \__/|______/|__/  \__/ \______/ |__/     |__/|__/  |__/|__/  \__/
                                                                       
                                                                       
                                                                       

`.blue, 112));


console.log(" ");
console.log(" ");
console.log(" ");
console.log(" ");
let token = await question(('- Insert your discord account token:'.cyan));
let copy = await question(('- Insert Server ID that you want to copy:'.cyan));
let paste = await question(('- Insert Server ID that you want to paste:'.cyan));

client.on("ready", async() => {
	try {
		setTimeout(async function() {
			log.info(`Connecting...`)
		}, ms('3s'));
		log.info(`Logged in as ${client.user.tag} ( ${client.user.email})`)
	} catch (e) {
		log.error(e.stack)
	}


	setTitle("KINGMAN4HACK | Cloning Server");
	let guild1 = client.guilds.get(`${copy}`)
	let guild2 = client.guilds.get(`${paste}`);

	let channels = guild1.channels.filter(c => c.type === "text").sort((a, b) => a.calculatedPosition - b.calculatedPosition).map(c => c);
	let categories = guild1.channels.filter(c => c.type === "category").sort((a, b) => a.calculatedPosition - b.calculatedPosition).map(c => c);
	let roles = guild1.roles.sort((a, b) => b.calculatedPosition - a.calculatedPosition).map(r => r);
	let voice = guild1.channels.filter(c => c.type === "voice").sort((a, b) => a.calculatedPosition - b.calculatedPosition).map(c => c);


  let allowedRegions = ['brazil', 'us-west', 'singapore', 'eu-central', 'hongkong',
                    'us-south', 'amsterdam', 'us-central', 'london', 'us-east', 'sydney', 'japan',
                    'eu-west', 'frankfurt', 'russia'];

  let region = allowedRegions.includes(guild2.region) ? guild2.region : 'eu-central';

	let guildname = guild1.name + " - KINGMAN4HACK";
	let guildico = guild1.iconURL;

	await guild2.channels.deleteAll();

	await guild2.setIcon(guildico).then(icon => {
		log.info('Set Server Icon: ' + guildico)
	})
	await guild2.setName(guildname).then(name => {
		log.info('Set Server Name: ' + name)
	})
  await guild2.setRegion(region).then(m => {
		log.info('Set Server Region: ' + region)
	})
  await guild2.setVerificationLevel(guild1.verificationLevel).then(m => {
		log.info('Set Server Verification: ' + guild1.verificationLevel)
	})

	for (var i = 0; i < roles.length; i++) {
		let do2 = await guild2.roles.find(c => c.name === roles[i].name)
		if (do2) continue;
		guild2.createRole({
			type: roles[i].type,
			name: roles[i].name,
			color: roles[i].hexColor,
			hoist: roles[i].hoist,
			permissions: roles[i].permissions,
			managed: roles[i].managed,
			mentionable: roles[i].mentionable
		}).then(createdRole => {
			log.info('Created Role: ' + createdRole.name)
		})
	}


	guild1.emojis.forEach(emoji => {
		let do2 = guild2.emojis.find(c => c.name === emoji.name)
		if (do2) return;
		guild2.createEmoji(emoji.url, emoji.name).then(createdEmoji => {
			log.info('Created Emoji: ' + createdEmoji)
		})
	})

	categories.forEach(async(category) => {
	let do2 = await guild2.channels.find(c => c.name === category.name)
	if (do2) return;


    await guild2.createChannel(category.name, 'category').then(createdCategory => {
			log.info('Created category: ' + createdCategory.name)
		})
	})

		for (var i = 0; i < channels.length; i++) {
			let do1 = channels[i]
			let do2 = await guild2.channels.find(c => c.name === do1.name)
			if (do2) continue;

			if (!do1.parent) {
				var channel2 = await guild2.createChannel(do1.name, 'text')
				if (channels[i].topic) {
					channel2.setTopic(channels[i].topic)
				}
			}
			if (do1.parent) {
				var channel = await guild2.createChannel(do1.name, 'text')
				if (channels[i].topic) {
					channel.setTopic(channels[i].topic)
				}
				var ll = await guild2.channels.find(c => c.name === do1.parent.name)
				if (ll) {
					channel.setParent(guild2.channels.find(c => c.name === do1.parent.name).id)
				} else {
					var ll1 = await guild2.createChannel(do1.parent.name, 'category')
					channel.setParent(ll1)
				}
			}
			log.info('Created Text Channel: ')

		for (var i = 0; i < voice.length; i++) {
			let do1 = voice[i]
			let do2 = await guild2.channels.find(c => c.name === do1.name)
			if (do2) continue;
			if (!do1.parent) {
				await guild2.createChannel(do1.name, 'voice')
			}
			if (do1.parent) {
				var channel = await guild2.createChannel(do1.name, 'voice')
				var ll = await guild2.channels.find(c => c.name === do1.parent.name)
				if (ll) {
					channel.setParent(guild2.channels.find(c => c.name === do1.parent.name).id)
				} else {
					var ll1 = await guild2.createChannel(do1.parent.name, 'category')
					channel.setParent(ll1)
				}
			}
			log.info('Created Voice Channel: ' + channel.name)
		}

	}
	log.info('Server has successfully been cloned.')
})


client.login(`${token}`);
})();

function question(string) {
    return new Promise((res) => {
        rl.question(string, (answer) => res(answer))
    })
}