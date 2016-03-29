
var SesameFrontend = require('./lib/sesame-frontend')

var triplestore = new SesameFrontend('http://52.19.236.4:8085/openrdf-sesame')

triplestore.getProtocolVersion((err, version) => {
    console.log(version)
})

triplestore.getRepositories((err, repos) => {

    console.log(repos)

    repos.forEach((repo) => {

        repo.getNamespaces((err, namespaces) => {

            console.log('repo ' + repo.title + ' namespaces')
            console.log(namespaces)
        })
    })
})


