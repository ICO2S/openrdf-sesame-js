
var request = require('request')
var sparqlResultsToArray = require('./sparql-results-to-array')

var Repository = require('./repository')

function SesameFrontend(sesameUrl) {

    this._sesameUrl = sesameUrl

}

module.exports = SesameFrontend

SesameFrontend.prototype = {

    getProtocolVersion: getProtocolVersion,
    getRepositories: getRepositories


}

function getProtocolVersion(callback) {

    request.get(this._sesameUrl + '/protocol', (err, res, body) => {

        callback(null, body)

    })

}

function getRepositories(callback) {

    request.get({
        url: this._sesameUrl + '/repositories',
        json: true,
        headers: {
            'accept': 'application/sparql-results+json'
        }
    },  (err, res, body) => {

        var repos = sparqlResultsToArray(body).map(
            (repo) => new Repository(repo))

        callback(null, repos)
    })
}



