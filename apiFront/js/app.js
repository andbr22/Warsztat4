$(document).ready(function(){
    var dataContainer = $("#dataContainer");
    var form = $("form");
    //console.log("hey");

    //POBRANIE DANYCH Z END-POINT-U BOOKS
    loadBooks();

    form.on("submit",function(event){
        event.preventDefault();
        submitBook(event.target);
        loadBooks();
    });
    
    eventClick();
});

//Funkcje
function eventClick(){
    $(document).on("click",function(event){
        var deleteLinks = $(".delete");
        //console.log(event.target);
        $.each(deleteLinks,function(key,value){
            //console.log(value);
            if(event.target === value){
                event.preventDefault();
                //console.log(value.getAttribute("value"));
                deleteBook(value.getAttribute("value"));
            }
        });
        loadBooks();
    });
}

function deleteBook(id){
    /*$.ajax({
        url: "http://localhost:8282/books/remove/"+id,
        method: 'DELETE',
    }).done(function(books){
    });
    */
    var myInit = {
        method: 'DELETE',
        mode: 'cors',
        cache: 'default'
    }

    fetch("http://localhost:8282/books/remove/"+id, myInit).then(function(response){
        //console.log("hey");
    }).catch(function(){
        //console.log("jo");
    });
}

function loadBooks(){
    $.ajax({
        url: "http://localhost:8282/books/",
    }).done(function(books){
        addBooksToHtml(books);
    });
}
function submitBook(form){
    var json1 = JSON.stringify({
        title: form.title.value, 
        author: form.author.value, 
        isbn: form.isbn.value, 
        publisher: form.publisher.value, 
        type: form.type.value
    });
    //console.log(json1);
    //console.log(JSON.parse(json));
    
    var myHeaders = new Headers({
        'Content-Type': 'application/json'
    });
    var myInit = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: json1
    }

    fetch("http://localhost:8282/books/add", myInit).then(function(response){
        //console.log("hey");
    }).catch(function(){
        //console.log("jo");
    });
}

function addBooksToHtml(books){
    //dataContainer.innerHtml ="";
    //console.log(dataContainer);
    while(dataContainer.firstChild){
        dataContainer.removeChild(dataContainer.firstChild);
    }
    books.forEach(function(book){
        var author = book.author;
        var title = book.title;
        var isbn = book.isbn;
        var publisher = book.publisher;
        var bookId = book.id;
        var link = '<a href="" class="delete" value="'+bookId+'">Usuń<a>';
        var newElement = $('<tr><td>'+title+'</td><td>'+author+'</td><td>'+isbn+'</td><td>'+publisher+'</td><td>'+link+'</td></tr>');
        //console.log(newElement);

        dataContainer.append(newElement[0]);
    });
}