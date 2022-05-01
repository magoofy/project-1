// Variables
var searchBtn = document.querySelector("#search-btn");
var searchedLocation = document.querySelector("#searched-location")

// Runs when submit button is clicked
var formSubmitHandler = function(event) {
    event.preventDefault();

    var location = searchedLocation.value.trim();

    if (location) {
        searchedLocation.value = "";
        getParkInfo(location);
    } else {
        // TODO: Handle empty search bar
    }
}

// Runs when enter button is clicked
var formSubmitHandlerEnter = function() {
    var location = searchedLocation.value.trim();

    if (location) {
        searchedLocation.value = "";
        getParkInfo(location);
    } else {
        // TODO: Handle empty search bar
    }
}

// Links the website to the park API
var getParkInfo = function(location) {
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
// Event listener for 'enter' key
searchedLocation.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        formSubmitHandlerEnter();
       
    }
  });