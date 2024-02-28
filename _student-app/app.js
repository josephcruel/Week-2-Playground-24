// Requires 
const http = require("http")
const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")


// Init express as an application
const app = express()

// Define Entries as global array or storage 
const entries = []
app.locals.entries = entries 

// Set the current directory to be the views directory
app.set("views", path.resolve(__dirname, "views"))

// Define the render as ejs
app.set("view engine", "ejs")

// Body parser to automatically to set the html header type.
// Arguments ignore encoding the url extension
app.use(bodyParser.urlencoded({extended: false}))

// Renders the index.ejs file.
app.get("/", (req, res) => {
    res.render("index")
})

//if my url is /new-entry
app.get("/new-entry", (req, res) => {
    res.render("new-entry")
})

// if url is host:port/new-entry
app.post("/new-entry", (req, res) => {
    // if request body has no title or body tag, respond with status
    if(!req.body.title || !req.body.body) {
        //respond 400 bad request and send a plain test message
        res.status(400).send("Entries must have a title and an information body. Please provide that!")
        //exit handler
        return
    }
    // push new entry to that entries array 
    entries.push({
        title: req.body.title,
        body: req.body.body,
        publish: new Date()
    })
    res.redirect("/")
})

app.use((req, res) => {
    //return 404
    res.status(400).render("404")
})

// Create a server on port 3000 
http.createServer(app).listen(3000, () => {
    console.log("running on port 3000")
})