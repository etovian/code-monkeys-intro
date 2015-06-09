(function() {
	
	angular
		.module("app")
		.config(config);
	
	var templatePath = "views/templates/";

	function config($routeProvider) {
		$routeProvider
			.when("/home", {
				templateUrl: templatePath + "home.html",
				controller: "HomeController",
				controllerAs: "list"
			})
			.when("/mike-green", {
				templateUrl: templatePath + "mike-green.html",
				controller: "MikeGreenController",
				controllerAs: "mg"
			})
			.when("/wendy-goller", {
				templateUrl: templatePath + "wendy-goller.html",
				controller: "WendyGollerController",
				controllerAs: "wg"
			})
			.otherwise({
				redirectTo: "/home"
			});
	};
	
})();