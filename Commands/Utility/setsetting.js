module.exports = {
    Name: "setsetting",
    Description: "Set a setting.",
    MinimumRole: undefined, // Undefined = any
    Execute(Client,Message,Arguments) {
        const ServerConfig = Client.Settings.get(Message.guild.id)
        const adminRole = Message.guild.roles.cache.find(role => role.name === ServerConfig.adminRole);
        if (adminRole || !Message.member.roles.cache.has(adminRole.id)) {
            Message.lineReply("Unauthorized to edit server config.")
        }
        const [prop, ...value] = Arguments;

        if(!Client.Settings.has(Message.guild.id, prop)) {
            return Message.lineReply("Invalid setting to edit.");
        }
        Client.Settings.set(Message.guild.id, value.join(" "), prop);
    
        // We can confirm everything's done to the client.
        Message.lineReply("Changed " + Message.guild.name + "'s config: ``` \n + " + prop + " = " + value + "```")
    }
}
