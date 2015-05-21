(function() {

	angular
		.module("app")
		.controller("HomeController", HomeController);
	
	function HomeController(notificationService, modalService) {

		var vm = this;
		angular.extend(vm, {

		});

		notificationService.add({
			title: "Welcome, Code Monkeys!",
			text: "Two men enter!  One man leaves!  Oh, wait.  That's the Thunderdome.",
			type: notificationService.NOTIFICATION_TYPES.INFO,
			pinned: false
		});
	}
	
})();