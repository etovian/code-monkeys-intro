angular
  .module('app')
  .service("movieService", MovieService);

function MovieService($q, $http, $location, $log, notificationService) {


    /* Example request URI: "  "*/

  var ROTTENTOMS_URL = "http://api.rottentomatoes.com/api/public/v1.0/";
  var API_KEY = ".json?apikey=dewea2dj5uhnnq45qu9rjwb5&_prettyprint=true&q="
  var MOVIES_SEARCH_METHOD = "movies";    //
  var LISTS_SEARCH_METHOD = "lists";    //
  var POLLING_DATA_NOTIFICATION = {
    title: 'Requesting Data',
    text: 'This is gonna take a bit...',
    type: notificationService.NOTIFICATION_TYPES.INFO,
    pinned: true
  };


  this.getMovieData = function(searchTerm) {
    console.log("searchTerm: ", searchTerm)
    var deferred = $q.defer();
    $http({
      method: "JSONP",
      url: ROTTENTOMS_URL + MOVIES_SEARCH_METHOD + API_KEY + searchTerm,
      params: {
        callback: "JSON_CALLBACK"
      }
    }).then(function(data) {
      var movieData = data.data.movies;
        console.log("movieData: ", movieData);

      var onDvdArray = [];
      var inTheaterArray = [];
      var comingSoonArray = [];
      var noReleaseDate = [];
      var today = moment();
        // console.log("TODAY: ", today)
        // console.log("TODAY minus 365: ", today.subtract(365, 'days'))

          //WORKING ON IMPROVING THUMBNAIL QUALITY
      // for(var i = 0; i < movieData.length; i++) {
      //   console.log("POSTERS: ", movieData[i].posters)
      //   var original = movieData[i].posters.original.replace(/^.*?\/[\d]+x[\d]+\//,"http://");
      // }

      for(var i = 0; i < movieData.length; i++) {
        var releaseDate = movieData[i].release_dates;
            // console.log("releaseDate: ", releaseDate.theater)
            // console.log("MOMENT: ", moment(releaseDate.theater))
        if(!releaseDate.dvd && !releaseDate.theater) {
          noReleaseDate.push(movieData[i]);
        } else if(releaseDate.dvd || moment(releaseDate.theater) < moment().subtract(365, 'days')) {
          onDvdArray.push(movieData[i]);
        } else {
          if(moment(releaseDate.theater) > today) {
            comingSoonArray.push(movieData[i]);
          } else {
            inTheaterArray.push(movieData[i]);
          }
        }
      }

      var moviesObject = {
        onDvd: onDvdArray,
        inTheater: inTheaterArray,
        comingSoon: comingSoonArray,
        noReleaseDate: noReleaseDate
      };
      console.log("moviesObject: ", moviesObject)

      deferred.resolve(moviesObject);
    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

};
