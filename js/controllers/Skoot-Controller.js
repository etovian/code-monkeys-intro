(function() {

  angular
    .module('app')
    .controller('SkootController', SkootController);

    function SkootController(movieService, notificationService, modalService, $log) {

    var vm = this;


      getMovieData: function() {
        return movieService.getMovieData();
      },

    notificationService.add({
      title: "You've Made It To Skoot's View!!",
      text: "I sure hope this works!!!",
      type: notificationService.NOTIFICATION_TYPES.DANGER,
      pinned: false
    });
  }     //end of SkootController

})();
