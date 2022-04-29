var apiKey = "30mlRNDP6cNK1MQKzOrceLTL9kMGbMufdRofA5cZ"
var stateCode = document.querySelector("#searchBar").value
var stateCode = "CA"
fetch(`https://developer.nps.gov/api/v1/campgrounds?stateCode=${stateCode}&limit=3&start=0&api_key=${apiKey}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
    })