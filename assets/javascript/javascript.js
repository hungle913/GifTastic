$(document).ready(function(){

var animes = ["Naruto", "Radiant", "Haikyu", "Black Clover", "One Piece", "Food Wars", "Dr. Stone", "Demon Slayer", "Fire Force", "World Trigger", "Fairy Tail", "Gintama", "Overlord", "Attack on Titan", "Bleach", "Nanbaka", "Erased", "Gamers", "Given", "Hunter X Hunter"];

function displayAnimeInfo() {
  var anime = $(this).attr("data-name");
  var queryURL = "api.giphy.com/v1/gifs/search/?q=" + anime + "&api_key=Hmg2J0TCJmvg6ykc36VoNURbReycFRmz&limit=10&rating=g&rating=pg&rating=pg-13";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    $("#results").empty()
  });
}

function renderButtons() {
  $("#anime-buttons").empty();
  for (var i = 0; i < animes.length; i++) {
    var a = $("<button>");
    a.addClass("anime");
    a.attr("data-name", animes[i]);
    a.text(animes[i]);
    $("#anime-buttons").append(a);
  }
}

$("#find-anime").on("click", function(event){
  event.preventDefault();
  var anime = $("#animeSearch").val().trim();
  animes.push(anime);
  renderButtons();
});


  
  });