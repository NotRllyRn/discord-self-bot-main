const dotenv = require('dotenv');
dotenv.config();

const {Client} = require('discord.js-selfbot-v13');
const express = require('express');
const client = new Client();
const app = express();
const commands = require('./commands');

let idleto
let offlineto

client.on('ready', () => {
    client.setting.setCustomStatus({
        status: 'online',
        text: 'I am no longer giving 10 dollars to people who see me offline.',
        emoji: null,
        expires: null,
    });
    commands.setClient(client);
});
client.on('messageCreate', async (msg) => {
    if (msg.author == client.user) {
        client.setting.setCustomStatus({
            status: 'online',
            text: 'I am no longer giving 10 dollars to people who see me offline.',
            emoji: null,
            expires: null,
        });
    
        if (idleto) {
            clearTimeout(idleto);
            idleto = null;
        }
        if (offlineto) {
            clearTimeout(offlineto);
            offlineto = null;
        }
    
        idleto = setTimeout(() => {
            client.setting.setCustomStatus({
                status: 'idle',
                text: 'I am no longer giving 10 dollars to people who see me offline.',
                emoji: null,
                expires: null,
            });
            idleto = null;
        }, 5 * 60 * 1000);
        offlineto = setTimeout(() => {
            client.setting.setCustomStatus({
                status: 'dnd',
                text: 'I am no longer giving 10 dollars to people who see me offline.',
                emoji: null,
                expires: null,
            });
            offlineto = null;
        }, 30 * 60 * 1000);
    }

    if ((msg.author != client.user) || (!msg.content.startsWith("!"))) return;
    const output = await commands.run(...msg.content.trim().substring(1).split(' '));

    if (!output) msg.channel.send("Successfully executed command"); 
    else if (output == "Command not found") msg.channel.send("Command not found");
    else msg.channel.send(JSON.stringify(output, null, 2));
});

client.login(process.env.token);
app.get('/', (req, res) => {
    res.send('.');
})
app.listen(process.env.PORT);