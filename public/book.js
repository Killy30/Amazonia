class ServisBook {

    async getBook(){
        const res = await fetch('/books');
        const books = await res.json()
        return books
    }
    
    deleteBook(id){
        console.log(id);
        fetch('/delete/'+id,{
           method: 'DELETE',
           body: id
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            this.getBook()
        })
    }

    async listToBuy(id){
        const res = await fetch('/addToList/'+id)
        const book = await res.json();

        const ui = new UI()
        ui.addTolist(book)
        return book
    }
}

const theBooks = new ServisBook()
const arrayBookList = []

class UI{
    async addBooks(){

        const divBooks = document.getElementById('books')
        const book = await theBooks.getBook()
        divBooks.innerHTML = '';
        
        book.forEach(element => {
            divBooks.className='row '
            divBooks.innerHTML += `
            <div class="col-md-6">
                <div class="card text-center mb-4 ">
                    <div class="card-header">
                        <h2>${element.titulo}</h2>
                        <a class="btn btn-danger delete" data-id="${element._id}" href="/delete/${element._id}">Delete</a>
                        <a class="btn btn-info buy" data-id="${element._id}" href="/addToList/${element._id}">Add To Car</a>
                    </div>
                    <div class="card-body">
                        <p>${element.descripcion}</p>
                        <p>${element.isbn}</p>

                    </div>
                    <div class="card-footer">
                        <h4>${element.autor}</h4>
                    </div>
                </div>
            </div>
            `
        });
    }

    async addSearchBook(){
        const books = await theBooks.getBook()
        const divBooks = document.getElementById('books')
        const textSearch = document.getElementById('textSearch')
        const text = textSearch.value.toLocaleLowerCase();

        divBooks.innerHTML = ''

        books.forEach(element => {
            const autor = element.autor.toLocaleLowerCase()
            
            if(autor.indexOf(text) !== -1){
                
                divBooks.innerHTML += `
                <div class="col-md-6">
                    <div class="card text-center mb-4 ">
                        <div class="card-header">
                            <h2>${element.titulo}</h2>
                            <a class="btn btn-danger delete" data-id="${element._id}" href="/delete/${element._id}">Delete</a>
                            <a class="btn btn-info buy" data-id="${element._id}" href="/addToList/${element._id}">Add to car</a>
                        </div>
                        <div class="card-body">
                            <p>${element.descripcion}</p>
                            <p>${element.isbn}</p>

                        </div>
                        <div class="card-footer">
                            <h4>${element.autor}</h4>
                        </div>
                    </div>
                </div>
                `
            }
        })
        if(divBooks.innerHTML === ''){
            divBooks.innerHTML += '<div class="card p-2" ><p class="text-danger">Autor no encontrado...</p></div>'
        }
    }

    addDeleteBook(){
        
    }

    async addTolist(book){

        console.log(book);
        const books = {
            book: book
        }
        arrayBookList.push(books)

        localStorage.setItem('books', JSON.stringify(arrayBookList))
    }
}


const divBooks = document.getElementById('books')
const textSearch = document.getElementById('textSearch')

divBooks.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')){
        e.preventDefault();
        const id = e.target.dataset.id
        const servisBook = new ServisBook()
        servisBook.deleteBook(id)
    }else if(e.target.classList.contains('buy')){
        e.preventDefault();
        const id = e.target.dataset.id
        const servisBook = new ServisBook()
        servisBook.listToBuy(id)
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.addBooks()
})

btnSearch.addEventListener('click', (e) =>{
    const ui = new UI();
    ui.addSearchBook()
})

textSearch.addEventListener('keyup', (e) =>{
    const ui = new UI();
    ui.addSearchBook()
})


