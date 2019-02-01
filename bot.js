// Quality Bot Version 3.0.0
// Alex Prikockis, 2019

// Calling packages
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const eliapi = require('eliapi');
let token;
try {
	token = JSON.parse(fs.readFileSync('/home/pibot/Coding/quality-bot/token.json')).token;
}
catch(err) {
	console.log(`WARNING: ${err.message}`);
	console.log('Checking for local token file');
	token = JSON.parse(fs.readFileSync('token.json')).token;
}
console.log(`Logging in with token: ${token}`);
bot.login(token);
console.log("Started life anew");


// New command handler

bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
	if (err) console.error(err);

	let jsfiles = files.filter(f => f.split('.').pop() === 'js');
	if (jsfiles.length <= 0) { return console.log('No commands found...') }
	else { console.log(`${jsfiles.length} commands found.`) }

	jsfiles.forEach((f, i) => {
		let cmds = require(`./commands/${f}`);
		console.log(`Command ${f} loaded.`);
		bot.commands.set(cmds.config.name, cmds);
	})
});


// Config

const prefix = '>';
const userID = '<@437256070650658823>';

// Listener Event: Received message
bot.on('message', async message => {

	let currentdate = new Date();
	let origin = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + '  ' + message.guild.name.trim().substring(0,10) + ' / ' + message.author.username.trim().substring(0,10) + ' / ' + message.channel.name.substring(0,10) + '  ' + message.content + ':  '

	// anything not command related

	if (message.content.includes(userID))
		console.log(`${currentdate}  ${message.author.username}  ${message.guild.name} | ${message.channel.name}  NOTICE:  ${message.content}`);


	if (!message.content.startsWith(prefix)) return;
  let cont = message.content.slice(prefix.length).split(" "); // slices off command prefix
  let args = cont.slice(1); // slices off command, leaving only arguments

	// yay new command handler, hopefully this works

	let cmd  = bot.commands.get(cont[0]);
	if (cmd) {
		console.log(`'${cmd.config.name}' command run`);
		let output = await cmd.run(bot, message, args, origin);
		// console.log(output);
		if (output != 0) {
			message.reply(`Error: ${output} \n Usage:  ${cmd.config.usage}`)
				.then(msg => msg.delete(8000));
			}
		return;
	}


});

bot.on('ready', () => {

  bot.user.setStatus('online');
	let currentdate = new Date();
	console.log("Launch at " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds());
  console.log("Bot launch complete");


});


// Console input

rl.on('line', async input => {
	let args = input.split(" ");

	switch (args[0]) {
		case 'read':
			let msgHistory = await bot.channels.find(ch => ch.id == args[1]).fetchMessages({limit:args[2]});
			console.log('success ig... ' + msgHistory.size + ' messages');
			msgHistory.forEach(msg => {
   			console.log(`${msg.author.username}: ${msg.content}`);
			});
			break;
		case 'info':
			console.log(`${bot.guilds.size} servers`);

	}
});
