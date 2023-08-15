// Table of damage types for D&D 5th edition.
// Excludes the 3 physical types of piercing, slashing, and bludgeoning

const damType = new Array();
damType[0] = "1d10"
damType[1] = "acid"
damType[2] = "cold"
damType[3] = "fire"
damType[4] = "force"
damType[5] = "lightning"
damType[6] = "necrotic"
damType[7] = "poison"
damType[8] = "psychic"
damType[9] = "radiant"
damType[10] = "thunder"

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
    console.log(tablePick);
    increm = tablePick
   } else {
    tableRoll = diceNotationRoll(tableDice)
    if (tableRoll < 1) {
      tableRoll = 1
    }
    increm = tableRoll
  }
  console.log(tableRoll);
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
const defheadcdam = "<h4>Current damage</h4>";
const defheaddhist = "<h4>Damage history</h4>";

clearhistbutt.addEventListener("click", function() {
    clearDiv(damhistelem, defheaddhist);
});

function clearDiv(target, defhead) {
    target.innerHTML = defhead;
    return null
}

function setDamage(target, defhead, dt) {
    target.innerHTML = defhead + "<br />" + dt;
    return null
}

function moveDamage () {
    return null
}

function getRoll() {
    return null
}

