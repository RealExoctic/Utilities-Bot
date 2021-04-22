const axios = require("axios")

module.exports = {
    Name: "checkdisplayname",
    Description: "Checks if you can use the displayname.",
    MinimumRole: undefined, // Undefined = any
    Execute(Client,Message,Arguments) {
        const Roblox = Client.Roblox
        
        //Roblox.getUser(DisplayName).then( user => {
            //console.log(user)
        //})
    }
}
