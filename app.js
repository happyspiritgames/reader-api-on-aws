const express = require('express');
const cors = require('cors');
const admin = require('./controllers/adminController')
const library = require('./controllers/libraryController')
const reader = require('./controllers/readerController')

const app = express()
app.use(cors())

app.get('/ping', admin.ping)
app.get('/stories', library.searchStories)
app.get('/stories/:editionKey', reader.getStoryEdition)
app.get('/stories/:editionKey/scenes/:sceneId', reader.getEditionScene)

module.exports = app
