const Discord = require('discord.js');
const fs = require('fs');
module.exports.init = (bot) => {
	bot.filters = new Discord.Collection();
}
module.exports.run = async (bot, message, args, origin) => {  // Runs when command is called
	message.delete();
	let alreadyFiltered = bot.filters.has(message.channel.id);
	if (alreadyFiltered) {
		message.channel.send("OOC Filtering disabled in this channel.")
			.then(msg => msg.delete(7000));
		bot.filters.get(message.channel.id).stop();
		bot.filters.delete(message.channel.id); // deletey wheatey
	}
	else {
		message.channel.send("OOC Filtering enabled in this channel.")
			.then(msg => msg.delete(7000));
		let collector = new Discord.MessageCollector(message.channel, message => message.content.startsWith('('))
		collector.on('collect', message => message.delete())
		bot.filters.set(message.channel.id, collector);
	}
	/*fs.writeFileSync("filteredchannels.json", JSON.stringify(channelList, null, 2), "utf8", {
		if (err) {
			return eliapi.log(2, err);
		}
	});*/
	return 0;
}

module.exports.config = {  // Command info
	name: 'filter',
	usage: '>filter'

}
