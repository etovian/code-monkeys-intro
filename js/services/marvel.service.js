angular
	.module("app")
	.factory("marvelService", MarvelService);

function MarvelService($q, $http, $log, notificationService) {
	
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

	var pagination = {
		index: 0,
		size: 25
	};
	
	return {
		getCharacterData: function() {
			return characterData;
		},
		getCharacters: function() {
			return characterData.results;
		},
		getComicData: function() {
			return comicData;
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
		getURL: function(type, searchFilter) {

			var timestamp = this.getTimestamp();

			var url = 
				"http://gateway.marvel.com/v1/public/" + 
				type +
				"?apikey=" + PUBLIC_KEY +
				"&hash=" + this.getHash(timestamp) +
				"&ts=" + timestamp +
				"&offset=" + (pagination.index * pagination.size) +
				"&limit=" + pagination.size;

			if(searchFilter) {
				switch(type) {
					case "characters":
						url += "&nameStartsWith=" + searchFilter;
						break;
					case "comics":
						break;
				}
			}

			return url;
		},
		setPageIndex: function(index) {
			pagination.index = index;
		},		
		pageData: function(pageNumer, data) {

		},
		requestCharacters: function(searchFilter) {
			var deferred = $q.defer();
			var self = this;
			var n = {
				title: "Requesting Data",
				text: "This might take a while...",
				type: notificationService.NOTIFICATION_TYPES.INFO,
				pinned: true
			};
			notificationService.add(n);
			$http.get(this.getURL("characters", searchFilter))
				.success(function(response, status, headers, config) {
					self.setCharacterData(response.data);
					notificationService.remove(n);
				}).error(function(data, status, headers, config) {
					$log.warn(data, status, headers(), config);
					notificationService.remove(n);
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