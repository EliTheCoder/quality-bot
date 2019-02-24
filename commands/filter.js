const Discord = require('discord.js');
const fs = require('fs');
module.exports.init = (bot) => {
	bot.filters = new Discord.Collection();
}
module.exports.run = async (bot, message, args, origin) => {  // Runs when command is called
	message.delete();
	if (!message.member.permissions.has(`MANAGE_MESSAGES`) || (!message.author.username == `AlexCheese`)) {
		return `Missing 'Manage Messages' permission`;
	}
	let alreadyFiltered = bot.filters.has(message.channel.id);
	if (alreadyFiltered) {
		message.channel.send("OOC Filtering disabled in this channel.")
			.then(msg => msg.delete(5000));
		bot.filters.get(message.channel.id).stop();
		bot.filters.delete(message.channel.id); // deletey wheatey
	}
	else {
		const fetched = await message.channel.fetchMessages({limit: 100});
		const filteredr = fetched.filter(input => input["content"].startsWith('(') && input["pinned"] == false);
		console.log(origin + fetched.size + ' messages found, ' + filteredr.size + ' removed.');
		message.channel.bulkDelete(filteredr)
			.catch(error =>	{
				console.log(`Couldn't delete: ${error}`);
				return `Some messages could not be deleted, probably because they are older than 14 days`;
			});
		message.channel.send("OOC Filtering enabled in this channel.")
			.then(msg => msg.delete(5000));
		let collector = new Discord.MessageCollector(message.channel, message => !message.content.startsWith('“') && !message.content.startsWith('*') && !message.content.startsWith('"') && !message.member.permissions.has(`MANAGE_MESSAGES`))
		collector.on('collect', message => message.delete())
		bot.filters.set(message.channel.id, collector);
	}
	return 0;
}

module.exports.config = {  // Command info
	name: 'filter',
	usage: '>filter'

}
