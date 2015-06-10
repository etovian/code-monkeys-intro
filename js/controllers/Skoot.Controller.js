(function() {

  angular
    .module('app')
    .controller('SkootController', SkootController);

    function SkootController(movieService, notificationService, modalService, $log) {

    var vm = this;


      vm.getMovieData = function() {
        movieService.getMovieData(vm.searchTerm).then(function(response) {
          console.log("RESPONSE: ", response)
          vm.dvds = response.onDvd;
          vm.theater = response.inTheater;
          vm.coming = response.comingSoon;
          vm.noRelease = response.noReleaseDate;
        });
        vm.searchTerm = '';
      }


    notificationService.add({
      title: "You've Made It To Skoot's View!!",
      text: "I sure hope this works!!!",
      type: notificationService.NOTIFICATION_TYPES.DANGER,
      pinned: false
    });
  };     //end of SkootController

})();
