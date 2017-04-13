// https://www.googleapis.com/youtube/v3/search?pageToken=CBkQAA&part=snippet&maxResults=25&order=relevance&q=site%3Ayoutube.com&topicId=%2Fm%2F02vx4&key={YOUR_API_KEY}
// Event handlers

/*$('body').on('click', '.js-activate-thumbnail',function (event) {
    event.preventDefault(); // do not submit yet
    // alert($(this).siblings('.overlay').attr('id'));
    var idToOpen = '#' + $(this).data('id');
    $(idToOpen).toggle();
    // $(this).siblings('.overlay').hide();
    // $(this).css('display', 'none'); 
});
$('body').on('click','.js-close-thumbnail',function (event) {
    event.preventDefault(); // do not submit yet
    //alert($(this).siblings('.overlay').attr('id'));
    var idToClose = '#' + $(this).data('id');
    $(idToClose).toggle();
    // $(this).siblings('.overlay').hide();
    // $(this).css('display', 'none'); 
});*/

// *** Block for movie ID search portion **************
// *** Create the API url variable = endpoint ******

const GUIDEBOX_SEARCH_BASE_URL = "https://api-public.guidebox.com/v2/search"; // Link for movie ID search
const GUIDEBOX_MOVIE_BASE_URL = "https://api-public.guidebox.com/v2/movies/"; // link for movie info

const getTitleDataFromAPI = (searchTerm, callback) => {
    const query = {
        type: 'movie',
        field: 'title',
        query: searchTerm,
        api_key: '65fd44fa012e778f220d1e1c8f8dd0f2642fb87d'
        //maxResults: 6
    }
    //console.log(query);
    $.getJSON(GUIDEBOX_SEARCH_BASE_URL, query, callback);
    //console.log(callback);git add
}

const displayGUIDEBOXTITLESearchData = (data) => {
    
    // Clean containers if previous entry
    $( '.movie-result-container' ).empty();
    $( '.movie-review' ).empty();
    $( '.movie--trailer-button' ).empty();
    $( '.movie-source-container' ).empty();

    let formattedTextElement = '';
    let resultElement = '';
    if (data.total_results > 0) {
        data.results.forEach( (item) => {
            resultElement += `<div class='grid-cell grid-small-12 grid-medium-4 grid-large-3' style='text-align: center'><img src="${item.poster_240x342}" class="js-movie-thumbnail" data-id="${item.id}"/></div>`;
        });
        formattedTextElement += `    
            <div class='grid grid-with-gutter'>
                <div class='grid-cell grid-small-12 grid-medium-12 grid-large-12'>
                    <div class='grid-content-text'>
                        <h1>We found some matches</h1>
                        <p>Select the correct movie if it appears here, and we will see if it is available on any platform.</p>
                        <p>Or you can try another search.</p>
                    </div>
                </div>
            </div>
            <div class="grid grid-with-gutter">${resultElement}</div>`
        }
    else {
        formattedTextElement += `
            <div class='grid grid-with-gutter'>
                <div class='grid-cell grid-small-12 grid-medium-12 grid-large-12'>
                    <div class='grid-content-text'>
                        <p>We did not find a match for the movie you entered. Sorry.</p>
                        <p>But do not give up, you can try looking for another one.</p>
                    </div>
                </div>
            </div>`
        //alert("no result");
        };
    $('.movie-result-container').html(`${formattedTextElement}`);
    //alert("toggle");
    // Toggle containers
    if ($( '.movie-result-container' ).is( ":hidden" )) {$('.movie-result-container').toggle();};
    if ($( '.movie-review-container' ).is( ":visible" )) {$('.movie-review-container').toggle();};
    if ($( '.movie-source-container' ).is( ":visible" )) {$('.movie-source-container').toggle();};
    if ($( '.description' ).is( ":visible" )) {$('.description').toggle();};
    //$('.box').toggle();
}

$('body').on('click','.js-movie-thumbnail', (event) => {
    event.preventDefault(); // do not submit yet
    //alert($(this).siblings('.overlay').attr('id'));
    const idToPass = $(event.target).data('id');
    $('.movie-result-container').toggle();
    // call new function to retrieve movie information
    getMovieDataFromAPI(idToPass);
});

// *** End movie search Block ******
// *********************************

// *** Wrapper function - retrieves all movie data ***************************

const getMovieDataFromAPI = (movieID) => {    
     getMovieInfoFromAPI(movieID, displayGUIDEBOXMovieInfo);
     getMovieInfoFromAPI(movieID, displayGUIDEBOXSourceData);
     //getMovieTrailerFromAPI(movieID, displayGUIDEBOXTrailerData);
}

const getMovieInfoFromAPI = (movieID, callback) => {
    const query = {
        api_key: '65fd44fa012e778f220d1e1c8f8dd0f2642fb87d'
        //maxResults: 6
    }
    $.getJSON(GUIDEBOX_MOVIE_BASE_URL + movieID, query, callback);
    // console.log(callback);
}

