text = "Hello, World!\n";
const fs = require('node:fs');
fs.appendFile("task02.txt", text, (err) => {
    if (err) throw err;
    console.log('Text appended to file');
});