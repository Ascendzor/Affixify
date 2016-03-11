var fs = require('fs');
var item = require('./item');

var toParse = fs.readFileSync('lines.txt', 'utf8', (err, data) => {
    if (err) throw err;
    return data;
});
console.log(toParse)
console.log('Affixifying item:\n' + toParse + '...\n');

var something = item.parse(toParse);

console.log('Result: ' + JSON.stringify(something, null, 2));
