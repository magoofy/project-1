var stateCode = document.querySelector("#state-code");
var submitBtn = document.querySelector("#submit-btn");
var searchHistoryEl = document.querySelector("#search-history");
var searchHistory = [];

var passParam = function() {
    state = stateCode.value.trim()
    if(!searchHistory.includes(state)) {
        searchHistory.push(state);
    }
    localStorage.setItem("states", JSON.stringify(searchHistory));
    window.open("resultspage.html?state=" + state,'_self');

}

var displaySearchHistory = function() {
    //pull search history from local storage
    searchHistory = JSON.parse(localStorage.getItem("states"));
    console.log(searchHistory);
    // if nothing in localStorage, create a new object to track states
    if (searchHistory) {
        //create and append header for search history if there is search history
        var historyHeader = document.createElement("h5");
        historyHeader.textContent = "Search History:"
        historyHeader.className = "text-start p-2"
        searchHistoryEl.appendChild(historyHeader);

        //create and append each search history state
        for (var i = 0; i < searchHistory.length; i++) {
            var state = searchHistory[i];
            var stateLink = document.createElement("a");
            stateLink.textContent = state
            stateLink.setAttribute("href","resultspage.html?state=" + state );
            stateLink.className = "list-group-item list-group-item-action text-uppercase"
            searchHistoryEl.appendChild(stateLink);
        }      
    } else {
        searchHistory = []
    }
}

displaySearchHistory();
submitBtn.addEventListener("click", passParam);
stateCode.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        passParam();
    }
});