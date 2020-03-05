$(document).ready(function(){

  var animes = ["Naruto", "Radiant", "Haikyu", "Black Clover", "One Piece", "Food Wars", "Dr. Stone", "Demon Slayer", "Fire Force", "World Trigger", "Fairy Tail", "Gintama", "Overlord", "Attack on Titan", "Bleach", "Nanbaka", "Erased", "Gamers", "Given", "Hunter X Hunter"];



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

  $(document).on("click", "#find-anime", function(event){
    event.preventDefault();
    var newAnime = $("#animeSearch").val().trim();
    animes.push(newAnime);
    renderButtons();
  });

  $(document).on("click", ".anime", function() {
    var anime = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=Hmg2J0TCJmvg6ykc36VoNURbReycFRmz&limit=10&rating=g&rating=pg&rating=pg-13";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      var results = response.data;
      console.log(results)
      for (var i = 0; i < 10; i++) {
        var gifDiv = $("<div>");
        gifDiv.addClass("result")

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animeImage = $("<img>");
        animeImage.attr("src", results[i].images.fixed_height_still.url);
        animeImage.attr("animate", results[i].images.original.url);
        animeImage.attr("still", results[i].images.fixed_height_still.url);
        animeImage.attr("state", "still");
        animeImage.addClass("gif");
         
        gifDiv.prepend(animeImage);
        gifDiv.prepend(p);

        $("#results").prepend(gifDiv);

      }

    });
      
  });

  $(document).on("click", ".gif", function() {
    var dataState = $(this).attr("state");
    console.log("State: " + dataState);

    if (dataState === "still") {
      $(this).attr("src", $(this).attr("animate"));
      $(this).attr("state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("still"));
      $(this).attr("state", "still")
    }

  });

});

