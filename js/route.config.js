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
			.when("/skoot", {
				templateUrl: templatePath + "skoot.html",
				controller: "SkootController",
				controllerAs: "sm"
			})
			.otherwise({
				redirectTo: "/home"
			});
	};

})();
