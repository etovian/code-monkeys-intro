(function() {

	angular
		.module("app")
		.controller("MikeGreenController", MikeGreenController);
	
	function MikeGreenController(marvelService, notificationService, modalService, $log) {

		var vm = this;
		angular.extend(vm, {
			
			searchFilter: "",

			getCharacterData: function() {
				return marvelService.getCharacterData();
			},
			getCharacters: function() {
				return marvelService.getCharacters();
			},
			getSummary: function() {
				var data = vm.getCharacterData();
				var s = "Displaying " + data.count + " of " + data.total + " records.";
				return s;
			},
			requestCharacters: function() {
				marvelService.requestCharacters(vm.searchFilter);
			}
		});

		// marvelService.requestCharacters();
		// marvelService.requestComics();

		notificationService.add({
			title: "Welcome to Mike Green's View!",
			text: "There will be bugs.  You have been warned!",
			type: notificationService.NOTIFICATION_TYPES.DANGER,
			pinned: false
		});
	}
	
})();