// Variables
var searchBtn = document.querySelector("#search-btn");
var searchedLocation = document.querySelector("#searched-location")
var parkContainer = document.querySelector("#park-container");

// Runs when submit button is clicked
var formSubmitHandler = function (event) {
    event.preventDefault();

    var location = searchedLocation.value.trim();

    if (location) {
        searchedLocation.value = "";
        getParkInfo(location);
    }
}

// Runs when enter button is clicked
var formSubmitHandlerEnter = function () {
    var location = searchedLocation.value.trim();

    if (location) {
        searchedLocation.value = "";
        getParkInfo(location);
    }
}

// Links the website to the park API
var getParkInfo = function (location) {
    console.log(location);
    var apiUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + location + "&api_key=mAgL5ygwIf8s4dQRtaUvaEjd3ZhfFsCBQATeElnc"
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayParks(data);
            })
        } else {
            alert("An Error Occured");
        }
    })
        .catch(function (error) {
            alert("Unable to connect to Natioal Park Services")
        })
}

// Function Displays park Info
var displayParks = function (location) {
    console.log(location);

    parkContainer.textContent = "";

    for (i = 0; i < 5; i++) {
        var parkCard = document.createElement("a")
        parkCard.classList = "list-group-item list-group-item-action flex-column align-items-start"
        var subParkCard = document.createElement("div")
        subParkCard.classList = "d-flex w-100 justify-content-between"

        var parkName = document.createElement("h5")
        parkName.className = "mb-1"
        parkName.textContent = location.data[i].fullName
        var parkContact = document.createElement("small")
        parkContact.textContent = "Phone: " + location.data[i].contacts.phoneNumbers[0].phoneNumber

        subParkCard.appendChild(parkName)
        subParkCard.appendChild(parkContact)

        var parkDesc = document.createElement("p")
        parkDesc.className = "mb-1"
        parkDesc.textContent = location.data[i].description
        var parkAddress = document.createElement("small")
        parkAddress.textContent = location.data[i].addresses[0].city + ", " + location.data[i].addresses[0].stateCode + " " + location.data[i].addresses[0].postalCode;

        parkCard.appendChild(subParkCard);
        parkCard.appendChild(parkDesc);
        parkCard.appendChild(parkAddress);
        parkContainer.appendChild(parkCard);
    }
}

// Event listener for the submit button
searchBtn.addEventListener("click", formSubmitHandler);
// Event listener for 'enter' key
searchedLocation.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        formSubmitHandlerEnter();

    }
});