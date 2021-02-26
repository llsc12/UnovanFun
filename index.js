const discord = require("discord.js"), fs = require("fs"), Discord = require("discord.js");
const client = new Discord.Client({ messageSweepInterval: 60, disableEveryone: true }) // Create a client
const {bot_token, prefix} = require('./config.json')
const fetch = require('node-fetch');

console.log(fetch('https://nekos.life/api/v2/endpoints'));