(function() {

	angular.module("app").directive("mgCharacterTile", CharacterTile);

	function CharacterTile() {
		
		return {
			templateUrl: "views/directives/character-tile.html",
			scope: {
				mgCharacter: "="
			},
			controller: CharacterTileController,
			controllerAs: "vm",
			bindToController: true
		};
	}

	function CharacterTileController() {

		var vm = this;

	 	angular.extend(vm, {

		});
	}

})();