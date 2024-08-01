const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const { JSDOM } = require("jsdom");
const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
const { document } = new JSDOM(index).window;

global.document = document;
global.window = dom.window;

module.exports = { document, window };
