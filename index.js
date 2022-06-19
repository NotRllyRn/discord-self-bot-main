const dotenv = require('dotenv');
dotenv.config();

const {Client} = require('discord.js-selfbot-v13');
const express = require('express');
const client = new Client();
const app = express();
const commands = require('./commands');

client.on('ready', () => {
    client.setting.setCustomStatus({
        status: 'online',
        text: 'Catch me offline and ill give you $10',
        emoji: null,
        expires: null,
    });
    commands.setClient(client);
});
client.on('message', async (msg) => {
    if ((msg.author != client.user) || (!msg.content.startsWith("!"))) return;
    const [output] = commands.run(msg.content.trim().substring(1).split(' '));

    if (output[0] & output[0] != 'Command not found') {
        msg.channel.send(output);
    } else if (output[0] == 'Command not found') {
        msg.channel.send("Command not found");
    } else {
        msg.channel.send('Success');
    }
});

client.login(process.env.token);
app.get('/', (req, res) => {
    res.send('.');
})
app.listen(process.env.PORT);