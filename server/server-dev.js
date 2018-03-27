const livereload = require('livereload');
const path = require('path');

require("./server");

console.log("Creating livereload server.");
var lreload = livereload.createServer();
lreload.watch(path.join(__dirname, "public"));