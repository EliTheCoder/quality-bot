module.exports.run = async (bot, message, args, origin) => {  // Runs when command is called
	if (message.author.username != 'AlexCheese') { return 0 };
	message.delete();
	switch (args[0]) {

		case 'serverinfo':
			if (args[1] == 'all')
				console.log(message.guild);
			else
				console.log(message.guild[args[1]]);
	}
	return 0;
}

module.exports.config = {  // Command info
	name: 'dev',
	usage: '>dev [command] (args)'

}
