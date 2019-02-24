module.exports.run = async (bot, message, args, origin) => {  // Runs when command is called
	await message.delete(); // delete command message
	const check = '(';

	if (!message.member.permissions.has(`MANAGE_MESSAGES`) || (!message.author.username == `AlexCheese`)) {
		return `Missing 'Manage Messages' permission`;
	}

	if (isNaN(args[0])) {
		return `Please use a number`;
	}

	if ((args[0]) > 100) {
		return `Cannot delete more than 100 messages`;
	}

	const fetched = await message.channel.fetchMessages({limit: args[0]});
	const filteredr = fetched.filter(input => input["content"].startsWith(check) && input["pinned"] == false);
	console.log(origin + fetched.size + ' messages found, ' + filteredr.size + ' removed.');
	message.channel.bulkDelete(filteredr)
		.catch(error =>	{
			console.log(`Couldn't delete: ${error}`);
			return `Some messages could not be deleted, probably because they are older than 14 days`;
		});
	return 0;

}

module.exports.config = {  // Command info
	name: 'ooc',
	usage: '>ooc [number]'

}
