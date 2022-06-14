const dotenv = require('dotenv');
dotenv.config();

const {Client} = require('discord.js-selfbot-v13');
const express = require('express');
const client = new Client();
const app = express();

client.on('ready', () => {
    client.setting.setCustomStatus({
        status: 'online',
        text: 'Catch me offline and ill give you $10',
        emoji: null,
        expires: null,
      });
});
client.login(process.env.token);
app.get('/', (req, res) => {
    res.send('.');
})
app.listen(process.env.PORT);