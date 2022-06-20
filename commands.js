var Offline = false
var client

module.exports = {
    run: async (name, ...args) => {
        console.log(name)
        if (this[name]) {
            console.log("found")
            return this[name](...args)
        } else {
            console.log("no")
            return `Command not found`
        }
    },
    setClient: (cl) => {
        if (cl) client = cl;
    },
    tstatus: async () => {
        Offline = !Offline

        console.log(!Offline ? 'online' : 'idle')

        client.setting.setCustomStatus({
            status: !Offline ? 'online' : 'idle',
            text: 'Catch me offline and ill give you $10',
            emoji: null,
            expires: null,
        });
    }
}