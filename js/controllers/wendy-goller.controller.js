(function() {
    'use strict';

    angular
        .module('app')
        .controller('WendyGollerController', WendyGollerController);
    
    WendyGollerController.$inject = ['bookService'];

    function WendyGollerController(bookService) { 
        var vm = this;
        
        vm.addBook = addBook;
        vm.deleteBook = deleteBook;
        vm.getBooksList = getBooksList();
        vm.newBook = {};
        vm.books = [];
        
        function addBook(){
            newBook.title = vm.bookTitle;
            newBook.authorName = vm.authorName;
            newBook.publishDate = vm.publishDate
            bookService.addData(newBook);
        }
    
        function deleteBook(selectedBook){
            bookService.removeData(selectedBook);
        }

        function getBooksList(){
            bookService.getBooks().then(function(data){
                console.log(data.data);
                vm.books = data.data;
            });
        }

    }
})();