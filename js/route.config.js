(function() {
	
	angular
		.module("app")
		.config(config);
	
	function config($routeProvider) {
		$routeProvider
			.when("/home", {
				templateUrl: "views/templates/home.html",
				controller: "HomeController",
				controllerAs: "list"
			})
			.otherwise({
				redirectTo: "/home"
			});
	};
	
})();