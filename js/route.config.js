(function() {
	
	angular
		.module("app")
		.config(config);
	
	function config($routeProvider) {
		$routeProvider
			.when("/initiative-list", {
				templateUrl: "views/templates/initiative-list.html",
				controller: "InitiativeListController",
				controllerAs: "list"
			})
			.when("/manage-characters", {
				templateUrl: "views/templates/manage-characters.html",
				controller: "ManageCharactersController",
				controllerAs: "pcs"
			})
			.when("/npcs", {
				templateUrl: "views/templates/manage-npc-templates.html",
				controller: "ManageNpcTemplatesController",
				controllerAs: "npcs"
			})
			.when("/admin", {
				templateUrl: "views/templates/admin.html",
				controller: "AdminController",
				controllerAs: "admin"
			})
			.otherwise({
				redirectTo: "/initiative-list"
			});
	};
	
})();