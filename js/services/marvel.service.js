angular
	.module("app")
	.factory("marvelService", MarvelService);

function MarvelService($q, $http, $log, notificationService) {
	
	var MARVEL_URL = "http://gateway.marvel.com/v1/public/";
	var POLLING_DATA_NOTIFICATION = {
		title: "Requesting Data",
		text: "This might take a while...",
		type: notificationService.NOTIFICATION_TYPES.INFO,
		pinned: true
	};
	var PRIVATE_KEY = "bd8fd2dce87b3f368fd96048d42fbfe2d7d1d401";
	var PUBLIC_KEY = "1b11a7c699f3f7d7e8a6ab6e8b6281b9";
	var RECORD_LIMIT = 100;
	var RECORD_LIMIT_WARNING = {
		title: "Maximum Records Displayed",
		text: "The maximum number of records (" + RECORD_LIMIT + ") is displayed.  " +
			"Try narrowing your search criteria.",
		type: notificationService.NOTIFICATION_TYPES.DANGER
	};

	var characterData = {
		offset: 0,
		limit: RECORD_LIMIT,
		total: 0,
		count: 0,
		results: []
	};

	var comicData = {
		offset: 0,
		limit: RECORD_LIMIT,
		total: 0,
		count: 0,
		results: []
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
		requestCharacters: function(searchFilter, pagination) {
			var deferred = $q.defer();
			var self = this;

			var timestamp = this.getTimestamp();
			var params = {
				apikey: PUBLIC_KEY,
				hash: this.getHash(timestamp),
				ts: timestamp,
				offset: (pagination.itemsPerPage * (pagination.currentIndex - 1)),
				limit: RECORD_LIMIT
			};

			if(searchFilter) {
				params.nameStartsWith = searchFilter;
			}

			notificationService.add(POLLING_DATA_NOTIFICATION);
			$http.get(MARVEL_URL + "characters", { params: params })
				.success(function(response, status, headers, config) {
					self.setCharacterData(response.data);
					// self.showRecordLimitWarning(characterData);
					deferred.resolve(response.data);
				}).error(function(data, status, headers, config) {
					$log.warn(data, status, headers(), config);
					notificationService.addError("Could not load data for characters.");
					deferred.reject();
				}).finally(function() {
					notificationService.remove(POLLING_DATA_NOTIFICATION);
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
		},
		showRecordLimitWarning: function(data) {
			if(data.total > data.limit) {
				notificationService.add(RECORD_LIMIT_WARNING);
			}
		}
	};
}