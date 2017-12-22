$(document).ready(function(){
    var dataContainer = $("#dataContainer");
    var form = $("form");
    //console.log("hey");

    //POBRANIE DANYCH Z END-POINT-U BOOKS
    $.ajax({
        url: "http://localhost:8282/books/",
    }).done(function(books){
        addBooksToHtml(books);
    });

    form.on("submit",function(event){
        event.preventDefault();
        submitBook(event.target);
    });
    
});

//Funkcje
function submitBook(form){
    var json1 = JSON.stringify({
        title: form.title.value, 
        author: form.author.value, 
        isbn: form.isbn.value, 
        publisher: form.publisher.value, 
        type: form.type.value
    });
    console.log(json1);
    //console.log(JSON.parse(json));
    
    /*$.ajax({
        url: "http://localhost:8282/books/add",
        data: json,
        type: "POST",
        //mediaType: "application/json"
        dataType: "json"
    }).done(function(response){
        console.log(response);
    }).fail(function(response){
        console.log("lol");
        console.log(response);
    });*/
    var myHeader = new Headers({
        'content-type':'aplication/json'
    });
    var myInit = {
        method: 'POST',
        Headers: myHeader,
        mode: 'cors',
        cache: 'default',
        body: json1
    }

    fetch("http://localhost:8282/books/add", myInit).then(function(response){
        console.log("hey");
    }).catch(function(){
        console.log("jo");
    });
}

function addBooksToHtml(books){
    books.forEach(function(book){
        var author = book.author;
        var title = book.title;
        var isbn = book.isbn;
        var publisher = book.publisher;
        var newElement = $('<tr><td>'+title+'</td><td>'+author+'</td><td>'+isbn+'</td><td>'+publisher+'</td></tr>');
        //console.log(newElement);

        dataContainer.append(newElement[0]);
    });
}