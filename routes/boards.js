const express = require('express')
const router = express.Router()

const {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} = require('../controllers/boards')

router.get('/', getBoards)

router.post('/', createBoard)

router.get('/:boardName', getBoard)

router.patch('/:boardName', updateBoard)

router.delete('/:boardName', deleteBoard)

module.exports = router
