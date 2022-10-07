const express = require('express')
const fs = require('fs')

const { fullValidator } = require('./lib')

// Data Scheme of articles

// id (sequecielle)
// title
// author
// date
// content

const articleValidator = {
    title: "string",
    author: "string",
    content: "string"
}

//  Init express app 

const app = express()

// Endpoints

// GET /articles 
// GET /article/:id
// POST /article
// DELETE /article
// PUT /article

// Create routes handles

const articles = require("./storage/articles.json")

app.get('/articles', (req, res) => {
    try {
        res.send(articles)
    } catch (error) {
        res.writeHead(500)
        res.end("Error while fetching data, please try again later")
    }
})

// Listning on port

const PORT  = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running at port ${PORT}...`))

