const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'member',
    password: 'kiansantang',
    port: 5432
})
const uuid = function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

const getUsers = (req, res) => {
    pool.query('SELECT first_name, last_name, phone, username FROM users ORDER BY first_name ASC', (err, result) => {
        if (err) throw err
        res.json(result.rows)
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT first_name, last_name, phone, username FROM users WHERE id = $1', [id], (err, result) => {
        if (err) throw err
        res.json(result.rows)
    })
}

const createUser = (req, res) => {
    const { first_name, last_name, phone, username, password } = req.body

    pool.query('INSERT INTO users (id, first_name, last_name, phone, username, password) VALUES ($1, $2, $3, $4, $5, $6)', 
    [uuid, first_name, last_name, phone, username, password], err => {
        if (err) throw err
        res.status(204)
    })
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const { first_name, last_name, phone } = req.body

    pool.query('UPDATE users SET first_name = $1, last_name = $2, phone = $3 WHERE id = $4', 
    [first_name, last_name, phone, id], (err, result) => {
        if (err) throw err
        res.json(result.rows)
    })
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], err => {
        if (err) throw err
        res.status(204)
    })
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser}