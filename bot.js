const fs = require("fs")

const Discord = require("discord.js")
require('discord-reply')
// const {prefix} = require("./config.json")
const Enmap = require("enmap")
require("dotenv").config()
const Client = new Discord.Client()
Client.Commands = new Discord.Collection()

// Setup Commands
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		Client.Commands.set(command.Name, command);
	}
}

console.log(Client.Commands)

Client.Settings = new Enmap({
    name: "Settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep',
    autoEnsure: {
        Prefix: ";",
        modLogChannel: "mod-log",
        modRole: "Moderator",
        adminRole: "Administrator",
        welcomeChannel: "welcome",
        welcomeMessage: "Say hello to {{user}}, everyone!",
        botDisabled: false,
    }
})

Client.on("ready", () => {
    console.log("Ready, I'm currently in " + Client.guilds.cache.size + " servers")
})

Client.on("guildDelete", guild => {
    // When the bot leaves or is kicked, delete settings to prevent stale entries.
    Client.settings.delete(guild.id);
});
Client.on("guildCreate", guild => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    //Client.settings.add(guild.id,Client.settings.defaultSettings)
    channel.send(":wave: Hello! \n Thanks for inviting me to your server! I've already configured a lot of the settings for you and you can modify them with ;setsetting \n You can also view the configuration by running ;showsettings \n If you have any questions feel free to join the bot's server: https://discord.gg/qQ8QVz6k")
})

Client.on("guildMemberAdd", member => {
    // This executes when a member joins, so let's welcome them!
  
    // First, ensure the settings exist
    Client.settings.ensure(member.guild.id, defaultSettings);
  
    // First, get the welcome message using get: 
    let welcomeMessage = Client.settings.get(member.guild.id, "welcomeMessage");
  
    // Our welcome message has a bit of a placeholder, let's fix that:
    welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag)
  
    // we'll send to the welcome channel.
    member.guild.channels.cache
      .find(channel => channel.name === client.settings.get(member.guild.id, "welcomeChannel"))
      .send(welcomeMessage)
      .catch(console.error);
  });

Client.on("message", Message => {
    const GuildConfig = Client.Settings.get(Message.guild.id)
    const Prefix = GuildConfig.Prefix

    if (!Message.guild || Message.author.bot || GuildConfig.botDisabled) return;

    //console.log(GuildConfig)
    if (!Message.content.startsWith(Prefix)) return;

    console.log("Getting Command",Message.content)

    var Arguments = Message.content.slice(Prefix.length).trim().split(/ +/)
    console.log(Arguments)
    const Command = Arguments.shift().toLowerCase()
    Arguments = Arguments.filter(function(item) {
        return item !== Command
    })
    try {
        const CommandFile = Client.Commands.get(Command)
        CommandFile.Execute(Client,Message,Arguments)
        Message.react("<:Accept:832715798220374036>")
        console.log("Got command " + Command)
    } catch (err) {
        Message.lineReply("Command error or invalid command (did you spell it correctly?)")
        Message.react("<:Denied:832715729698553867>")
        console.log(err)
    }
})

Client.login(process.env.DISCORDTOKEN)