module.exports.run = async (bot, message, args, origin) => {  // Runs when command is called
	message.delete();
	message.channel.send(`
		Bot is in ${bot.guilds.size} servers
		Current server is '${message.guild.name}', id '${message.guild.id}'
		`)
			.then(msg => msg.delete(20000));
	return 0;
}

module.exports.config = {  // Command info
	name: 'info',
	usage: '>info'

}
