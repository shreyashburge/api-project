const books = [
    {
        ISBN: "12345Book",
        title: "Tesla!!!",
        pubDate: "2021-08-05",
        language: "en",
        numPage: 250,
        author: [1, 2],
        publication: [1],
        catagory: ["tech", "space", "education"]
    }
]

const author = [
    {
        id: 1,
        name: "Shreyash",
        books: ["12345Book", "secretBook"]
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book"]
    }
]

const publication = [
    {
        id: 1,
        name: "writex",
        books: ["12345Book"]
    }
]

module.exports = {books,author,publication};