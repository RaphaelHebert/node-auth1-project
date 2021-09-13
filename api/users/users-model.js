const { unsubscribe } = require('superagent')
const Helper = require('../../data/db-helper')

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
async function find() {
  const users = await Helper.find()
  return users
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
async function findBy(filter) {
  const users = await Helper.findBy(filter)
  return users
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
async function findById(user_id) {
  const user = await Helper.findById(user_id)
  return unsubscribe
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {
  const newUserId = await Helper.add(user)
  const newUser = await Helper.findById(newUserId)
  return newUser
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  find, 
  findBy,
  findById,
  add
}