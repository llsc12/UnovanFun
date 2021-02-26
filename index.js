const discord = require("discord.js"), fs = require("fs"), Discord = require("discord.js");
const client = new Discord.Client({ messageSweepInterval: 60, disableEveryone: true }) // Create a client
const {bot_token, prefix} = require('./config.json')
const fetch = require('node-fetch');

client.commands = new Discord.Collection(); // Creates a code collection

client.on("ready", async () => { // Logs response when started
  console.log(`bonk`);
});

let commands = {} // A bit of pre-work to set all things up
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  console.log(files)
  for (var file of files) if (file.endsWith(".js")) {
    commands[file.replace(".js", "")] = `./commands/${file}`;
    let props = require(`./commands/${file}`);
    client.commands.set(props.help.name, props);
  }
});

client.on("message", async message => {
  if (!message.guild || message.author.bot) return;

  if (message.content.startsWith(prefix) || message.content.match(`^<@!?${client.user.id}> `)) {
    let args = message.content.split(" ");
    if (args[0].match(`^<@!?${client.user.id}>`)) args.shift(); else args[0] = args[0].slice(prefix.length);
    let command = args.shift().toLowerCase()

    if (commands[command]) try {
      let commandFile = require(commands[command])

      if (getPermissionLevel(message.member) < commandFile.permissionRequried) return message.channel.send(`❌ You don't have permission! For help type \`${prefix}help\`.`); // Starting some basic commands.
      commandFile.run(client, message, args, config, queue)
    } catch(e) {}
  } else if (message.content.match(`^<@!?${client.user.id}>`)) return message.channel.send(`👋 My prefix is \`${prefix}\`. Commands are ${Object.keys(commands).map(c => `\`${prefix}${c}\``).join(", ")}.`); // Says this when pinged.
})


fetch('https://nekos.life/api/v2/endpoints')
    .then(res => res.json())
    .then(json => console.log(json))

client.login(bot_token)