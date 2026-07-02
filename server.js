const express = require("express");

const app = express();

app.use(express.json());

let books = [
    {
        id:1,
        title:"Harry Potter",
        author:"J.K Rowling"
    },
    {
        id:2,
        title:"Atomic Habits",
        author:"James Clear"
    }
];

// GET
app.get("/books",(req,res)=>{
    res.json(books);
});

// POST
app.post("/books",(req,res)=>{

    const newBook={
        id:books.length+1,
        title:req.body.title,
        author:req.body.author
    };

    books.push(newBook);

    res.status(201).json(newBook);

});

// PUT
app.put("/books/:id",(req,res)=>{

    const id=parseInt(req.params.id);

    const book=books.find(b=>b.id===id);

    if(!book){
        return res.status(404).json({
            message:"Book not found"
        });
    }

    book.title=req.body.title;
    book.author=req.body.author;

    res.json(book);

});

// DELETE
app.delete("/books/:id",(req,res)=>{

    const id=parseInt(req.params.id);

    books=books.filter(book=>book.id!==id);

    res.json({
        message:"Book Deleted"
    });

});

app.listen(3000,()=>{

    console.log("Server Running on http://localhost:3000");

});