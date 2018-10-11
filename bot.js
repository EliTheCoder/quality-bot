// Calling package
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

bot.login('NDM3MjU2MDcwNjUwNjU4ODIz.DlzDiA.DqRguaHGN6cjcu_oiX2RypGgirs');

console.log("Started life anew");



// Config

const prefix = '>';
global.speciald = '24';
// Listener Event: Received message
bot.on('message', message => {

  let sender = message.author; // who sent the message
  let msg = message.content.toUpperCase(); // converts entire message to to uppercase
  let cont = message.content.slice(prefix.length).split(" "); // slices off command prefix
  let args = cont.slice(1); // slices off command, leaving only arguments
	let currentdaten = new Date();
	let morigin = currentdaten.getHours() + ":" + currentdaten.getMinutes() + ":" + currentdaten.getSeconds() + '  ' + message.guild.name + '  ' + msg + ':  '

	// delete marked messages
	if (msg.startsWith(prefix + 'OOC')) {

		async function purge() { // wrapped in async since await only works in it
			await message.delete(); // delete command message

			if (!message.member.roles.some(r=>["GM", "Game Master", "Admin", "Bot Dev", "Mod", "Moderator", "Owner"].includes(r.name))) {
				message.reply('You do not have permission to do this.')
					.then(msg => {
						msg.delete(5000);
						console.log(morigin + 'lol, ' + sender.username + ' was denied perms.');
					})
					.catch(error => console.log(morigin + `Permission Error: ${error}`));
				return;
			}



			if (isNaN(args[0])) {
				message.reply('Please use a number. \n Usage: ' + prefix + 'ooc [amount]')
				.then(msg => {
					msg.delete(8000);
					console.log(morigin + 'lol, ' + sender.username + ' didn\'t use a number.');
				})
				.catch(error => console.log(morigin + `Permission Error: ${error}`));
				return;
			}

			if ((args[0]) > 100) {
				message.reply('I cannot delete more than 100 messages at a time. \n Usage: ' + prefix + 'ooc [amount]')
				.then(msg => {
					msg.delete(8000);
					console.log(morigin + 'lol, ' + sender.username + ' used a number greater than 100.');
				})
				.catch(error => console.log(morigin + `Permission Error: ${error}`));
				return;
			}

			const fetched = await message.channel.fetchMessages({limit: args[0]});
			//console.log(fetched)
			const filteredr = fetched.filter(input => input["content"].startsWith('(') && input["pinned"] == false);
			console.log(morigin + fetched.size + ' messages found, ' + filteredr.size + ' marked.');
			message.channel.bulkDelete(filteredr)
				.catch(error =>	{
					console.log(`Couldn't delete: ${error}`);
					message.reply('Some messages could not be deleted because they are older than 14 days.')
						.then(msg => msg.delete(8000));
				});

		}

		purge();

	}


	if (msg.startsWith(prefix + 'CLEAN')) {

		async function purgeall() { // wrapped in async since await only works in it
			await message.delete(); // delete command message

			if (!message.member.roles.some(r=>["GM", "Game Master", "Admin", "Bot Dev", "Mod", "Moderator", "Owner"].includes(r.name))) {
				message.reply('You do not have permission to do this.')
					.then(msg => {
						msg.delete(5000);
						console.log(morigin + 'lol, ' + sender.username + ' was denied perms.');
					})
					.catch(error => console.log(morigin + `Permission Error: ${error}`));
				return;
			}



			if (isNaN(args[0])) {
				message.reply('Please use a number. \n Usage: ' + prefix + 'clean [amount]')
				.then(msg => {
					msg.delete(8000);
					console.log(morigin + 'lol, ' + sender.username + ' didn\'t use a number.');
				})
				.catch(error => console.log(morigin + `Permission Error: ${error}`));
				return;
			}

			if ((args[0]) > 100) {
				message.reply('I cannot delete more than 100 messages at a time. \n Usage: ' + prefix + 'clean [amount]')
				.then(msg => {
					msg.delete(8000);
					console.log(morigin + 'lol, ' + sender.username + ' used a number greater than 100.');
				})
				.catch(error => console.log(morigin + `Permission Error: ${error}`));
				return;
			}

			const fetched = await message.channel.fetchMessages({limit: args[0]});
			//console.log(fetched)
			const filterall = fetched.filter(input => input["content"].startsWith('"' || '*') && input["pinned"] == false);
			console.log(morigin + fetched.size + ' messages found, ' + filterall.size + ' marked.');
			message.channel.bulkDelete(filterall)
				.catch(error =>	{
					console.log(`Couldn't delete: ${error}`);
					message.reply('Some messages could not be deleted because they are older than 14 days.')
						.then(msg => msg.delete(8000));
				});

		}

		purgeall();

	}


	if (msg.startsWith(prefix + 'PING')) {
		message.delete();
		let shit = 10;
		while (shit > 0) {
			message.reply('fdsauvunhsdovfnagggshibyuiogrdbyouirgaeobyuiv by vg yabutvuygw34vg784g6t873gn768vn697a43n93wgt376vq78oaw8hftguheihgnvf ytn8yy7ny7ngay7')
				.then(msg => {
					msg.delete(10000);
					console.log(morigin + 'Ping pong!');
				})
			shit--;
		}


	}




/*
	if (message.channel.id === '461877393863475202') { // i am such a troll
		console.log('channel located');
		if (global.speciald === '24') {
			setTimeout(function(){message.channel.send("AHHH YES");}, 1000);
			setTimeout(function(){message.channel.send("ANOTHER SERVER TAKEN OVER");}, 4000);

			console.log('sent and set');
			global.speciald = '25';
		}

	}*/



});

bot.on('ready', () => {

  bot.user.setStatus('online');
	var currentdate = new Date();
	console.log("Launch at " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds());
  console.log("Bot launch complete");


});
