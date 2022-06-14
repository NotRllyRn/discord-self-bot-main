const dotenv = require('dotenv');
dotenv.config();

const {Client} = require('discord.js-selfbot-v13');
const express = require('express');
const client = new Client();

client.login(process.env.token);
client.on('ready', () => {
    client.setting.setCustomStatus({
        status: 'online',
        text: 'Catch me offline and ill give you $10',
        emoji: null,
        expires: null,
      });
});
const app = express();
app.get('/', (req, res) => {
    res.send('.');
})
app.listen(process.env.PORT);