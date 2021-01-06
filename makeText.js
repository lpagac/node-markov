"use strict";

const fsP = require("fs/promises");
const axios = require("axios");
const {MarkovMachine} = require('./markov.js');

/* Read files from the inputted path and console log the content */
async function getTextFromFile(path) {
  try {
    // Code Review Note: Only have try do ONE THING
    var fileContent = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.log(`No such file at ${path}`);
    process.exit(1);
  }
  
  return fileContent;
}

/* Read content from a URL and print to console */

async function getTextFromURL(url) {
  try {
    var resp = await axios({url});
  } catch (err) {
    console.log(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }

  return resp.data;
}

/* Checks whether path is URL or File and calls appropriate function */

async function readContent(fileType, path) { 
  if (fileType === 'url') {
    return await getTextFromURL(path);
  } else if (fileType === 'file') {
    return await getTextFromFile(path);
  }

}

/** Initializes the text generation
 * Gets the file type (url, file) and path and creates MarkovMachine instance 
 * and generates text
*/

async function start() {
  let fileType = process.argv[process.argv.length - 2].toLowerCase();
  let path = process.argv[process.argv.length - 1];
  let text = await readContent(fileType, path);

  // console.log('FileType', fileType);
  // console.log('path', path);
  // console.log('Text', text);

  let mm = new MarkovMachine(text);
  console.log(mm.getText());
}

start();



