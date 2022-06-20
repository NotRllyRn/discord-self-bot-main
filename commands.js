var Offline = false
var client

const commands = {
    tstatus: async () => {
        Offline = !Offline
        client.setting.setCustomStatus({
            status: !Offline ? 'online' : 'idle',
            text: 'Catch me offline and ill give you $10',
            emoji: null,
            expires: null,
        });

        return `Set status to ${!Offline ? 'online' : 'idle'}.`
    },
}
module.exports = {
    run: async (name, ...args) => {
        console.log(name)
        if (commands[name]) {
            console.log("found")
            return await commands[name](...args)
        } else {
            console.log("no")
            return `Command not found`
        }
    },
    setClient: (cl) => {
        if (cl) client = cl;
    },
}