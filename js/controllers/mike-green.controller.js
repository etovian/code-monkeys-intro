(function() {

	angular
		.module("app")
		.controller("MikeGreenController", MikeGreenController);
	
	function MikeGreenController(marvelService, notificationService, modalService, $log) {

		var vm = this;
		angular.extend(vm, {
			searchFilter: "",
			getCharacters: function() {
				return marvelService.getCharacters();
			}
		});

		marvelService.requestCharacters();
		marvelService.requestComics();

		notificationService.add({
			title: "Welcome to Mike Green's View!",
			text: "There will be bugs.  You have been warned!",
			type: notificationService.NOTIFICATION_TYPES.DANGER,
			pinned: false
		});
	}
	
})();