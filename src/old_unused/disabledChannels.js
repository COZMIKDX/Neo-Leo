const fs = require("fs");
const disabledChannelsPath = "./disabledChannels.json";

var disabledChannelsLoaded = false;

//Checks if a channel is disabled (normie mode)
exports.channelDisabledCheck = function(disabledChannels, length, message)
{
  /*if (message.channel.id == 390737035792482314 && message.author.id == 157899020054822912)
  {
    message.channel.send("array length: " + length);
  }*/

  if (disabledChannelsLoaded == false)
  	loadDisabledChannels();

  for (var i = 0; i < length; i++)
  {
    if( message.guild != null)
    {
      if ((message.guild.id == disabledChannels[i]))
        return true;
    }
  }
}

//adds a channel to the disabled list
exports.writeToDisabledChannels = function(disabledChannels)
{
  fs.writeFile(disabledChannelsPath, JSON.stringify(disabledChannels), (err) => {
    if (err)
    {
        console.error(err);
        return;
    };
    console.log('file written!');
  }
  );
}


function loadDisabledChannels(disabledChannels)
{
	 //PROBLEM: This loads a null element into the array when the json is empty. Causing the array length to be 2 when only one channel has been added.
     //Temp Solution: Comment this if the JSON is empty. Uncomment if the JSON is filled.
	if (disabledChannelsLoaded == false)
    {
      //message.channel.send("loading");
      disabledChannelsLoaded = true;
      fs.readFile(disabledChannelsPath, 'utf-8', function(err, data)
      {
  	    if (err){ console.error(err); return;};

        var parsed = JSON.parse(data);

        for (var x in parsed)
        {
  	      disabledChannels.push(parsed[x]);
        }
      });
    }
}
