//API Request:
var requestURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=";
var promptTextContainer = "";
function convertSearch(inputTerm) {
    return inputTerm.replace(" ", "+");
}
function getWikiJSON(searchTerm) {
    $.ajax({
        type: "GET",
        url: requestURL + searchTerm,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "jsonp",
        headers: {"Api-User-Agent": "WikiViewer CRW"},
        success: function(result) {
            console.log(result);
            displayResults(result.query.search);
        },
        error: function(errorMessage) {
            console.log(errorMessage);
        }
    });
}
function displayResults(resultArray) {
    var resultHTML = "";
    for (var i = 0; i < resultArray.length; i++) {
        resultHTML += '<a href = "https://en.wikipedia.org/wiki/' + resultArray[i].title + '" target="_blank"><div class = "result"><div class = "result-title"><h2>' + resultArray[i].title +'</h2></div>';
        resultHTML += '<div class = "result-snippet"><p>' + resultArray[i].snippet + '</p></div></div></a>';
    }
    $("#content-wrapper").addClass("shift-up");
    $("#results-window").html(resultHTML);
    $('#text-wrapper').slideToggle(1000);
}
/*Pseudocde:
* Start with initial string (minus search string) - requestURL;
* When user inputs a string into the field and presses enter, call a function convertSearch
* appendSearch will take the string, convert the spaces into +'s
* Then, send requestHTML + string to a function containing an ajax API call
* If API call is successful, start parsing the JSON
* Then, send search array to a new function displayResults
* displayResults takes array, and loops through with a for loop (i < array.length) 
* for each item in the array, append html tags to title, and also to body.
* finally, display items on page, moving up the div containing the search bar to the top of the screen.
*/
$(document).ready(function(){
    $('#search-form').keypress(function(event){
        if(event.keyCode == 13){
            $('#search-text').click();
        }
    });
    $("#search-text").click(function() {
        var formText = $("#search-form").val();
        if (formText !== "") {
            getWikiJSON(convertSearch(formText));
        }
        else {
            alert("Please enter a search term.");
        }
    });
});