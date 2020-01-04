
class Book {
    getbook(){
        const book = JSON.parse(localStorage.getItem("books"))
        const divBooks = document.getElementById('books')
        
        book.forEach(element => {
            divBooks.className='row '
            divBooks.innerHTML += `
            <div class="col-md-6">
                <div class="card text-center mb-4 ">
                    <div class="card-header">
                        <h2>${element.book.titulo}</h2>
                        <a class="btn btn-danger delete" data-id="${element.book._id}" href="/delete/${element.book._id}">Delete</a>
                        <a class="btn btn-info quitToList" data-id="${element.book._id}" href="/deleteToList/${element.book._id}">Quit To List</a>
                    </div>
                    <div class="card-body">
                        <p>${element.book.descripcion}</p>
                        <p>${element.book.isbn}</p>

                    </div>
                    <div class="card-footer">
                        <h4>${element.book.autor}</h4>
                    </div>
                </div>
            </div>
            `
        });
    }

    quitToList(id){
        const book = JSON.parse(localStorage.getItem("books"))

        book.forEach((element, i) => {
            if(element.book._id == id){
                console.log(element.book.titulo, i);
                
            }
        })
    }
}



const divBooks = document.getElementById('books')

const book = new Book()
document.addEventListener('DOMContentLoaded', () => {
    book.getbook()
    
})

divBooks.addEventListener('click', (e) => {
    if(e.target.classList.contains('quitToList')){
        e.preventDefault();
        const id = e.target.dataset.id
        book.quitToList(id)
    }
})


