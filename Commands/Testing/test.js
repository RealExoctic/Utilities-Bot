module.exports = {
    Name: "test",
    Description:"Test Command. Hello World!",
    MinimumRole: undefined, // Undefined = any
    Execute(Client,Message,Arguments) {
        Message.lineReply("Hello")        
    }
}
