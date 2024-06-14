const express = require("express");
var bodyParser = require("body-parser");

//Database
const database = require("./database");

//initialize express
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());


/*
Route        /
Description  Get all the books
Acces        Public
Parameter    NONE
Methods      GET
*/
booky.get("/",(req,res) => {
return res.json({books:database.books});
});

/*
Route        /is
Description  Get specific book on ISBN
Acces        Public
Parameter    isbn
Methods      GET
*/
booky.get("/is/:isbn",(req,res) =>{
const getSpecificBook = database.books.filter(
    (book) =>book.ISBN === req.params.isbn
);

if(getSpecificBook.lenght === 0) {
    return res.json({error: `No Book FOund for the ISBN ${req.params.isbn}`});
}

return res.json ({book: getSpecificBook});
});

/*
Route        /c
Description  Get specific book on catagory
Acces        Public
Parameter    catagory
Methods      GET
*/
booky.get("/c/:catagory", (req,res) =>{
const getSpecificBook = database.books.filter(
    (book) => book.catagory.includes(req.params.catagory)
)

if(getSpecificBook.lenght===0){
    return res.json({error: `No book found for the catagory of ${req.params.catagory}`})
}
return res.json({book : getSpecificBook});
});

/*
Route        /Author
Description  Get all author
Acces        Public
Parameter    None
Methods      GET
*/
booky.get("/author", (req,res) => {
 return res.jsonp({author: database.author});
});

booky.get("/author/book/:isbn", (req,res) => {
const getSpecificAuthor = database.author.filter(
    (author) => author.books.includes(req.params.isbn)
);
if(getSpecificAuthor.lenght === 0 ){
    return res.json ({
        error: `no auhtor found for the book of ${re.params.isbn}`
    });
}
return res.json({author: getSpecificAuthor});
});

/*
Route        /publications
Description  Get all publications
Acces        Public
Parameter    none
Methods      GET
*/
booky.get("/publication", (req,res) =>{
    return res.json({publication: database.publication});
});

//POST
/*
Route        /book/new
Description  Add new bookd
Acces        Public
Parameter    none
Methods      POST
*/
booky.post("/book/new", (req,res) =>{
  const newBook = req.body;
  database.books.push(newBook);
  return res.json({updatedBooks: database.books});
});

/*
Route        /auhtor/new
Description  Add new authors
Acces        Public
Parameter    none
Methods      POST
*/
booky.post("/author/new", (req,res) => {
const newAuthor = req.body;
database.author.push(newAuthor);
return res.json(database.author);
});

/*
Route        /auhtor/new
Description  Add new authors
Acces        Public
Parameter    none
Methods      POST
*/
booky.post("/publication/new", (req,res) => {
    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json(database.publication);
});

/*
Route        /publication/update/book
Description  Add new Publication
Acces        Public
Parameter    isbn
Methods      PUT
*/
booky.put("/publication/update/book/:isbn",(req,res)=> {
     //update the publication database
     database.publication.forEach((pub) => {
          if(pub.id === req.body.pubId){
            return pub.books.push(req.params.isbn);
          }
     });
     //update the book database
     database.books.forEach((book) => {
if(book.ISBN === req.params.isbn) {
    book.publications = req.body.pubId;
    return;
}
     });
     return res.json ( {
        books : database.books,
        publications: database.publication,
        message: "successfully updated publicartions"
     });
});

/*
Route        /book/delete
Description  delete a book
Acces        Public
Parameter    isbn
Methods      DELETE
*/
booky.delete("/book/delete/:isbn", (req,res) => {
      //whichever book that doesnot match with the isbn, just send it to an updatedBookDatabase
      //rest will be filtered out

      const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
      )
      database.books = updatedBookDatabase;
return res.json({books: database.books});
});

/*
Route        /book/delete/author
Description  delete an author from a book and vice verse
Acces        Public
Parameter    isbn, authorId
Methods      DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId" , (req,res) => {
//update the book database
database.books.forEach((book) => {
if(book.ISBN === req.params.isbn) {
    const newAuthorList = book.author.filter(
        (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
    );
    book.author = newAuthorList;
    return;
}
});

//update the author database
database.author.forEach((eachAuthor) => {
  if(eachAuthor.id === parseInt(req.params.authorId)) {
    const newBookList = eachAuthor.books.filter(
        (book) => book !== req.params.isbn
    );
    eachAuthor.books = newBookList;
    return;
  }
});

return res.json ( {
    book : database.books,
    author: database.author,
    message: "Author was deleted!!!!"
});
});


booky.listen(3000,() => {
console.log("server is up and running");
});