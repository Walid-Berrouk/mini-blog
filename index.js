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

app.get('/article/:id', (req, res) => {
    const { id } = req.params
    try {
        res.send(articles.find(article => article.id == id))
    } catch (error) {
        res.writeHead(500)
        res.end("Error while fetching data, please try again later")
    }
})

app.post('/article', (req, res) => {
    const article = req.query;

    if (!fullValidator(article, articleValidator)) {
        res.writeHead(500)
        res.end("Incorrect Data")
        return
    }

    try {

        // Solution 1
        const lastId =  articles.reduce((a, b) => a.id > b.id? a: b).id

        // Solution 2
        // let lastId;
        // const maxId =  articles.reduce((a, b) => a.id > b.id? a: b).id
        // for (let index = 0; index <= maxId + 1; index++) {
        //     let check = true
        //     articles.forEach(article => {
        //         if (!check && (article.id === index)) {
        //             check = false
        //         }
        //     })
        //     if (check) {
        //         lastId = index
        //         break;
        //     }
        // }

        let newArticles = [...articles, {
            id: lastId + 1,
            date: new Date(),
            ...article
        }]

        fs.writeFileSync("storage/articles.json", JSON.stringify(newArticles))

        res.send("Article Added !")



    } catch (error) {
        res.writeHead(500)
        res.end(error.message)
    }

})

app.delete('/article', (req, res) => {
    try {
        const { id } = req.query;

        let newArticles = articles.filter(article => article.id !== parseInt(id))

        if (newArticles.length === articles.length) {
            throw new Error("Article Not Found !")
        }
        else {
            fs.writeFileSync("storage/articles.json", JSON.stringify(newArticles))
            res.end("Article Deleted")
        }

    } catch (error) {
        res.writeHead(500)
        res.end(error.message)
    }
})

// Listning on port

const PORT  = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running at port ${PORT}...`))

