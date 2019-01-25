module.exports.run = async (bot, message, args, origin) => {  // Runs when command is called
	message.delete();
	let errorcode = 0;
	try {
		let role = message.guild.roles.find(role => role.name === args[0]);
		let memb = (args[1] != undefined)
			? message.guild.members.find(user => user.user.username === args[1])
			: message.member;
		memb.addRole(role)
			.catch(error => {
				console.log(`Role error`);
				errorcode = `Invalid Syntax`;
			});
	}
	catch(err) {
		console.log(`BOT ERROR: ${err}`)
		errorcode = `Something went wrong`;
	}
	finally {
		return errorcode;
	}
}

module.exports.config = {  // Command info
	name: 'role',
	usage: '>role [role] (member)'

}
