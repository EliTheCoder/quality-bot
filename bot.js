// Quality Bot Version 2.0.0
// Alex Prikockis, 2018

// Calling package
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
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



// Config

const prefix = '>';
const userID = '<@437256070650658823>';

// Listener Event: Received message
bot.on('message', message => {

  let sender = message.author; // who sent the message

  let msg = message.content.toUpperCase(); // converts entire message to to uppercase
  let cont = message.content.slice(prefix.length).split(" "); // slices off command prefix
  let args = cont.slice(1); // slices off command, leaving only arguments
	let currentdate = new Date();
	let origin = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + '  ' + message.guild.name.trim().substring(0,10) + ' / ' + sender.username.trim().substring(0,10) + ' / ' + message.channel.name.substring(0,10) + '  ' + msg + ':  '


	// dev notice
	if (msg.includes(userID))
		console.log(`${currentdate}  ${sender.username}  ${message.guild.name} | ${message.channel.name}  NOTICE:  ${message.content}`);
	// just realized I'll probably never update the version number
	// like the asshole that I am

	if (msg.startsWith(prefix + 'ROLE')) {
		message.delete();
		try {
			let role = message.guild.roles.find(role => role.name === args[0]);
			let memb = (args[1] != undefined)
				? message.guild.members.find(user => user.user.username === args[1])
				: message.member;
			memb.addRole(role);
		}
		catch(err) {
			console.log(`HOLY FUCKING HELL WE GOT A ROLE ERROR:  ${err.message}`)
		}
	}


	// delete marked messages


	async function purge(check) { // wrapped in async since await only works in it
		await message.delete(); // delete command message

		if /*(!message.member.roles.some(r=>["GM", "Game Master", "Admin", "Bot Dev", "Mod", "Moderator", "Owner", "gEEK"].includes(r.name)))*/
		(!message.member.hasPermission(`MANAGE_MESSAGES`) {
			message.reply('You do not have permission to manage messages.')
				.then(msg => {
					msg.delete(5000);
					console.log(origin + 'Denied perms.');
				//	console.log('DEBUG: User Perms:	' + message.member.permissions);
				//	console.log('DEBUG: User Perms:	' + message.member.roles);
				})
				.catch(error => console.log(origin + `Permission Error: ${error}`));
			return;
		}



		if (isNaN(args[0])) {
			message.reply('Please use a number. \n Usage: ' + prefix + 'ooc [amount]')
			.then(msg => {
				msg.delete(8000);
				console.log(origin + 'Non-numerical input.');
			})
			.catch(error => console.log(origin + `Permission Error: ${error}`));
			return;
		}

		if ((args[0]) > 100) {
			message.reply('I cannot delete more than 100 messages at a time. \n Usage: ' + prefix + 'ooc [amount]')
			.then(msg => {
				msg.delete(8000);
				console.log(origin + 'Input greater than 100.');
			})
			.catch(error => console.log(origin + `Permission Error: ${error}`));
			return;
		}

		const fetched = await message.channel.fetchMessages({limit: args[0]});
		const filteredr = fetched.filter(input => input["content"].startsWith(check) && input["pinned"] == false);
		console.log(origin + fetched.size + ' messages found, ' + filteredr.size + ' removed.');
		message.channel.bulkDelete(filteredr)
			.catch(error =>	{
				console.log(`Couldn't delete: ${error}`);
				message.reply('Some messages could not be deleted because they are older than 14 days.')
					.then(msg => msg.delete(8000));
			});

	}

	if (msg.startsWith(prefix + 'OOC')) {
		purge('(');
	}

	if (msg.startsWith(prefix + 'CLEANUP') && sender.username == 'AlexCheese') {
		purge('');
	}


	else if (msg.startsWith(prefix + 'PING')) {
		message.delete();
		console.log(origin + 'Ping pong!');
		var r = '';
		for (i = 0; i > 20; i++) {
			r += Math.random().toString(36).substring(2);
		}
		message.reply(r)
			.then(msg => msg.delete(10000))


	}


/*else if (msg.startsWith(prefix)) {
		message.delete();
		message.reply("Unknown command.")
			.then(msg => msg.delete(10000));

	}*/





});

bot.on('ready', () => {

  bot.user.setStatus('online');
	let currentdate = new Date();
	console.log("Launch at " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds());
  console.log("Bot launch complete");


});
