const Axios = require("Axios")
const Discord = require("discord.js")

module.exports = {
    Name: "userinfo",
    Description: "Gives you info about the user. Both discord and roblox.",
    MinimumRole: undefined, // Undefined = any
    Execute(Client,Message,Arguments) {
        var User = Message.mentions.members.first()

        async function GetInfo() {
            const MessageToDelete = await Message.lineReply("Getting info...")
                Axios.get("https://verify.eryn.io/api/user/" + User.id).then(function(response) {
                    const Data = response.data
                    MessageToDelete.delete()
                    var PastUsernames = undefined
                    Axios.get("https://users.roblox.com/v1/users/" + Data.robloxId + "/username-history?limit=50&sortOrder=Asc").then(function(response) {
                        PastUsernames = response.Data
                    })

                    Axios.get("https://users.roblox.com/v1/users/" + Data.robloxId).then(function(response2) {
                        const DetailedData = response2.data
                        var Banned = false

                        if (DetailedData.isBanned == true) {
                            Banned = "Yes"
                        } else {
                            Banned = "No"
                        }

                    const Embed = new Discord.MessageEmbed()
                        .setColor("#0099ff")
                        .setTitle("Roblox Profile")
                        .setURL("https://roblox.com/users/" + Data.robloxId + "/profile")
                        .setAuthor(Data.robloxUsername + " | " + User.user.tag + "'s info")
                        .setDescription(DetailedData.description)
                        .setThumbnail("https://www.roblox.com/bust-thumbnail/image?userId=" + Data.robloxId + "&width=420&height=420&format=png")
                        .addFields(
                            {name: ":hammer: Is Banned? ", value: Banned, inline: true},
                            {name: ":desktop: DisplayName ", value: DetailedData.displayName,inline:true},
                            {name: ":date: Made on", value: DetailedData.created, inline:true},
                        )
                        .setFooter("Utilities bot developed by RealExoctic#8440 ❤️")
                        Message.lineReply(Embed)
                    })
            }).catch(err => {
                console.warn(err)
            })
        }
        GetInfo()

    }
}
