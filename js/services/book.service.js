var app = angular.module("app");

app.service('bookService', function($q, $http, $log, notificationService){
    
    this.getBooks = function(){
        var deffered = $q.defer();
        $http.get('/book-data.json').then(function(response){
            //console.log(response);
            deffered.resolve(response);
        });
        return deffered.promise;
    };
  
});