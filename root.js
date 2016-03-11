React = require('react')
ReactDOM = require('react-dom')
inputter = require('./inputter')

lines = 'Miracle Pendant Jade Amulet\r\n' +
'Level: 5 ilvl: 6\r\n' +
'+24 to Dexterity\r\n' +
'+10 to Intelligence\r\n' +
'6% increased Cast Speed\r\n' +
'+7 to maximum Life\r\n' +
'+10% to Cold Resistance\r\n';

item = require('./item')
item.parse(lines)

ReactDOM.render(
  React.createElement(inputter, null),
  document.getElementById('root')
)
