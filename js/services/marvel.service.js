angular
	.module("app")
	.factory("marvelService", MarvelService);

function MarvelService($q, $http, $log) {
	
	var PRIVATE_KEY = "bd8fd2dce87b3f368fd96048d42fbfe2d7d1d401";
	var PUBLIC_KEY = "1b11a7c699f3f7d7e8a6ab6e8b6281b9";

	var characterData = {
		offset: 0,
		limit: 10,
		total: 0,
		count: 0,
		results: []
	};

	var comicData = {
		offset: 0,
		limit: 10,
		total: 0,
		count: 0,
		results: []
	};
	
	return {
		getCharacters: function() {
			return characterData.results;
		},
		getComics: function() {
			return comicData.results;
		},
		getTimestamp: function() {
			return "" + new Date().getTime();
		},
		getHash: function(timestamp) {
			var s = timestamp + PRIVATE_KEY + PUBLIC_KEY;
			var hash = CryptoJS.MD5(s);
			var r = hash.toString(CryptoJS.enc.Hex);
			return r;
		},
		getURL: function(type) {

			//http://gateway.marvel.com/v1/public/characters?apikey=1b11a7c699f3f7d7e8a6ab6e8b6281b9&hash=0c61bf670ab2e189894495fad50543be&ts=1432240599418
			var timestamp = this.getTimestamp();
			var url = 
				"http://gateway.marvel.com/v1/public/" + 
				type +
				"?apikey=" + PUBLIC_KEY +
				"&hash=" + this.getHash(timestamp) +
				"&ts=" + timestamp +
				"&limit=100";

			return url;
		},
		requestCharacters: function() {
			var deferred = $q.defer();
			var self = this;
			$http.get(this.getURL("characters"))
				.success(function(response, status, headers, config) {
					self.setCharacterData(response.data);
				}).error(function(data, status, headers, config) {
					$log.warn(data, status, headers(), config);
					notificationService.addError("Could not load data for " + characters);
				});

			return deferred.promise;
		},
		requestComics: function() {
			var deferred = $q.defer();
			var self = this;
			$http.get(this.getURL("comics"))
				.success(function(response, status, headers, config) {
					self.setComicData(response.data);
				}).error(function(data, status, headers, config) {
					$log.warn(data, status, headers(), config);
					notificationService.addError("Could not load data for " + characters);
				});

			return deferred.promise;
		},
		setCharacterData: function(data) {
			characterData = data;
		},
		setComicData: function(data) {
			comicData = data;
		}
	};
}