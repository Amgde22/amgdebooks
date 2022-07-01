// dom consts
const dialogPopup = document.querySelector(".book-form")
const booksContainer = document.querySelector(".books-container")
const form = document.querySelector("#add-book-form")
const newBooktemplate = document.querySelector("#booktemplate")
const openDialogBtnTemplate = document.querySelector("#open-dialog-button-template")

const readPagesField = document.querySelector("#new-book-pages-read")
const coverColorField = document.querySelector("#cover-color")

const newbookTitle = document.querySelector("#new-book-name")
const newbookAuthor = document.querySelector("#new-book-author")
const newbookPages = document.querySelector("#new-book-pages")


const addBookBtn = document.querySelector(".add-book")
let openDialogBtn = openDialogBtnTemplate.content.firstElementChild.cloneNode(true)

// selected Book
let selectedBook ;

// update book
const updateBookBtn = document.querySelector(".update-book-btn")




// openDialogBtn.addEventListener("click" , openDialog)
function openDialog(e) {
  dialogPopup.showModal()
}

addBookBtn.addEventListener("click" , addBook) 

function addBook(storeCalled) {



//check validity
if(!newbookTitle.checkValidity() || !newbookAuthor.checkValidity() || !newbookPages.checkValidity()){return}





const newbook = newBooktemplate.content.cloneNode(true)
.children[0]

newbook.title = newbookTitle.value 
newbook.author = newbookAuthor.value 
newbook.totalpages = parseInt(newbookPages.value)  


let title = document.createElement("p")
title.classList.add('book-title')
title.textContent = newbookTitle.value

let author = document.createElement("p")
author.classList.add('book-author')
author.textContent = `by ${newbookAuthor.value}`

 // books read pages
 
 let pages = document.createElement("p")
 pages.classList.add("book-pages")

 newbook.readpages = 0

if(readPagesField.value){

  if(parseInt(readPagesField.value) > parseInt(newbookPages.value)  ){
    
    readPagesField.setCustomValidity("The pages you already read must be LESS then the total amount of pages")
    return
  }
  if(parseInt(readPagesField.value) < 0){ 
    readPagesField.setCustomValidity("read pages must be more then 0")
    return
  }

  newbook.readpages = parseInt(readPagesField.value)
let readpages = document.createElement("p")
readpages.classList.add("book-read-pages")
readpages.innerText =  parseInt(readPagesField.value)
pages.appendChild(readpages)
}

let totalpages = document.createElement("p")
totalpages.classList.add("book-total-pages")
totalpages.textContent = parseInt(newbookPages.value)
pages.appendChild(totalpages)


newbook.appendChild(title)
newbook.appendChild(author)
newbook.appendChild(pages)
//book cover color
newbook.color = "#0e74a0"
if(coverColorField.value){
  newbook.style.backgroundColor = coverColorField.value
  newbook.color = coverColorField.value

}

// Editing event listener

newbook.addEventListener("click" , selectBook)

if(typeof( storeCalled) === "object"){
  newbook.bookId = parseInt(JSON.parse(store.booksIds))
  store.booksIds = JSON.stringify(newbook.bookId + 1)
  storeBook(newbook)}
else{
newbook.bookId = storeCalled
}

booksContainer.insertBefore(newbook , openDialogBtn )








// remove then add open dialog button
// document.querySelector(".open-dialog-button-div").remove()
// booksContainer.appendChild(openDialogBtn)




dialogPopup.close()
form.reset()
infoupdate()
}

const numberOfBooksDisplay = document.querySelector("#number-of-books")
function infoupdate() {
  let numberOfBooks = document.querySelectorAll(".book")
  numberOfBooksDisplay.textContent = numberOfBooks.length.toString()
  
}

function closeDialog() {
  dialogPopup.close()
  form.reset()
}

booksContainer.appendChild(openDialogBtn)


function addPreviousBooks(){
  let allBooks = JSON.parse(store.allBooks)
  allBooks.forEach(book => {
    newbookTitle.value = book.title
    newbookAuthor.value = book.author
    newbookPages.value = book.totalPages
    readPagesField.value = book.readPages?book.readPages : "" ,
    coverColorField.value = book.color

    addBook(book.id)

  })
}
addPreviousBooks()

// new stuff
const newTitle = document.querySelector(".title")
const newAuthor = document.querySelector(".author")
const newTotalPages = document.querySelector(".totalPages")
const newReadPages = document.querySelector(".readPages")
const newColor = document.querySelector(".color")


function selectBook(e) {
  selectedBook = e.target
  if(e.target.classList.value !== "book") {
    e.target.parentElement.click()
    return}

  let settingsDiv = document.querySelector(".settings")
    if(!settingsDiv.style.display){
      settingsDiv.style.display = "block"
    }
  
  document.querySelector(".title").value = selectedBook.title
  document.querySelector(".author").value = selectedBook.author
  document.querySelector(".readPages").value = selectedBook.readpages
  document.querySelector(".totalPages").value = selectedBook.totalpages
  document.querySelector(".color").value = selectedBook.color
}


updateBookBtn.addEventListener("click" , updateBook)

function updateBook(e){
  const allBooks = JSON.parse(store.allBooks)
  console.log(selectedBook.bookId);
  const bookObjIndex = allBooks.findIndex(bok => parseInt(bok.id) === parseInt(selectedBook.bookId))
    console.log(bookObjIndex , allBooks[bookObjIndex])
  const bookObj = allBooks[bookObjIndex]
//update store
if(newTitle.value ){
selectedBook.querySelector(".book-title").innerText = newTitle.value
bookObj.title = newTitle.value
}
if(newAuthor.value ){
selectedBook.querySelector(".book-author").innerText = newAuthor.value
bookObj.author = newAuthor.value
}
if(newReadPages.value && selectedBook.querySelector(".book-read-pages")){
selectedBook.querySelector(".book-read-pages").innerText = newReadPages.value
bookObj.readPages = newReadPages.value
}
if(newTotalPages.value ){
selectedBook.querySelector(".book-total-pages").innerText = newTotalPages.value
bookObj.totalPages = newTotalPages.value
}
if(newColor.value ){
  selectedBook.style.backgroundColor = newColor.value
bookObj.color = newColor.value
}
  
store.allBooks = JSON.stringify(allBooks)

// update visual
}


// Book Deletion
const showDeleteBookDialog = document.querySelector(".trashcan")
const deleteBookDialog = document.querySelector(".delete-dialog")
showDeleteBookDialog.onclick = () => {deleteBookDialog.showModal()}

const deleteBookBtn = document.querySelector(".deleteBook")
deleteBookBtn.onclick = deleteBook

const cancelDeletion = document.querySelector(".cancelDeletion")
cancelDeletion.onclick = () => {deleteBookDialog.close()}

function deleteBook(){
  const id = selectedBook.bookId
  const allBooks = JSON.parse(store.allBooks)
  for(let i = 0 ; i<allBooks.length ;i++){
    if(allBooks[i].id === id){
      allBooks.splice(i,1)
      selectedBook.remove()
      store.allBooks = JSON.stringify(allBooks)
    }

  }
  deleteBookDialog.close()

}