$(document).ready(function(){

var animes = ["Naruto", "Radiant", "Haikyu", "Black Clover", "One Piece", "Food Wars", "Dr. Stone", "Demon Slayer", "Fire Force", "World Trigger", "Fairy Tail", "Gintama", "Overlord", "Attack on Titan", "Bleach", "Nanbaka", "Erased", "Gamers", "Given", "Hunter X Hunter"];

function displayAnimeInfo() {

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

  renderButtons();

  $("#find-anime").on("click", function(event){
  event.preventDefault();
  var newAnime = $("#animeSearch").val().trim();
  animes.push(newAnime);
  renderButtons();
  });

  $(document).on("click", ".anime", displayAnimeInfo);


  $("button").on("click", function() {
    var anime = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=Hmg2J0TCJmvg6ykc36VoNURbReycFRmz&limit=10&rating=g&rating=pg&rating=pg-13";
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response){
    var results = response.data;

    for (var i = 0; i <results.length; i++) {
      var gifDiv = $("<div>");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var animeImage = $("<img>");
      animeImage.attr("src", results[i].images.fixed_height.url);

      gifDiv.prepend(animeImage);
      gifDiv.prepend(p);

      $("#results").prepend(gifDiv);
      }

    });

  });
  
}
displayAnimeInfo()
  });