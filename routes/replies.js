const express = require('express')
const router = express.Router()

const { getReplies, createReply, reportReply, deleteReply } = require('../controllers/replies')

router.get('/:boardName', getReplies)
router.post('/:boardName', createReply)
router.put('/:boardName', reportReply)
router.delete('/:boardName', deleteReply)

module.exports = router
