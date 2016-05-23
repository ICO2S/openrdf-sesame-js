
var request = require('request')
var sparqlResultsToArray = require('./sparql-results-to-array')

function Repository(meta) {

    this._uri = meta.uri || ''
    this._id = meta.id || ''
    this._title = meta.title || ''
    this._readable = meta.readable !== undefined ? meta.readable : true
    this._writable = meta.writable !== undefined ? meta.writable : false

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

    post: post,

    sparql: sparql

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

function post(data, type, callback) {

    request.post({
        url: this.uri + '/statements',
        body: data,
        headers: {
            'content-type': type
        }
    },  (err, res, body) => {

        if(err) {

            callback(err)

        } else {

            console.log(res.statusCode)
            console.log(body)

            callback(null)

        }
    })
}

function sparql(query, type, callback) {

    var parseResults = false

    if(arguments.length < 3) {
        callback = arguments[1];
        type = 'application/sparql-results+json';
        parseResults = true
    }

    request.post({

        url: this.uri,

        form: {
            query: query,
        },

        headers: {
            'accept': type
        }
        
    },  (err, res, body) => {

        if(err) {

            callback(err);

        } else if(res.statusCode >= 300) {

            callback(new Error('HTTP ' + res.statusCode + ' ' + body));

        } else {

            if(parseResults) {

                callback(null, type, sparqlResultsToArray(JSON.parse(body)))

            } else {

                callback(null, type, body);

            }

        }

    })
}







