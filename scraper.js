request = require('superagent')

request.get('http://poedb.tw/us/item.php?c=14')
  .end((err, res) => {
    console.log(res)
  })
