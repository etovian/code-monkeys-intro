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
        vm.books = [];
        vm.showForm = false;
        vm.showUpdateForm = showUpdateForm;
        vm.editAuthorName;
        vm.editBookTitle;
        vm.bookTitle;
        vm.authorName;
        vm.bookSelected;
        
        function showUpdateForm(){
            console.log(vm.bookSelected);
            vm.editAuthorName = vm.bookSelected.author;
            vm.editBookTitle = vm.bookSelected.title;
        }
        
        function addBook(){
            var newBook = {};
            newBook.title = vm.bookTitle;
            newBook.authorName = vm.authorName;
            newBook.publishDate = vm.publishDate
            bookService.setNewBook(newBook);
        }
    
        function deleteBook(selectedBook){
            bookService.deleteSelectBook(selectedBook);
        }
        
        function updateBook(selectedBook){
            bookService.updateSelectBook(selectedBook);
        }

        function getBooksList(){
            bookService.getBooks().then(function(data){
                console.log(data.data);
                vm.books = data.data;
            });
        }


    }
})();