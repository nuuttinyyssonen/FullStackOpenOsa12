const express = require('express');
const { getAsync, setAsync } = require('../redis/index');
const router = express.Router();
const { Todo } = require('../mongo');

router.get('/', async(req, res) => {
    const todos = await getAsync("added_todos")
    res.send({"added_todos": todos});
})

module.exports = router;