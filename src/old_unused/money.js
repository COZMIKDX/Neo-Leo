const fs = require("fs"); 
const moneyLogPath = "./money.json";

let invalidInputInARow = 0;

function writeMoney(moneyLogOb)
{
  fs.writeFile(moneyLogPath, JSON.stringify(moneyLogOb), (err) => {
    if (err)
    {
      console.error(err);
      return;
    };
  });
}

function loadMoneyLog()
{
  let data = fs.readFileSync(moneyLogPath);
  let moneyLogOb = JSON.parse(data);
  return moneyLogOb;
}

function debtCalculate(newDebt, creditor)
{
  let moneyLogOb = loadMoneyLog();
  
  if (creditor == '163674475127242752')
  {
    moneyLogOb.christianDebt = moneyLogOb.christianDebt + parseFloat(newDebt);
  }
  else if (creditor == '157899020054822912')
  {
    moneyLogOb.alexisDebt = moneyLogOb.alexisDebt + parseFloat(newDebt);
  }
  
  moneyLogOb = debtSimplify(moneyLogOb);
  writeMoney(moneyLogOb);
  
  return moneyLogOb;
}

function debtSimplify(moneyLogOb)
{
  let alexisDebt = moneyLogOb.alexisDebt;
  let christianDebt = moneyLogOb.christianDebt;
  
  if (alexisDebt < christianDebt)
  {
    christianDebt -= alexisDebt;
    alexisDebt = 0;
  }
  else if (christianDebt < alexisDebt)
  {
    alexisDebt -= christianDebt;
    christianDebt = 0;
  }
  else if (alexisDebt == christianDebt)
  {
    alexisDebt = christianDebt = 0;
  }
  
  moneyLogOb.alexisDebt = parseFloat(alexisDebt.toFixed(2));
  moneyLogOb.christianDebt = parseFloat(christianDebt.toFixed(2));
  return moneyLogOb;
}

function debtQuery(channel, moneyLogOb)
{
  if (typeof(moneyLogOb) == "undefined")
  { moneyLogOb = loadMoneyLog(); }
  
  channel.send("Christian -> Alexis: $" + moneyLogOb.christianDebt +
               "\nAlexis -> Christian: $" + moneyLogOb.alexisDebt);
}

function inputValidityCheck(inputValue)
{
  console.log(parseFloat(inputValue));
  if (isNaN(parseFloat(inputValue))) { console.log("not a number"); return false; }
  if (parseFloat(inputValue) < 0) { console.log("negative number"); return false;}
  if (parseFloat(inputValue) > 1000) { console.log("excessively large number"); return false; }
  return true;
}

//----------------------------//

// newDebt is float and creditor should be the user object of who inserted this debt, send in message.author.id
exports.addDebt = function(newDebt, creditor, channel)
{
  if (inputValidityCheck(newDebt) == true)
  {
    let moneyLogOb = debtCalculate(newDebt, creditor);
    debtQuery(channel, moneyLogOb);
  }
  else
  {
    channel.send("Invalid input");
    invalidInputInARow++;
    
    if (invalidInputInARow >= 3)
    {
      channel.send("Could you fucking stop?");
      invalidInputInARow = 0;
    }
  }
}

exports.debtQuery = debtQuery;