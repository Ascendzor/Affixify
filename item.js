var _ = require('lodash');
datums = require('./item-datums-module')

module.exports = {
    parse: function(input) {
        var result = {};

        // Find base type
        var baseType = findBaseType(input);
        result.baseTypeName = baseType.name;

        // Get item affixes
        var affixes = getItemAffixes(input);

        // Find implicit (if there is one)
        result.implicit = findImplicit(baseType, affixes, input);

        if (result.implicit !== '') {
            affixes = affixes.slice(1, affixes.length);
        }

        // Find prefixes
        result.prefixes = findItemAffixes(baseType.prefixes, affixes);

        // Find suffixes
        result.suffixes = findItemAffixes(baseType.suffixes, affixes);

        return result;
    }
};

// This function will return all matching prefixes or suffixes for the items
// type.
// baseTypeAffixes=all suffixes or all prefixes for base type
// affixes=the affixes of the item to be parsed
var findItemAffixes = function(baseTypeAffixes, affixes) {

    var result = [];

    _.forEach(affixes, function(affix) {
        var matchedAffix = _.find(baseTypeAffixes, function(baseTypeAffix) {
            return getMinifiedAffixString(baseTypeAffix.text) === getMinifiedAffixString(affix);
        });

        if (matchedAffix !== undefined) {
            result.push(matchedAffix);
        }
    });

    return _.map(result, function(affix){
        return affix.text;
    });

}

var findImplicit = function(baseType, affixes, input) {
    var split = input.split('\n');

    var name = split[0];

    var base = _.find(baseType.bases, function(base) {
        return name.toLowerCase().indexOf(base.name.toLowerCase()) > -1;
    });

    if (base.implicit === '1') {
        return affixes[0];
    }

    return '';
}

var getItemAffixes = function(input) {
    var split = input.split('\r\n');

    var affixes = split.slice(2, split.length);

    return affixes;
}

var findBaseType = function(input) {
    var split = input.split('\n');

    var name = split[0];
    debugger
    return _.find(datums.baseTypes, function(baseType) {
        return _.find(baseType.bases, function(base) {
            return name.toLowerCase().indexOf(base.name.toLowerCase()) > -1;
        });
    });
}

// This method returns only the text part of an affix that can be used to
// match it to another affix.
// For example:
// "6% increased Cast Speed" would turn into "increased Cast Speed"
// This allows you to match two affixes together because this part of the string
// is always the same.
var getMinifiedAffixString = function(affixString) {

    for (var i = affixString.length - 1; i > -1; i--) {
        if (!affixString[i].match(/[a-z ]/i)) {
            return affixString.slice(i+1, affixString.length);
        }
    }

}
