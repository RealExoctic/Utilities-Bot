module.exports = {
    Name: "help",
    Description: "Shows a help list.",
    Execute(Client,Message,Arguments) {
        const prefix= Client.Settings.get("Prefix")
        const data = [];
		const commands = Client.Commands

		if (!Arguments.length) {
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			return Message.author.send(data, { split: true })
				.then(() => {
					if (Message.channel.type === 'dm') return;
					Message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${Message.author.tag}.\n`, error);
					Message.reply('it seems like I can\'t DM you!');
				});
		}

		const name = Arguments[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return Message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		Message.channel.send(data, { split: true });
    }
}