exports.getReplies = ({ db, query: { thread_id: id } }, res) => {
  const Thread = db.import('../models/thread.js')

  Thread.findByPk(id)
    .then(thread => {
      if (!thread) {
        res.sendStatus(404)
      } else {
        thread
          .getReplies({
            attributes: {
              exclude: ['delete_password', 'ThreadId'],
            },
          })
          .then(replies => {
            res.json(replies)
          })
          .catch(error => {
            res.status(400).json({ error })
          })
      }
    })
    .catch(error => {
      res.status(400).josn({ error })
    })
}

exports.createReply = ({ db, body }, res) => {
  const Thread = db.import('../models/thread.js')
  const Reply = db.import('../models/reply.js')

  Thread.findByPk(body.thread_id)
    .then(thread => {
      if (!thread) {
        res.sendStatus(404)
      } else {
        delete body.thread_id

        Reply.create(body)
          .then(reply => {
            thread
              .addReplies(reply)
              .then(() => {
                res.status(201).json({
                  id: reply.id,
                  text: reply.text,
                  createdAt: reply.createdAt,
                  updatedAt: reply.updatedAt,
                })
              })
              .catch(error => {
                res.status(400).json(error)
              })
          })
          .catch(error => {
            res.status(400).json({ error })
          })
      }
    })
    .catch(error => {
      res.status(400).json(error)
    })
}

exports.reportReply = ({ db, body: { reply_id: id } }, res) => {
  const Reply = db.import('../models/reply.js')

  Reply.findByPk(id).then(reply => {
    if (!reply) {
      res.sendStatus(404)
    } else {
      reply
        .update({ reported: true })
        .then(reply => {
          res.json(reply)
        })
        .catch(error => {
          res.status(400).json(error)
        })
    }
  })
}

exports.deleteReply = ({ db, body: { reply_id: id, delete_password: password } }, res) => {
  const Reply = db.import('../models/reply.js')

  Reply.findByPk(id).then(reply => {
    if (!reply) {
      res.sendStatus(404)
    } else {
      reply.comparePassword(password).then(equal => {
        if (!equal) {
          res.status(401).json({
            error: 'Incorrect password',
          })
        } else {
          reply
            .update({ text: '[deleted]' })
            .then(() => {
              res.json({ message: 'Success' })
            })
            .catch(error => {
              res.status(400).json(error)
            })
        }
      })
    }
  })
}
