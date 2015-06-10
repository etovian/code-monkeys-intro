(function() {
    'use strict'
	angular
		.module("app")
		.factory("bookService", BookService);
    
    BookService.$inject = ['$q', '$http', '$log', 'notificationService']

	function BookService($q, $http, $log, notificationService) {
        
        var service = {
            getBooks: getBooks,
            setNewBook: setNewBook,
            updateSelectBook: updateSelectBook,
            deleteSelectBook: deleteSelectBook
        };
        
        return service;
        
		function getBooks() {
            var deffered = $q.defer();
            $http.get('/book-data.json').then(function(response){
                //console.log(response);
                deffered.resolve(response);
            });
            return deffered.promise;
        }     
        
		function setNewBook(selectedBook) {
		
        }    
        
		function updateSelectBook(selectedBook) {
		
        }
        
        function deleteSelectBook(selectedBook){
            
        }
	}

})();	