(function() {

	angular
		.module("app")
		.controller("MikeGreenController", MikeGreenController);
	
	function MikeGreenController(marvelService, notificationService, modalService, $log) {

		var vm = this;
		angular.extend(vm, {
			
			isPolling: false,
			pagination: {
				currentIndex: 1,
				itemsPerPage: 100,
				maxSize: 5
			},
			searchFilter: "",

			getCharacterData: function() {
				return marvelService.getCharacterData();
			},
			getCharacters: function() {
				return marvelService.getCharacters();
			},
			getSummary: function() {
				var data = vm.getCharacterData();
				var startIndex = ((vm.pagination.currentIndex - 1) * vm.pagination.itemsPerPage) + 1;
				var endIndex = startIndex + vm.pagination.itemsPerPage - 1;
				endIndex = (endIndex < vm.getCharacterData().total) ? endIndex : vm.getCharacterData().total;
				var s = "Displaying " + startIndex + "-" + endIndex + " of " + data.total + " records.";
				return s;
			},
			requestCharacters: function() {
				vm.isPolling = true;
				marvelService.requestCharacters(vm.searchFilter, vm.pagination)
					.finally(function() {
						vm.isPolling = false;
					});
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