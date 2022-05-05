var stateCode = document.querySelector("#state-code");
var submitBtn = document.querySelector("#submit-btn");

var passParam = function() {
    state = stateCode.value.trim()
    window.open("index.html?state=" + state,'_self');
}

submitBtn.addEventListener("click", passParam);
stateCode.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        passParam();
    }
});