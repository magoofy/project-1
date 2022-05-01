// Variables
var searchBtn = document.querySelector("#search-btn");
var searchedLocation = document.querySelector("#searched-location")

// Runs when submit button is clicked
var formSubmitHandler = function(event) {
    event.preventDefault();

    var location = searchedLocation.value.trim();

    if (location) {
        searchedLocation.value = "";
        getLocation(location)
    } else {
        // TODO: Handle empty search bar
    }
}

// Turns City into Lat Lon
var getLocation = function (location) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&appid=e1fdfa2386872dd651201114b0cdeacd";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var lat = data[0].lat
                var lon = data[0].lon
                getParkInfo(lat, lon, location);
            })
        } else {
            alert("An Error Occured");
        }
    })
        .catch(function (error) {
            alert("Unable to Connect to Open Weather Map");
        })
}

// Links the website to the park API
var getParkInfo = function(lat, lon, location) {
    console.log(location);
    var apiUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + location + "&api_key=mAgL5ygwIf8s4dQRtaUvaEjd3ZhfFsCBQATeElnc"    
    fetch(apiUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);
            })
        } else {
            alert("An Error Occured");
        }
    })
    .catch(function(error){
        alert("Unable to connect to Natioal Park Services")
    })
}




// Event listener for the submit button
searchBtn.addEventListener("click", formSubmitHandler);