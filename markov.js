"use strict";
/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words;
    this.wordsChain = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  
  makeChains() {
    const words = this.words;
    let wordsChain = new Map();

    for (let i = 0;i < words.length;i++) {
      let nextWord = words[i + 1] || null;
      if (wordsChain.has(words[i])) {
        wordsChain.get(words[i]).push(nextWord);
      } else {
        wordsChain.set(words[i], [nextWord]);
      }
    }

    return wordsChain;
  }

  /** Get random word to initialize story */

  getFirstWord() {
    let keys = Array.from(this.wordsChain.keys());
    let randomIndex = Math.floor(Math.random() * keys.length);

    return keys[randomIndex];
  }

  /** return a random value from an array within a map */

  getRandomWord(word) {
    let wordOptions = this.wordsChain.get(word);
    let randomIndex = Math.floor(Math.random() * wordOptions.length);

    return wordOptions[randomIndex]
  }

  /** return random text from chains */

  getText(numWords = 100) {
    let story = [];
    story.push(this.getFirstWord());
    numWords--;

    let word;
    while(numWords) {
      word = story[story.length - 1];
      let nextWord = this.getRandomWord(word);
      if (nextWord) {
        // TODO: what is the runtime for `concat`?
        // change to push
        
        story = story.concat(nextWord);
      } else {
        return story.join(' ');
      }
      numWords--;
    }
    return story.join(' ');
  }
}

// let mm = new MarkovMachine("the cat in the hat");
// console.log(mm.wordsChain.get('the'));
// console.log(mm.getText());

module.exports = {
  MarkovMachine: MarkovMachine
};