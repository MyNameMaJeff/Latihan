const express = require('express')
const bodyParser = require('body-parser')
const db = require ('./queries')
const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({ extended: true })
)

app.get('/', (req, res) => {
    res.json({ info: 'CRUD api' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('users/create', db.createUser)
app.put('/users/update/:id', db.updateUser)
app.delete('users/delete/id:', db.deleteUser)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})