// Variables

var searchBtn = document.querySelector("#search-btn");
var searchedLocation = document.querySelector("#searched-location")
var parkContainer = document.querySelector("#park-container");
// layer on map that pins are added to
var vectorLayer = new ol.layer.Vector({
  source: new ol.source.Vector()
})


// DISPLAY MAP js
var coordinate = [-119, 37]
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    vectorLayer,
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-122.4230206
      , 37.82676234]),
    zoom: 0
  }),
  name: "map"
});

// Homepage
var getStateCode = function() {

    var queryString = document.location.search;
    var stateCode = queryString.split("=")[1];
  
    if (stateCode) {
      getParkInfo(stateCode);
    }
}

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

  parkContainer.textContent = "";

  for (i = 0; i < 10; i++) {
    var parkCard = document.createElement("a")
    parkCard.classList = "list-group-item list-group-item-action flex-column align-items-start park-card"
    // set latitude and longitude and fullName attributes for each search result
    parkCard.setAttribute("latitude", location.data[i].latitude);
    parkCard.setAttribute("longitude", location.data[i].longitude);
    parkCard.setAttribute("fullName", location.data[i].fullName);

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

// Event listener for search result cards (if you click on a search result it will display on map)
$("main").on("click", "a", function () {
  var lat = parseFloat($(this).attr("latitude"))
  var lon = parseFloat($(this).attr("longitude"))
  var parkName = $(this).attr("fullName")

  //change map center to search result that was clicked
  map.setView(new ol.View({
    center: ol.proj.fromLonLat([lon, lat]),
    zoom: 14
  }));


  //clear all features (pins) on map
  vectorLayer.getSource().clear();

  // create feature (pin on map)
  var feature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
  });

  //create style/label for feature
  var markerStyle = new ol.style.Style({
    image: new ol.style.Icon({
      scale: .5,
      src: "./assets/images/mapmarker.png",
      opacity: .7,
    }),
    text: new ol.style.Text({
      text: parkName,
      font: "12px Calibri, Sans-serif",
      overflow: true,
      fill: new ol.style.Fill({
        color: "#000",
      }),
      stroke: new ol.style.Stroke({
        color: "#fff",
        width: 3
      }),
      offsetY: -18
    })
  });

  // add style to feature then add feature to layer on map
  feature.setStyle(markerStyle);
  vectorLayer.getSource().addFeature(feature);

});



getStateCode();


