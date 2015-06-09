var app = angular.module('app');

app.controller("WendyGollerController", function($scope, bookService){
    $scope.test = "Hello There!"
    
    
    $scope.addBook = function(){
        var newBook = {};
        newBook.title = $scope.bookTitle;
        newBook.authorName = $scope.authorName;
        newBook.publishDate = $scope.publishDate
        bookService.addData(newBook);
    }
    
    $scope.deleteBook = function(selectedBook){
        bookService.removeData(selectedBook);
    }
    
    $scope.getBooksList = function(){
        bookService.getBooks().then(function(data){
            console.log(data.data);
            $scope.books = data.data;
        });
    }();
    
    
});
