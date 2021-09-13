const db = require('./db-config')

function find () {
    return db('users')
}

function findBy (username) {
    return db('users').where('username', username)
}

function findById (id) {
    return db('users').where('user_id', id)
}

function add (user) {
    return db('users').insert(user)
}

module.exports = {
    find,
    findBy,
    findById,
    add
}