$(document).ready(function() {


    var colorsCollection = ["#e6194b",
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
    var currentQuote = '';
    var currentAuthor = '';

    function openURL(url) {
        window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
    }

    function getQuote() {

        var forismaticURL = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?';
        $.ajax({
            url: forismaticURL,
            dataType: 'jsonp',
            success: function(randomQuote) {
                    console.log(randomQuote);
                    currentQuote = randomQuote.quoteText;
                    currentAuthor = randomQuote.quoteAuthor;
                    console.log("The author and the quote are: ", currentAuthor, " ", currentQuote);

                    //getting random images from Flicr        
                    //http://javascript.qahowto.com/Use-javascript-to-get-a-random-image-from-Google-images-javascript-html-image-1f1adf6

                    var keyword = "flower macro";

                    $.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
                            tags: keyword,
                            tagmode: "any",
                            format: "json"
                        },

                        function(images) {

                            var rnd = Math.floor(Math.random() * images.items.length);

                            var image_src = images.items[rnd]['media']['m'].replace("_m", "_b");

                            $("#random-image").attr("src", image_src);

                            //use this for setting a random backgroudn image
                            //$('').css('background-image', "url('" + image_src + "')");

                        }); //end of Flickr $.getJSON request


                    $(".quote-citation").animate({
                            opacity: 0
                        }, 500,
                        function() {
                            $(this).animate({
                                opacity: 1
                            }, 500);
                            $('#text').text(randomQuote.quoteText);
                        }); //end of quote-citation-animate

                    $(".quote-author").animate({
                            opacity: 0
                        }, 500,
                        function() {
                            $(this).animate({
                                opacity: 1
                            }, 500);
                            $('#author').html(randomQuote.quoteAuthor);
                        }); //end of quote-author-animate

                    var color = Math.floor(Math.random() * colorsCollection.length);
                    $("html body").animate({
                        backgroundColor: colorsCollection[color],
                        color: colorsCollection[color]
                    }, 1000); //end of html body background color animate

                    $(".button").animate({
                        backgroundColor: colorsCollection[color]
                    }, 1000);

                } //end of the success function

        }); //end of quote AJAX request

    } //end of getQuote()


    getQuote();


    $('#new-quote').on('click', getQuote);

    $('#twitter-quote').on('click', function() {
        openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    });


});