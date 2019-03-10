const express = require('express')
const router = express.Router()

const { getThreads, createThread, reportThread, deleteThread } = require('../controllers/threads')

router.get('/:boardName', getThreads)
router.post('/:boardName', createThread)
router.put('/:boardName', reportThread)
router.delete('/:boardName', deleteThread)

module.exports = router
