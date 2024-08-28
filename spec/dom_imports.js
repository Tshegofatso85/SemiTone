const fs = require("fs");
const { JSDOM } = require("jsdom");

const index = fs.readFileSync("index.html", "utf-8");
const dom = new JSDOM(index);
const { document } = dom.window;
const window = dom.window;

global.document = document;
global.window = window;
