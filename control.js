// Table of damage types for D&D 5th edition.
// Excludes the 3 physical types of piercing, slashing, and bludgeoning

const damType = new Array();
damType[0] = "1d10"
damType[1] = "Acid"
damType[2] = "Cold"
damType[3] = "Fire"
damType[4] = "Force"
damType[5] = "Lightning"
damType[6] = "Necrotic"
damType[7] = "Poison"
damType[8] = "Psychic"
damType[9] = "Radiant"
damType[10] = "Thunder"

// Functions for creating dice rolls

// Simulate random dice rolls
/**
 * Dice random number generator
 * @param {integer} rolls - The number of times to roll the dice, default 1
 * @param {integer} sides - The number of sides on the dice being rolled, default 6
 * @returns Array containing the individual rolls which can later be added if needed.
 */
function rollDice (rolls=1, sides=6) {
  result = []
  for (let i=0; i < rolls; i++) {
    result[i] = (Math.floor(Math.random() * sides)) + 1
  }
  return result
}

// Add dice results together with modifier
/**
 * Adds all integer value in the object
 * @param {object} dicelist - Object containing integer values
 * @param {integer} modifier - Optional modifier to add to the dice rolls - default is 0
 * @returns - Returns an integer sum of the array with the modifier included.
 */
function addDice (dicelist, modifier=0) {
  const sum = dicelist.reduce((partialSum, a) => partialSum + a, 0) + modifier;
  return sum
}

// Randomly roll dice using dice notation format.
/**
 * Randomly roll dice using dice notation format AdX+M
 * @param {string} diceRolls - Valid dice notation format
 * @returns Integer which is the sum of all the dice rolls plus the modifier
 */
function diceNotationRoll (diceRolls) {
  const notation = diceRolls.toLowerCase()
  var match = /^(\d+)?d(\d+)([+-]\d+)?$/.exec(notation);
  if (!match) {
    throw "Invalid dice notation: " + notation;
}
  var howMany = (typeof match[1] == 'undefined') ? 1 : parseInt(match[1]);
  var dieSize = parseInt(match[2]);
  var modifier = (typeof match[3] == 'undefined') ? 0 : parseInt(match[3]);
  const rolls = rollDice(howMany, dieSize);
  return addDice(rolls, modifier)
}

// Pick item from a table
/**
 * Allows for manual number to be entered to pick table item or randomly picks one.
 * @param {array} table - The table to be used to select items from
 * @param {interger} tablePick - Iteger roll from the dice to select item. Leave empty to randomly pick
 * @returns {string} Returns the value from the table item
 */
function getTableItem(table=damType, tablePick) {
  const tableDice = table[0]
  let increm = 0
  let tableRoll = 0
  if (tablePick != undefined) {
    increm = tablePick
   } else {
    tableRoll = diceNotationRoll(tableDice)
    if (tableRoll < 1) {
      tableRoll = 1
    }
    increm = tableRoll
  }
  while (table[increm]==undefined) {
    increm++
  }
  return(table[increm])
}


const curdamelem = document.getElementById("curdam");
const damhistelem = document.getElementById("damhist");
const prollelem = document.getElementById("playerroll");
const prollbutt = document.getElementById("prollenter");
const rollrandbutt = document.getElementById("rollrandom");
const clearhistbutt = document.getElementById("clearhist");

clearhistbutt.addEventListener("click", function() {
    clearDiv(damhistelem);
});

rollrandbutt.addEventListener("click", function() {
    const randam = getTableItem();
    setCurrDam(randam);
});

prollelem.addEventListener("click", function() {
    clearDiv(prollelem);
    return null
});

prollbutt.addEventListener("click", function() {
    const verifySet = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    let enteredPlayRoll = prollelem.innerText;
    if (!verifySet.includes(enteredPlayRoll)) {
      enteredPlayRoll = undefined;
    };
    const tabResult = getTableItem(damType, enteredPlayRoll);
    setCurrDam(tabResult);
    return null
});

function clearDiv(target) {
    target.innerHTML = "";
    return null
}

function getCurrDam() {
    const currDam = curdamelem.innerText
    return currDam
}

function setDamHist(damage) {
    const histlist = damhistelem.innerHTML
    damhistelem.innerHTML = damage + "<br />" + histlist;
    return null
}

function setCurrDam(damage) {
    moveDam();
    curdamelem.innerHTML = "<p>" + damage + "<p>";
    return null
}

function moveDam() {
    const readCurr = getCurrDam();
    setDamHist(readCurr);
    return null
}