const getMovieTrailerFromAPI = (movieID, callback) => {
    const query = {
        api_key: '65fd44fa012e778f220d1e1c8f8dd0f2642fb87d'
    }
    let trailerURL = `${GUIDEBOX_MOVIE_BASE_URL}${movieID}/videos?limit=1&sources=guidebox`
    //alert(trailerURL);
    $.getJSON(trailerURL, query, callback);
    //console.log("trailer");
}

// *** Block for movie information portion  - based on movie id **************

const displayGUIDEBOXMovieInfo = (data) => {
    let reviewElement = '';
    if (data.id) {
        reviewElement += 
           `<div class='grid grid-with-gutter'>
                <div class='grid-cell grid-small-12 grid-medium-6 grid-large-5'>
                    <div id='moviePoster' class='grid-content-image' style='text-align:center'>
                        <img src="${data.poster_240x342}" class="js-movie-thumbnail" />

                    </div>
                </div>
                <div class='grid-cell grid-small-12 grid-medium-6 grid-large-7'>
                    <div class='grid-content-text'>
                        <h1>${data.title}</h1>
                        <p>${data.overview}</p>
                        <p class="details">Director: ${data.directors[0].name}</p>
                        <p class="details">Cast: ${data.cast[0].name}, ${data.cast[1].name}, ${data.cast[2].name}</p>
                    </div>
                </div>
            </div>`;
    }

                        // <div id='movieButton' class='grid-content-image' style='text-align:center'>
                        //     <a data-fancybox class="js-activate-thumbnail" href="${data.trailers.web[0].embed}"><button class='trailer'><i class="fa fa-play-circle"></i> Watch the Trailer</button></a>
                        // </div>                            
    
//<div><button class="js-movie-sources" data-id="${data.id}">Find Sources</button></li></div>

    else {
        reviewElement += `<p>No result</p>`;
    }

    $('.movie-review').prepend(`${reviewElement}`);
    $('.movie-review-container').toggle();
}

$('body').on('click','.js-movie-sources',function (event) {
    event.preventDefault(); // do not submit yet
    var idToPass = $(this).data('id');
    // alert(idToPass);
    $('.movie-review-container').toggle();
    // call new function to retrieve movie information
    getSourceDataFromAPI(idToPass, displayGUIDEBOXSourceData);
    $('.movie-source-container').toggle();
});

// *** Block for trailer portion  - based on movie id **************

const displayGUIDEBOXTrailerData = (data) => {
    let trailerElement = '';
    let videoElement = '';
    if (data.results) {
        videoElement = data.results[0];
        trailerElement += `
            <div class='grid grid-with-gutter'>
                <div class='grid-cell grid-small-12 grid-medium-4 grid-large-3'>
                    <div id='movieButton' class='grid-content-image' style='text-align:center'>
                        <a data-fancybox class="js-activate-thumbnail" href="http://api-widget.guidebox.com/embed.php?video=${videoElement}"><button class='icon'><i class="fa fa-play-circle fa-4x"></i></button></a>
                    </div>
                </div>
                <div class='grid-cell grid-small-12 grid-medium-8 grid-large-9'>
                </div>
            </div>`; 
    }
    else {
        trailerElement += '<p>No result</p>'
    }
  $('#movie-trailer-button').html(`${trailerElement}`);
}

// *** End movie trailer Block ******
// *********************************

// *** Block for source search portion  - based on movie id **************

// Store images for logos

var imageStored = [
    {
        source: "itunes",
        image: "itunes.jpg"
    },
    {
        source: "amazon_buy",
        image: "Amazon.jpg"
    },
    {
        source: "vudu",
        image: "Vudu.jpg"
    },
    {
        source: "google_play",
        image: "GooglePlay.jpg"
    },
    {
        source: "cinemanow",
        image: "CinemaNow.jpg"
    },
    {
        source: "youtube_purchase",
        image: "YouTube.jpg"
    },
    {
        source: "sony",
        image: "SonyEntertainment.jpg"
    },
    {
        source: "paramount_movies",
        image: "paramount.jpg"
    },
    {
        source: "verizon_on_demand",
        image: "itunes.jpg"
    }
]

