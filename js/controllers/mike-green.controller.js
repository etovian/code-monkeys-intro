(function() {

	angular
		.module("app")
		.controller("MikeGreenController", MikeGreenController);
	
	function MikeGreenController(notificationService, modalService) {

		var vm = this;
		angular.extend(vm, {

		});

		notificationService.add({
			title: "Welcome, Mike Green's View!",
			text: "There will be bugs.  You have been warned!",
			type: notificationService.NOTIFICATION_TYPES.DANGER,
			pinned: true
		});
	}
	
})();