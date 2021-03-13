const discord = require("discord.js"), fs = require("fs"), Discord = require("discord.js"), si = require('systeminformation');
const client = new Discord.Client({ 
  messageSweepInterval: 60, 
  disableEveryone: true, 
  presence: {
    status: 'dnd',
    activity: {
      name: 'hentai lol',
      type: 'WATCHING',
    },
  }
}) // Create a client
const {bot_token, prefix} = require('./config.json')
const fetch = require('node-fetch');
let valid = new Array();
valid = ['8ball', 'Random_hentai_gif', 'meow', 'erok', 'lizard', 'feetg', 'baka', 'v3', 'bj', 'erokemo', 'tickle', 'feed', 'neko', 'kuni', 'femdom', 'futanari', 'smallboobs', 'goose', 'nekoapi_v3.1', 'poke', 'les', 'trap', 'pat', 'boobs', 'blowjob', 'hentai', 'hololewd', 'ngif', 'fox_girl', 'wallpaper', 'lewdk', 'solog', 'pussy', 'yuri', 'lewdkemo', 'lewd', 'anal', 'pwankg', 'nsfw_avatar', 'eron', 'kiss', 'pussy_jpg', 'woof', 'hug', 'keta', 'cuddle', 'eroyuri', 'slap', 'cum_jpg', 'waifu', 'gecg', 'tits', 'avatar', 'holoero', 'classic', 'kemonomimi', 'feet', 'gasm', 'spank', 'erofeet', 'ero', 'solo', 'cum', 'smug', 'holo', 'nsfw_neko_gif']

client.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  if (message.content.startsWith(prefix)) {

    // Le command handler :)
    let args = message.content.split(prefix)[1].split(" ");
    let command = args.shift().toLowerCase();

    if (command == 'hentai' || command == 'h') {
      if (message.channel.topic) {
        if (!message.channel.topic.includes('NSFW')) {
          if (!message.channel.nsfw) {
            let nembed = new discord.MessageEmbed()
            .addField('bruh, think about the children','If this was supposed to work, set channel to NSFW or include NSFW in channel topic')
            .setColor('GREEN')
			.setTimestamp()
            .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
            message.channel.send(nembed)
            return;
          }
        }
      } else if (!message.channel.nsfw) {
        let nembed = new discord.MessageEmbed()
        .addField('bruh, think about the children','If this was supposed to work, set channel to NSFW or include NSFW in channel topic')
        .setColor('GREEN')
		.setTimestamp()
        .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
        message.channel.send(nembed)
        return;
      }
      
      if (args[0] == 'help') {
        let nembed = new discord.MessageEmbed()
        .setTitle('Help Menu')
        .setColor('RED')
        .addField('Syntax', '&hentai [optional:args]')
        .addField('Here are valid arguments', String(valid))
		.setTimestamp()
        .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
        message.channel.send(nembed)
        return;
      }
      
      if (!args[0]) {
        args = ['cum_jpg']
      }
      if (args[0]) {
        var n = valid.includes(args[0])
        if (n == false) {
          let nembed = new discord.MessageEmbed()
          .setTitle('Invalid argument')
          .setColor('RED')
          .addField('Use &hentai help','_ _')
		  .setTimestamp()
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
		  .setTimestamp()
          .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
          message.channel.send(nembed)
        });
    }

    if (command == 'nsfwtest') {
      message.channel.send(message.channel.nsfw)
    }

    if (command == 'minesweeper' || command == 'ms') {
        if (!args[0]) {
			message.channel.send(generateGame())
		} else if (args[0] == 'help') {
			let msembed = new discord.MessageEmbed()
			.setColor("YELLOW")
			.setTitle("Minesweeper Help")
			.addField('Syntax',`${prefix}minesweeper <x> <y> <bombs> [StartUncovered?]`)
			.addField(`Arguments Descriptors`,"Here's what to put for custom boards")
			.addField('x', 'The horizontal board size')
			.addField('y', 'The vertical board size')
			.addField('bombs', 'Quantity of bombs to place on the board')
			.addField('StartUncovered?', `Set to true if you want to have all 0's unhidden from the start`)
			.addField('_ _',"Note: You can totally use &minesweeper on its own and it'll use default settings. You can also use &ms as a shortcut!")
			.setTimestamp()
			.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
			message.channel.send(msembed)
		} else if (args[0] && args[1] && args[2]) {
			message.channel.send(generateGame(args[0], args[1], args[2], message, args[3]))
		} else {
			message.channel.send(`Invalid command syntax, refer to &minesweeper help`)
		}
    }

	if (command == 'status' || command == 'stat' || command == 'stats' || command == 'info') {
		let cpudata = 'erm'
		si.cpu()
    	.then(cpu => {
		console.log(cpu)
		let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let daysText = (days == 1 ? "day" : "days");
        let hoursText = (hours == 1 ? "hour" : "hours");
        let minutesText = (minutes == 1 ? "minute" : "minutes");
        let daysFinal = (days >= 1 ? days + " " + daysText + ", " : "");
        let hoursFinal = (hours >= 1 ? hours + " " + hoursText + ", " : "");
        let minutesFinal = (minutes >= 1 ? minutes + " " + minutesText + " and " : "");
        let uptime = `${daysFinal}${hoursFinal}${minutesFinal}${seconds} seconds`;
        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
			.setTitle(`System & Process Information for ${client.user.username}`)
			.setURL('https://discord.gg/YHnyVmKQwc')
            .setTimestamp()
            .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.addField('Process Information', `**Uptime** \n${uptime} \n**Serving** \n${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members \n**Running** \n${process.release.name} ${process.version}`)
			.addField(`System Information`,`**CPU** \n${cpu.cores} core ${cpu.manufacturer} ${cpu.brand}@${cpu.speed}GHz ${process.config.variables.host_arch}`)
		message.channel.send(embed)
		})
	}
  }
});

