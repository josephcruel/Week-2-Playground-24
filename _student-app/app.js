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