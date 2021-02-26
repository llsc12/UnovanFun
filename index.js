const discord = require("discord.js"), fs = require("fs"), Discord = require("discord.js");
const client = new Discord.Client({ messageSweepInterval: 60, disableEveryone: true }) // Create a client
const {bot_token, prefix} = require('./config.json')
const fetch = require('node-fetch');
let valid = new Array();
valid = ['8ball', 'Random_hentai_gif', 'meow', 'erok', 'lizard', 'feetg', 'baka', 'v3', 'bj', 'erokemo', 'tickle', 'feed', 'neko', 'kuni', 'femdom', 'futanari', 'smallboobs', 'goose', 'nekoapi_v3.1', 'poke', 'les', 'trap', 'pat', 'boobs', 'blowjob', 'hentai', 'hololewd', 'ngif', 'fox_girl', 'wallpaper', 'lewdk', 'solog', 'pussy', 'yuri', 'lewdkemo', 'lewd', 'anal', 'pwankg', 'nsfw_avatar', 'eron', 'kiss', 'pussy_jpg', 'woof', 'hug', 'keta', 'cuddle', 'eroyuri', 'slap', 'cum_jpg', 'waifu', 'gecg', 'tits', 'avatar', 'holoero', 'classic', 'kemonomimi', 'feet', 'gasm', 'spank', 'erofeet', 'ero', 'solo', 'cum', 'smug', 'holo', 'nsfw_neko_gif']

client.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    message.delete()
    let bonk = message.content.split(prefix)
    let args = bonk[1].split(" ");
    let command = args.shift().toLowerCase();
    if (command == 'neko') {
      if (message.channel.topic) {
        if (!message.channel.topic.includes('NSFW')) {
          if (!message.channel.nsfw) {
            let nembed = new discord.MessageEmbed()
            .addField('bruh, think about the children','If this was supposed to work, set channel to NSFW or include NSFW in channel topic')
            .setColor('GREEN')
            .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
            message.channel.send(nembed)
            return;
          }
        }
      } else if (!message.channel.nsfw) {
        let nembed = new discord.MessageEmbed()
        .addField('bruh, think about the children','If this was supposed to work, set channel to NSFW or include NSFW in channel topic')
        .setColor('GREEN')
        .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
        message.channel.send(nembed)
        return;
      }
      
      if (!args[0]) {
        args = ['neko']
      }
      if (args[0]) {
        var n = valid.includes(args[0])
        if (n == false) {
          let nembed = new discord.MessageEmbed()
          .setTitle('Invalid argument')
          .setColor('RED')
          .addField('Here are valid arguments', String(valid))
          .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
          message.channel.send(nembed)
          return;
        }
      }
      fetch(`https://nekos.life/api/v2/img/${args[0]}`)
        .then(res => res.json())
        .then(json => {
          let nembed = new discord.MessageEmbed()
          .setTitle(args[0])
          .setURL(json.url)
          .setImage(json.url)
          .setColor('BLUE')
          .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
          message.channel.send(nembed)
        });
    }

    if (command == 'nsfwtest') {
      message.channel.send(message.channel.nsfw)
    }
  }
});

client.on("ready", () => {
client.user.setPresence({status: "dnd"})
client.user.setActivity('imagine being horny smh', { type: 'PLAYING' });
console.log('ready')
})


client.login(bot_token)