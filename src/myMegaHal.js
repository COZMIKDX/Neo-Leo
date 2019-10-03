const jsmegahal = require('jsmegahal');
const fs = require("fs");
var util = require('util');

var aiActive = true;
var markov = 1;
var megahal = new jsmegahal(1); //1 is the minimum number of words in a post for it to be saved
var megaLeo = new jsmegahal(markov);
var megaAlexis = new jsmegahal(markov);
var megaChristian = new jsmegahal(markov);
var megaMarsh = new jsmegahal(markov);
var megaCaiden = new jsmegahal(markov);
var megaJeremy = new jsmegahal(markov);

function getUserIDFromName(user)
{
	let userid = "";
  switch (user)
  {
    case "leo" : userid = "129338722612150272";
    break;

     case "alexis" : userid = "163674475127242752"
    break;

    case "christian" : userid = "157899020054822912"
    break;

    case "marsh" : userid = "163719681503526912"
    break;

    case "caiden" : userid = "166723074211708929"
    break;
      
    case "jeremy" : userid = "310914799154233345"
    break;
  }
  
  return userid;
}

function getMegaHal(userHal) //userHal should be the id of the user you want.
{
  switch (userHal)
		{
			//leo
			case "129338722612150272":
				return megaLeo;
			break;
			
			//Alexis
			case "163674475127242752":
				return megaAlexis;
			break;
			
			//Christian
			case "157899020054822912":
				return megaChristian;
			break;
			
			//Marsg
			case "163719681503526912":
				return megaMarsh;
			break;
			
			//Caiden
			case "166723074211708929":
				return megaCaiden;
			break;
        
      case "310914799154233345":
        return megaJeremy;
      break;
		}
  return "";
}


exports.saveMegaHal = function()
{
  let megahalArray = [megaLeo, megaAlexis, megaChristian, megaMarsh, megaCaiden]; //currently 5 elements.
  let megahalArrayElemNum = 5;
  for (let i = 0; i < megahalArrayElemNum; i++)
  {
    let filename = 'megahalSaves/megahal' + i + '.json';
    fs.writeFile(filename, util.inspect(megahalArray[i]), (err) => {
      if (err)
      {
        console.error(err);
        return;
      };
      console.log('file written!');
    });
  }
}

exports.megaHalAI = function(message)
{
	if (aiActive)
	{
		let currentMegaHal = getMegaHal(message.author.id);
	
    if (currentMegaHal == "")
      currentMegaHal = megahal;
    
		if (!message.author.bot && !message.content.includes(">") && !message.content.startsWith(".") && !message.content.includes("http")) //&& !isDisabled
		{
			if (message.content.includes('.'))
      {
				currentMegaHal.addMass(message.content);
        megahal.addMass(message.content);
      }
			else
      {
				currentMegaHal.add(message.content);
        megahal.add(message.content);
      }
		}
	}
}

exports.powerToggle = function()
{
	if (aiActive)
	{
		aiActive = false;
		//message.channel.send("```\nMegaHal AI is now disabled\n```");
	}
	else if (!aiActive)
	{
		aiActive = true;
		//message.channel.send("```\nMegaHal AI is now enabled\n```");
	}
}

exports.speak = function(user)
{
	let currentMegaHal = megahal;
	
	if (user != null)
	{
		console.log("getting userid");
		let userid = getUserIDFromName(user);
		if (userid != "")
			currentMegaHal = getMegaHal(userid)
	}
	
	return currentMegaHal.getReply();
}









//
