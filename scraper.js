var request = require('superagent');
var cheerio = require('cheerio');
var _ = require('lodash');

for (var i = 0; i < 44; i++) {
    request.get('http://poedb.tw/us/item.php?c=' + i)
        .end((err, res) => {
            console.log(test(res.text));
        });
}

var test = (html) => {
    var $ = cheerio.load(html);

    var bodies = $('tbody');
    var trs = _.flatten(bodies.children());

    // god only knows how this code works
    var items = _.map(trs, (tr) => {
        var implicit = '';
        var lastTd = tr.children[tr.children.length - 1];

        if (lastTd.children[0].children) {
            _.forEach(lastTd.children, (child) => {
                if (child.data) implicit = child.data;
            });
        } else {
            implicit = lastTd.children[0].data;
        }

        return {
            name: tr.children[0].children[0].children[0].data,
            implicit: implicit
        };
    });

    return {
        baseTypeName: $('h4').text(),
        items: items
    }
};
