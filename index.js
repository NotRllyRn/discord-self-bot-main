const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js-selfbot-v11');
const express = require('express');
const client = new Discord.Client();

client.login(process.env.token);
const app = express();
app.get('/', (req, res) => {
    res.send('.');
})
app.listen(process.env.PORT);