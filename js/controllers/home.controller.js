(function() {

	angular
		.module("app")
		.controller("HomeController", HomeController);
	
	function HomeController(notificationService, modalService) {

		var vm = this;
		angular.extend(vm, {

		});
	}
	
})();