const displayGUIDEBOXSourceData = (data) => {
    let formattedTextElement = '';

    let resultPurchaseElement = '';
    let purchaseAvailable = 0;

    let resultRentElement = '';
    let rentAvailable =0;

    let resultSubscriptionElement = '';
    let SubscriptionAvailable =0;

    let sourceLogo = '';

    // Subscription Options

    // if (data.subscription_web_sources) {           
    //     console.log("item checked is: ",data.subscription_web_sources.source)
    //     for (var i=0; i<imageStored.length; i++) {
    //         var logo = imageStored[i];
    //         if (data.subscription_web_sources.source === logo.source) {
    //             sourceLogo = logo.image
    //             console.log(sourceLogo);
    //         };
    //     }
    //     let subscriptionElement = '';
    //     let SubscriptionCounter = 0;
    //     if (data.subscription_web_sources.source != null && data.subscription_web_sources.link != null ) {
    //         subscriptionElement += `<a href="${data.subscription_web_sources.link}" target="_blank">Watch Now</a>`;
    //         SubscriptionCounter ++;
    //         SubscriptionAvailable ++;
    //     };

    //     if (SubscriptionCounter > 0){
    //         resultSubscriptionElement += `
    //         <div class='grid-cell grid-small-6 grid-medium-4 grid-large-3'>
    //             <div class='platforms'>            
    //             <span><img src="images/${sourceLogo}" class="js-source-thumbnail" /></span>
    //             ${subscriptionElement}
    //             </div>
    //         </div>`;
    //     }
    //     if (SubscriptionAvailable > 0) {
    //         formattedTextElement += `    
    //         <div class='grid grid-with-gutter'>
    //             <div class='grid-cell grid-small-12 grid-medium-12 grid-large-12'>
    //                 <div class='grid-content-text'>
    //                     <p>The movie is available for streaming from the following platforms, if you have a valid subscription:</p>
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="grid grid-with-gutter">${resultSubscriptionElement}</div>`
    //     }
    // }

    // Rental / Purchase Options

    if (data.purchase_web_sources) {
        data.purchase_web_sources.forEach( (item) => {            
            console.log("item checked is: ",item.source)
            for (var i=0; i<imageStored.length; i++) {
                var logo = imageStored[i];
                if (item.source === logo.source) {
                    sourceLogo = logo.image
                    console.log(sourceLogo);
                };
            }
            let priceElement = '';
            let priceCounter = 0;
            item.formats.forEach( (itemFormat) => {
                if (itemFormat.price != null && itemFormat.type === "purchase" ) {
                    priceElement += `<a href="${item.link}" target="_blank">${itemFormat.type} ${itemFormat.format}: \$${itemFormat.price}</a>`;
                    priceCounter ++;
                    purchaseAvailable ++;
                }
            });
            let rentElement = '';
            let rentCounter = 0;
            item.formats.forEach( (itemFormat) => {
                if (itemFormat.price != null && itemFormat.type === "rent" ) {
                    rentElement += `<a href="${item.link}" target="_blank">${itemFormat.type} ${itemFormat.format}: \$${itemFormat.price}</a>`;
                    rentCounter ++;
                    rentAvailable ++;
                }
            });

            if (priceCounter > 0){
                resultPurchaseElement += `
                <div class='grid-cell grid-small-6 grid-medium-4 grid-large-3'>
                    <div class='platforms'>            
                    <span><img src="images/${sourceLogo}" class="js-source-thumbnail" /></span>
                    ${priceElement}
                    </div>
                </div>`;
            }

            if (rentCounter > 0){
                resultRentElement += `
                <div class='grid-cell grid-small-6 grid-medium-4 grid-large-3'>
                    <div class='platforms'>            
                    <span><img src="images/${sourceLogo}" class="js-source-thumbnail" /></span>
                    ${rentElement}
                    </div>
                </div>`;
            }
        });
        if (purchaseAvailable > 0) {
            formattedTextElement += `    
            <div class='grid grid-with-gutter'>
                <div class='grid-cell grid-small-12 grid-medium-12 grid-large-12'>
                    <div class='grid-content-text'>
                        <p>The movie is available for rent from the following platforms:</p>
                    </div>
                </div>
            </div>
            <div class="grid grid-with-gutter">${resultRentElement}</div>`
        }
        if (rentAvailable > 0) {
            formattedTextElement += `    
            <div class='grid grid-with-gutter'>
                <div class='grid-cell grid-small-12 grid-medium-12 grid-large-12'>
                    <div class='grid-content-text'>
                        <p>The movie is available for purchase from the following platforms:</p>
                    </div>
                </div>
            </div>
            <div class="grid grid-with-gutter">${resultPurchaseElement}</div>`
        }
    }
    
    else {
        formattedTextElement += `
            <div class='grid grid-with-gutter'>
                <div class='grid-cell grid-small-12 grid-medium-12 grid-large-12'>
                    <div class='grid-content-text'>
                        <p>We did not find a match for the movie you entered. Sorry.</p>
                        <p>But do not give up, you can try looking for another one.</p>
                    </div>
                </div>
            </div>`
    };

    $('.movie-source-container').html(`${formattedTextElement}`);
    $('.movie-source-container').toggle();
}


// *** End movie Source Block ******
// *********************************

function createRatingsView(ratings) {
    const newRatings = `This movie got ${ratings} stars`;
    return `
        <div class="ratings">${newRatings}</div>
    `;
}

function watchSubmit() { // pass argument from search box
    $('.js-search-form').submit(function(event){
        event.preventDefault();
        var query = $(this).find('.js-query').val();
        //alert(query);
        getTitleDataFromAPI(query, displayGUIDEBOXTITLESearchData);
    });
}
// Create function to submit search terms  - callback function

$(function(){
    //$('.nojs-warning').remove(); // removes div containing "no js" warning
    watchSubmit();
});