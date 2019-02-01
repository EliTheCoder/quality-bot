module.exports.run = async (bot, message, args, origin) => {  // Runs when command is called
	if (message.author.username != 'AlexCheese') { return 0 };
	message.delete();
	switch (args[0]) {

		case 'serverinfo':
			if (args[1] == 'all')
				console.log(message.guild);
			else
				console.log(message.guild[args[1]]);
			break;
		case 'botinfo':
			message.delete();
			message.channel.send(`
				Bot is in ${bot.guilds.size} servers
				Current server is '${message.guild.name}', id '${message.guild.id}'
				`)
					.then(msg => msg.delete(20000));
			break;
	}
	return 0;
}

module.exports.config = {  // Command info
	name: 'dev',
	usage: '>dev [command] (args)'

}
