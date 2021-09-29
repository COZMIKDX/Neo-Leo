const fs = require("fs"); 

const quotesPath = "/app/src/quotes.json"

function loadQuote()
{
  let data = fs.readFileSync(quotesPath); 
  let quotesOb = JSON.parse(data);
  return quotesOb;
}

exports.addQuote = function(args, argsLength)
{
	let newQuote = args[0] + " ";
  for (let i = 1; i < args.length; i++)
	{
		newQuote = newQuote + args[i];
		if (i != args.length - 1) newQuote = newQuote + " ";  
	}
	
	
	let quotesOb = loadQuote();
  //first add the new quote to the object's array. Then stringify the object and write to the file (it'll overwrite).
  quotesOb.quotes.push(newQuote);
  console.log("ADD2: " + quotesOb.quotes);

  fs.writeFile(quotesPath, JSON.stringify(quotesOb), (err) => {
    if (err)
    {
      console.error(err);
      return;
    };
  });
}


exports.requestQuote = function(random, quoteNumber)
{
  let quotesOb = loadQuote();
  
  /*if (random == true)
  {
     //return a random quote.
  }*/
  
  //Make sure the requested number is in the array of quotes.
  if (quoteNumber > (quotesOb.quotes.length - 1))
    return "There's no quote here...";

  return quotesOb.quotes[quoteNumber];
};