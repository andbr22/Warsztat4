$(document).ready(function(){
    var dataContainer = $("#dataContainer");
    var form = $("form");
    //console.log(submitButton);

    //POBRANIE DANYCH Z END-POINT-U BOOKS
    singleFetch("load","");

    form.on("submit",function(event){
        event.preventDefault();
    });
    $(document).on("click",function(event){
        eventClick(event);
    });

});

function singleFetch(action,element){
    var targetLink ="";
    var myInit = "";
    if(action==="load"){
        targetLink = "http://localhost:8080/Warsztat5/books";
        myInit = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }
    }else if(action==="delete"){
        var id = element.getAttribute("value");
        targetLink = "http://localhost:8080/Warsztat5/books/"+id;
        var myHeaders = new Headers({
            'content-type': 'aplication/json'
        });
        
        myInit = {
            method: 'DELETE',
            mode: 'cors',
            headers: myHeaders,
            cache: 'default'
        }
    }else if(action==="add"){
        //console.log(element[0]);
        var json1 = JSON.stringify({
            title: element.title.value, 
            author: element.author.value, 
            isbn: element.isbn.value, 
            publisher: element.publisher.value, 
            type: element.type.value
        });
        var myHeaders = new Headers({
            'Content-Type': 'application/json'
        });

        targetLink = "http://localhost:8080/Warsztat5/books";
        myInit = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: json1
        }
    }else{
        return;
    }
//singleFetch("load","");
    fetch(targetLink, myInit).then(function(response){
        if(action !== "load"){
            singleFetch("load","");
        }    
        response.json().then(function(books){
                if(action==="load"){
                    addBooksToHtml(books);
                }
            }).catch(function(){
            });
        }).catch(function(){
        });      
    
}

//Funkcje
function eventClick(event){
    var deleteLinks = $(".delete");
    $.each(deleteLinks,function(key,value){
        if(event.target === value){
            event.preventDefault();
            singleFetch("delete",event.target);
        }
    });
    var submitButton = $('#submit');
    var form = $("form");
    $.each(submitButton,function(key,value){
        if(event.target === value){
            event.preventDefault();
            singleFetch("add",form[0]);
        }
    });
}

function addBooksToHtml(books){
    while(dataContainer.firstChild){
        dataContainer.removeChild(dataContainer.firstChild);
    }
    books.forEach(function(book){
        var author = book.author;
        var title = book.title;
        var isbn = book.isbn;
        var publisher = book.publisher;
        var bookId = book.id;
        //var link = '<button class="delete" name="Usuń" value="'+bookId+'">';
        var link = '<a href="" class="delete" value="'+bookId+'">Usuń<a>';
        var newElement = $('<tr><td>'+title+'</td><td>'+author+'</td><td>'+isbn+'</td><td>'+publisher+'</td><td>'+link+'</td></tr>');
        //console.log(newElement);

        dataContainer.append(newElement[0]);
    });
}