client.on('ready', () => {
  PingServer()
  console.log('ready')
});

function PingServer() { // Ping server every 10 seconds
  setInterval(function(){ client.guilds.cache.get('758016990567858187').channels.cache.get('816404028070035467').send('PING'); }, 20000);
}

// Minesweeper Generator by JochCool on GitHub. Thanks!

const neighbourLocations = [{x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: -1, y: 1}, {x: -1, y: 0}];

function log(message) {
	if (message instanceof Error) {
		message = message.stack;
	}
	var now = new Date();
	console.log(`[Minesweeper Bot] [${now.getUTCFullYear()}-${toTwoDigitString(now.getUTCMonth()+1)}-${toTwoDigitString(now.getUTCDate())} ${toTwoDigitString(now.getUTCHours())}:${toTwoDigitString(now.getUTCMinutes())}:${toTwoDigitString(now.getUTCSeconds())}] ${message}`);
};

function toTwoDigitString(num) {
	var str = num.toString();
	if (str.length == 1) return "0" + str;
	return str;
};

function generateGame(gameWidth, gameHeight, numMines, message, startsNotUncovered, isRaw) {
	
	/** ──────── CHECKS ──────── **/
	
	// Check game size
	if (isNaN(gameWidth)) {
		gameWidth = 6;
	}
	else if (gameWidth <= 0 || gameHeight <= 0) {
		return `Uh, I'm not smart enough to generate a maze sized ${gameWidth} by ${gameHeight}. I can only use positive numbers. Sorry :cry:`;
	}
	if (isNaN(gameHeight)) {
		gameHeight = 6;
	}
	else if (gameWidth > 40 || gameHeight > 20) {
		return "That's way too large! Think of all the mobile users who are going to see this!";
	}
	
	// Check mine count
	if (isNaN(numMines)) {
		numMines = Math.round(gameWidth * gameHeight / 5);
	}
	else {
		if (numMines <= 0) {
			return "You think you can look clever by solving a Minesweeper game without mines? Not gonna happen my friend.";
		}
		else if (numMines > gameWidth * gameHeight) {
			return "I can't fit that many mines in this game!";
		}
	}
	
	/** ──────── CREATE GAME ──────── **/
	
	// 2D array that contains the game, sorted [y][x]. -1 means a mine, positive number is the amount of neighbouring mines
	var game = [];
	
	// Initialise the game array with zeroes
	for (var y = 0; y < gameHeight; y++) {
		game.push([]);
		for (var x = 0; x < gameWidth; x++) {
			game[y].push(0);
		}
	}
	
	// Takes in an object with x and y properties
	function coordIsInGame(coord) {
		return coord.y >= 0 && coord.y < game.length &&
		       coord.x >= 0 && coord.x < game[coord.y].length;
	};
	
	// Fill the game with mines!
	for (var mine = 0; mine < numMines; mine++) {
		var x = Math.floor(Math.random()*gameWidth),
		    y = Math.floor(Math.random()*gameHeight);
		
		// Retry if there was already a mine there
		if (game[y][x] === -1) {
			mine--;
			continue;
		}
		
		game[y][x] = -1;
		
		// Add 1 to neighbouring tiles
		for (var j = 0; j < neighbourLocations.length; j++) {
			let newCoord = {x: x + neighbourLocations[j].x, y: y + neighbourLocations[j].y};
			if (coordIsInGame(newCoord) && game[newCoord.y][newCoord.x] !== -1) {
				game[newCoord.y][newCoord.x]++;
			}
		}
		
		/* Old code (easier to understand):
		if (x > 0                && y > 0             && game[y-1][x-1] !== -1) { game[y-1][x-1]++; }
		if (                        y > 0             && game[y-1][x  ] !== -1) { game[y-1][x  ]++; }
		if (x < game[y].length-1 && y > 0             && game[y-1][x+1] !== -1) { game[y-1][x+1]++; }
		if (x < game[y].length-1                      && game[y  ][x+1] !== -1) { game[y  ][x+1]++; }
		if (x < game[y].length-1 && y < game.length-1 && game[y+1][x+1] !== -1) { game[y+1][x+1]++; }
		if (                        y < game.length-1 && game[y+1][x  ] !== -1) { game[y+1][x  ]++; }
		if (x > 0                && y < game.length-1 && game[y+1][x-1] !== -1) { game[y+1][x-1]++; }
		if (x > 0                                     && game[y  ][x-1] !== -1) { game[y  ][x-1]++; }
		//*/
	}
	
	/** ──────── UNCOVERING ──────── **/
	
	// Initialise vars
	let zeroLocations = []; // Array of {x,y} objects, will contain locations of all zeroes in the game
	let uncoveredLocations = []; // 2D array, each value is either nothing (not uncovered) or true (uncovered)
	for (var y = 0; y < game.length; y++) {
		uncoveredLocations.push([]);
	}
	
	if (startsNotUncovered) {
		// Find all the zeroes in this game
		for (var y = 0; y < game.length; y++) {
			for (var x = 0; x < game[y].length; x++) {
				if (game[y][x] === 0) {
					zeroLocations.push({x: x, y: y});
				}
			}
		}

		// Uncover a random region
		if (zeroLocations.length > 0) {
			
			// Select random starting point
			let locationsToUncover = [];
			let firstCoord = zeroLocations[Math.floor(Math.random()*zeroLocations.length)];
			uncoveredLocations[firstCoord.y][firstCoord.x] = true;
			locationsToUncover.push(firstCoord);

			// Uncover neighbouring tiles
			while (locationsToUncover.length > 0) {
				for (var j = 0; j < neighbourLocations.length; j++) {
					
					let newCoord = {x: locationsToUncover[0].x + neighbourLocations[j].x, y: locationsToUncover[0].y + neighbourLocations[j].y};
					if (!coordIsInGame(newCoord) || uncoveredLocations[newCoord.y][newCoord.x] === true) continue;
					uncoveredLocations[newCoord.y][newCoord.x] = true;
					
					// Continue uncovering
					if (game[newCoord.y][newCoord.x] === 0) {
						locationsToUncover.push(newCoord);
					}
				}
				locationsToUncover.shift();
			}
		}
	}
	
	/** ──────── CREATE REPLY ──────── **/
	
	let returnTxt;
	if (numMines === 1) returnTxt = `Here's a board sized ${gameWidth}x${gameHeight} with 1 mine:`;
	else                returnTxt = `Here's a board sized ${gameWidth}x${gameHeight} with ${numMines} mines:`;
	
	if (isRaw) { returnTxt += "\n```"; }
	
	for (var y = 0; y < game.length; y++) {
		returnTxt += "\n"
		for (var x = 0; x < game[y].length; x++) {
			if (game[y][x] === -1) {
				returnTxt += "||:bomb:||";
			}
			else if (startsNotUncovered && uncoveredLocations[y][x]) {
				returnTxt += numberEmoji[game[y][x]];
			}
			else {
				returnTxt += `||${numberEmoji[game[y][x]]}||`;
			}
		}
	}
	
	if (isRaw) { returnTxt += "\n```"; }
	
	// Send the message if it's not longer than 2000 chars (Discord's limit)
	if (returnTxt.length <= 2000) {
		return returnTxt;
	}
	
	// Otherwise, split the message
	let splitReturns = [];
	do {
		let splitIndex = returnTxt.substring(0, 1900).lastIndexOf("\n");
		if (splitIndex === -1) {
			log("A too large message was generated after creating a game.");
			return "Sorry, your message appears to be too large to send (because of Discord's character limit). Please try a smaller game.";
		}
		splitReturns.push(returnTxt.substring(0, splitIndex));
		returnTxt = returnTxt.substring(splitIndex+1);
		
		// Also split the triple backticks
		if (isRaw) {
			splitReturns[splitReturns.length-1] += "\n```";
			returnTxt = "```\n" + returnTxt;
		}
	} while (returnTxt.length > 1900)
	
	splitReturns.push(returnTxt);
	
	// Send the messages one by one
	let i = 0;
	function sendNextMessage() {
		if (i < splitReturns.length) message.channel.send(splitReturns[i++]).then(sendNextMessage, log);
	};
	sendNextMessage();
};

const numberEmoji = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"];



client.login(bot_token)