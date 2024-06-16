// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};






// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
//part -1
function initialPrompt() {
   console.log("Let's play some scrabble");
};


let newPointStructure = transform(oldPointStructure);

let simpleScorer = function (word) {
   return word.length;
};

let vowelBonusScorer = function (bonusword) {
   let vowelArray = ['A', 'E', 'I', 'O', 'U']
   let bonusPoints = 0;
   for (let i = 0; i < bonusword.length; i++) {
      if (vowelArray.includes(bonusword[i].toUpperCase())) {
         bonusPoints = bonusPoints + 3;
      } else {
         bonusPoints = bonusPoints + 1;
      }
   }
   return bonusPoints;
};

let scrabbleScorer = function (word) {
   word = word.toUpperCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      for (const newPointStructureKey in newPointStructure) {
         if (newPointStructureKey.includes(word[i].toLowerCase())) {
            letterPoints = letterPoints + newPointStructure[newPointStructureKey];
         }
      }
   }
   return letterPoints;
};

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }];

function scorerPrompt() {
   let scoringWord = input.question('Enter a word to score: ');
   console.log('Which scoring algorithm would you like to use?');
   console.log('0 - Simple: One point per character');
   console.log('1 - Vowel Bonus: Vowels are worth 3 points');
   console.log('2 - Scrabble: Uses scrabble point system');

   let score = input.question('Enter 0, 1, or 2: ');

   console.log(`Score for ${scoringWord} :`, scoringAlgorithms[score].scorerFunction(scoringWord));

}

function transform(oldSTructure) {
   let newStructure = {};
   for (let oldKey in oldSTructure) {
      let oldValues = oldSTructure[oldKey];
      for (let i = 0; i < oldValues.length; i++) {
         newStructure[oldValues[i].toLowerCase()] = parseInt(oldKey);
      }
   }
   return newStructure;
};

function runProgram() {
   initialPrompt();
   scorerPrompt();
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};