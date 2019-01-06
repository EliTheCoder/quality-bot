// Calling package
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let token = JSON.parse(fs.readFileSync('token.json')).token;
bot.login(token);
console.log("Started life anew");



// Config

const prefix = '>';

// Listener Event: Received message
bot.on('message', message => {

  let sender = message.author; // who sent the message
	if sender.username == `AlexCheese` {
		sender.username == `Nerd`;
	}
  let msg = message.content.toUpperCase(); // converts entire message to to uppercase
  let cont = message.content.slice(prefix.length).split(" "); // slices off command prefix
  let args = cont.slice(1); // slices off command, leaving only arguments
	let currentdate = new Date();
	let origin = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + '  ' + message.guild.name.trim().substring(0,10) + ' / ' + sender.username.trim().substring(0,10) + ' / ' + message.channel.name.substring(0,10) + '  ' + msg + ':  '



	// delete marked messages
	if (msg.startsWith(prefix + 'OOC')) {

		async function purge() { // wrapped in async since await only works in it
			await message.delete(); // delete command message

			if /*(!message.member.roles.some(r=>["GM", "Game Master", "Admin", "Bot Dev", "Mod", "Moderator", "Owner", "gEEK"].includes(r.name)))*/
			(!message.member.permissions.has(`MANAGE_MESSAGES`)  && (!sender.username == `Nerd`)) {
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
			const filteredr = fetched.filter(input => input["content"].startsWith('(') && input["pinned"] == false);
			console.log(origin + fetched.size + ' messages found, ' + filteredr.size + ' removed.');
			message.channel.bulkDelete(filteredr)
				.catch(error =>	{
					console.log(`Couldn't delete: ${error}`);
					message.reply('Some messages could not be deleted because they are older than 14 days.')
						.then(msg => msg.delete(8000));
				});

		}

		purge();

	}


/*	if (msg.startsWith(prefix + 'CLEAN')) {

		async function purgeall() { // wrapped in async since await only works in it
			await message.delete(); // delete command message

			if (!message.member.roles.some(r=>["GM", "Game Master", "Admin", "Bot Dev", "Mod", "Moderator", "Owner"].includes(r.name))) {
				message.reply('You do not have permission to do this.')
					.then(msg => {
						msg.delete(5000);
						console.log(origin + 'lol, ' + sender.username + ' was denied perms.');
					})
					.catch(error => console.log(origin + `Permission Error: ${error}`));
				return;
			}



			if (isNaN(args[0])) {
				message.reply('Please use a number. \n Usage: ' + prefix + 'clean [amount]')
				.then(msg => {
					msg.delete(8000);
					console.log(origin + 'lol, ' + sender.username + ' didn\'t use a number.');
				})
				.catch(error => console.log(origin + `Permission Error: ${error}`));
				return;
			}

			if ((args[0]) > 100) {
				message.reply('I cannot delete more than 100 messages at a time. \n Usage: ' + prefix + 'clean [amount]')
				.then(msg => {
					msg.delete(8000);
					console.log(origin + 'lol, ' + sender.username + ' used a number greater than 100.');
				})
				.catch(error => console.log(origin + `Permission Error: ${error}`));
				return;
			}

			const fetched = await message.channel.fetchMessages({limit: args[0]});
			//console.log(fetched)
			const filterall = fetched.filter(input => input["content"].startsWith('"' || '*') && input["pinned"] == false);
			console.log(origin + fetched.size + ' messages found, ' + filterall.size + ' marked.');
			message.channel.bulkDelete(filterall)
				.catch(error =>	{
					console.log(`Couldn't delete: ${error}`);
					message.reply('Some messages could not be deleted because they are older than 14 days.')
						.then(msg => msg.delete(8000));
				});

		}

		purgeall();

	}
*/

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
