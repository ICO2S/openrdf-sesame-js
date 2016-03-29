
var request = require('request')
var sparqlResultsToArray = require('./sparql-results-to-array')

function Repository(meta) {

    this._uri = meta.uri || ''
    this._id = meta.id || ''
    this._title = meta.title || ''
    this._readable = meta.readable
    this._writable = meta.writable

}

module.exports = Repository

Repository.prototype = {

    toString: toString,

    get uri() {
        return this._uri
    },

    get id() {
        return this._id
    },

    get title() {
        return this._title
    },

    get readable() {
        return this._readable
    },

    get writable() {
        return this._writable
    },

    getNamespaces: getNamespaces,

    postTurtle: postTurtle

}

function toString() {

    return this._uri

}

function getNamespaces(callback) {

    request.get({
        url: this.uri + '/namespaces',
        json: true,
        headers: {
            'accept': 'application/sparql-results+json'
        }
    },  (err, res, body) => {

        var namespaces = sparqlResultsToArray(body)

        callback(null, namespaces)
    })

}

function postTurtle(turtle, callback) {

}




