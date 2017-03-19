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
    let resultElement = '';
    if (data.total_results > 0) {
        data.results.forEach( (item) => {
            //resultElement += '<div class="js-search-thumbnail">' + item.snippet.thumbnails.medium.url + '</div>';
            resultElement += 
/*            `
	        <div class="js-movie-search-results lrg-col-3 med-col-4 sm-col-12">
                <div class="js-movie-search-thumbnail">
                <a href="#" class="js-movie-thumbnail"><img src="${item.poster_120x171}" class="js-movie-thumbnail" /></a>
                <div class="js-movie-search-title">${item.title}</div>
                <div><button class="js-select-movie" data-id="${item.id}">Select movie</button></li></div>
            </div>`;*/


	        `<div class="js-movie-search-results lrg-col-3 med-col-4 sm-col-12">
                <div class="js-movie-search-thumbnail">
		            <img src="${item.poster_240x342}" class="js-movie-thumbnail" data-id="${item.id}"/>
                </div>
	        </div>`;


            });
        }
        else {
            resultElement += `<p>No result</p>`
            //alert("no result");
        };
    $('.movie-result-container').html(`${resultElement}`);
    //alert("toggle");
    $('.movie-result-container').toggle();
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
    getMovieTrailerFromAPI(movieID, displayGUIDEBOXTrailerData);
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
    console.log(callback);
}

// *** Block for movie information portion  - based on movie id **************

const displayGUIDEBOXMovieInfo = (data) => {
    let reviewElement = '';
    if (data.id) {
        reviewElement += 
           `<img src="${data.poster_240x342}" class="js-movie-thumbnail left" />
            <span class="js-movie-review-title"><h1>${data.title}</h1></span>
            <p>${data.overview}</p>`;
    }
    
//<div><button class="js-movie-sources" data-id="${data.id}">Find Sources</button></li></div>

    else {
        reviewElement += `<p>No result</p>`;
    }

    $('.movie-review').html(`${reviewElement}`);
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
        data.results.forEach( (item) => {
            item.free_web_sources.forEach( (vidItem) => {
                videoElement += `${vidItem.embed}`;
            });
            trailerElement += `<a data-fancybox class="js-activate-thumbnail" href="${videoElement}"><button >Watch the trailer</button></a>`;
        });
    }
    else {
        trailerElement += '<p>No result</p>'
    }
  $('.movie-trailer-button').html(`${trailerElement}`);
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
        image: "itunes.jpg"
    },
    {
        source: "verizon_on_demand",
        image: "itunes.jpg"
    }
]

const displayGUIDEBOXSourceData = (data) => {
    let resultElement = '';
    let sourceLogo = '';
    if (data.purchase_web_sources) {
        data.purchase_web_sources.forEach( (item) => {            
            console.log("item cheked is: ",item.source)
            for (var i=0; i<imageStored.length; i++) {
                var logo = imageStored[i];
                if (item.source === logo.source) {
                    sourceLogo = logo.image
                    console.log(sourceLogo);
                };
            }
            let priceElement = '';
            item.formats.forEach( (itemFormat) => {
                priceElement += `<tr><td align="right">${itemFormat.type} ${itemFormat.format}: </td><td align=":"right">\$${itemFormat.price}</td></tr>`;
            });

            resultElement += `
            <div class="js-movie-source-results lrg-col-4 med-col-2 sm-col-12">
                <div class="js-movie-source-thumbnail">		            
                    <img src="images/${sourceLogo}" class="js-source-thumbnail" />
                    <table>${priceElement}</table>
                </div>
            </div>`;
        });
    }
    else {
        resultElement += '<p>No result</p>'
    }
    $('.movie-source-container').html(`<div style="padding: 30px; margin-right: 30px;"><h1 style="color: blue">The movie is available for purchase from the following services:</h1></div>${resultElement}`);
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