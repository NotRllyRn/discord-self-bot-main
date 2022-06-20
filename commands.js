var Offline = false
var client

module.exports = {
    run: async (name, ...args) => {
        if (this[name]) {
            return this[name](...args)
        } else {
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