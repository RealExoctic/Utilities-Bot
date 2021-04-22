module.exports = {
    Name: "showsettings",
    Description: "Shows the settings.",
    MinimumRole: undefined, // Undefined = any
    Execute(Client,Message,Arguments) {
        const ServerConfig = Client.Settings.get(Message.guild.id)
        let Props = Object.keys(ServerConfig).map(prop => {
            return `${prop} : ${ServerConfig[prop]}`;
        })
        Message.lineReply("Config for " + Message.guild.name + ": ``` " + Props.join("\n") + "```")
    }
}
