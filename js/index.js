// *******Create functions**********

function generateQuote() {
  $.ajaxSetup({ cache: false });
  $.getJSON(
    "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
    function(json) {
      $("#content").html(json[0].content);
      $("#title").html(json[0].title);
      var fullQuote = "\"" + json[0].content + "\"    --- " + json[0].title;
      var fullQuoteText = fullQuote.replace(/<\/{0,1}[a-z]+>/gi, "");
      $("#twitter-link").attr("href", "https://twitter.com/intent/tweet?text=" + encodeURIComponent(fullQuoteText));
    }
  );
  changeColors();
}

function changeColors() {
  var colors = [
    "#e6194b",
    "#3cb44b",
    "#ff1493",
    "#f58231",
    "#911eb4",
    "#f032e6",
    "#008080",
    "#aa6e28",
    "#800000",
    "#808000",
    "#000080",
    "#000000"
  ];
  var findIndex = Math.floor(Math.random() * colors.length);
  var colorToChange = colors[findIndex];
  $("body, .btn").css("background-color", colorToChange);
  $(".icons").css("color", colorToChange);
}

// ***** Run code after page loads ******

$(document).ready(function() {
  generateQuote();
  $("#get-quote").on("click", generateQuote);
});