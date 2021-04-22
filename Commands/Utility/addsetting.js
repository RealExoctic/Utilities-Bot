module.exports = {
    Name: "addsetting",
    Description: "Adds a setting.",
    MinimumRole: undefined, // Undefined = any
    Execute(Client,Message,Arguments) {
        const ServerConfig = Client.Settings.get(Message.guild.id)
        const Name = Arguments[1]
        const Value = Arguments[2]

        ServerConfig.add(Name,Value)
        
    }
}
