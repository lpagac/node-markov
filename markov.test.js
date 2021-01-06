const { MarkovMachine } = require('./markov.js');

let mm;
beforeEach(function() {
  mm = new MarkovMachine("the cat in the hat");
});

describe("MarkovMachine text generator", function () {

  test("markov machine instance can produce markov text", function () {
    let markovText = mm.getText();

    expect(typeof markovText).toEqual('string');
    expect(markovText.length).toBeGreaterThanOrEqual(3);
  });

});

test("makeChains method", function () {
  expect(typeof mm.wordsChain).toEqual('object');

  const wordsChain = new Map([
    ['the', ["cat", "hat"]],
    ["cat", ["in"]],
    ["in", ["the"]],
    ["hat", [null]]
  ]);

  expect(mm.wordsChain).toEqual(wordsChain);
});