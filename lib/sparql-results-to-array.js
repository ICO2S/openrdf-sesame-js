
var extend = require('xtend')

function sparqlResultsToArray(results) {

    var resultTemplate = {}
    
    results.head.vars.forEach((varName) => resultTemplate[varName] = null)

    return results.results.bindings.map((binding) => {

        var result = extend({}, resultTemplate)

        Object.keys(result).forEach((varName) => {

            if(binding[varName])
                result[varName] = flattenBinding(binding[varName])

        })

        return result
    })

    function flattenBinding(binding) {

        if(binding.type === 'uri')
            return binding.value

        if(binding.type !== 'literal')
            return binding

        switch(binding.datatype) {

            case 'http://www.w3.org/2001/XMLSchema#boolean':
                return binding.value === 'true' ? true : false

            default:
                return binding.value
        }

    }

}

module.exports = sparqlResultsToArray


