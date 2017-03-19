

# Movie Search API
Thinkful (https://www.thinkful.com) Frontend Web Development Capstone - jQuery app combined with the ![GuideBox API](http://api-public.guidebox.com) to search for movie/shows on the web

![Screenshot](http://jonwade.digital/github-images/incite-news-screenshot.png)

##Background

I designed the concept of the app after yet another long evening of scrolling through multiple apps on the XBox to find a movie. In the day whenyou can find multiple movies and shows from as many apps on the digital platforms, where do you go for a centralized search. My family subscribes to Amazon Prime, Netflix, Xbox Live, Hulu, HBO Now and CBS Now. We have access to a few more, such as Vudu, Crackle etc... And we do not subsribe to canle any more (In view of the list of apps, why should we?). We wanted a way to search for a movie across these platforms, either to stream for free for through our subscriptions, or to rent or purchase. 

##How does it work?

Enter the movie or show you are looking for, and the app will return the possible matches. Pick a specific movie, andthe app will return the details of the movie, a link to a trailer if available, and a list of services where you can purchase, rent or stream the movie from.

##Initial UX

The wireframes can be seen below:

![Initial Wireframe](https://github.com/afroose/MyMovieSearch/blob/769ff14d9281e959656480a285f3411dfcc29c73/images/Screens.jpg)
![User Flow](https://github.com/afroose/MyMovieSearch/blob/769ff14d9281e959656480a285f3411dfcc29c73/images/flow.jpg)

##Early iteration of the App (with poor styling)

You can access a working prototype of the app here:  https://afroose.github.io/MyMovieSearch/

##Functionality

What the app provides

* Searches across the web for a service to "purchase/rent or stream" a movie (At the moment the app loops only through the "purchase" sources)
* Returns matches for any movie searched.
* Whenthe movie is selected from possible matches, returns the movie detais/synopsis, a link to a trailer, and the possible sources.
* For each source, provide the price anf format o the movies available

##Technical

The app is built on the GuideBox API. The GuideBox API allows searches across over 320 Video Services, and returns a wealth of informations for every seach. The challnge is really presenting the results onthe screen. The app use jquery and AJAX calls to cycle to loop through the layers of data and present them in a structured way. The app is deigned to be responsive, and adjust to mobile, tablet and desktop screen resolutions.

##Development Roadmap

I intend to enhance the app further, and add in the near future:

* Search through free sources for streaming
* Sllow user to select the platform of choice (iOS, Android, Web).
* Improve the presentation of the results by adding carousels and sliders.
* Improves the styling of the presntation via CSS.