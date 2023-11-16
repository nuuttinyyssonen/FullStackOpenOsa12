const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { setAsync, getAsync } = require('../redis/index');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const allTodos = await Todo.find({});
  res.send(todo);
  await setAsync("added_todos", allTodos.length)
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
router.put('/:id', async (req, res) => {
  req.todo.text = req.body.text
  await req.todo.save()
  res.send(req.todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
