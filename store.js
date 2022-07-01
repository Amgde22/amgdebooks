const store = window.localStorage


if(!store.allBooks){
  console.log("no books bfff");
  store.allBooks = "[]"
  store.booksIds = "1"
}
 




function storeBook(bookObject){
  let allBooks = JSON.parse(store.allBooks)

  let book = {
    title : bookObject.title ,
    author : bookObject.author ,
    totalPages : bookObject.totalpages, 
    readPages : bookObject.readpages ,
    color : bookObject.color ,

    id : bookObject.bookId
  }
  allBooks.push(book)

  store.allBooks = JSON.stringify(allBooks)

  console.log(JSON.parse(store.allBooks));
}

// store.clear()
