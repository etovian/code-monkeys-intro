angular
  .module('app')
  .service("movieService", MovieService);

function MovieService($q, $http, $location, $log, notificationService) {


    /* Example request URI: " https://api.themoviedb.org/3/search/multi?api_key=97a0ffa0eeb977eb2f54a537c400a31a&query=transformers " "*/

  var MOVIEDB_URL = "https://api.themoviedb.org/3/";
  var API_KEY = "api_key=97a0ffa0eeb977eb2f54a537c400a31a"
  var SEARCH_METHOD = "search/multi?";    //
  var POLLING_DATA_NOTIFICATION = {
    title: 'Requesting Data',
    text: 'This is gonna take a bit...',
    type: notificationService.NOTIFICATION_TYPES.INFO,
    pinned: true
  };

  var vm = this;

  vm.getInfo: function(searchTerm) {
    var deferred = $q.defer;
    $http({
      method: "JSONP",
      url: MOVIEDB_URL + SEARCH_METHOD + API_KEY + "&query=" + searchTerm,
      params: {
        callback: "JSON_CALLBACK"
      }
    })
  }

};
