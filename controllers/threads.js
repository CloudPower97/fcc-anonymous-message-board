exports.getThreads = ({ db, params: { boardName: name } }, res) => {
  const Board = db.import('../models/board.js')
  const Reply = db.import('../models/reply.js')

  Board.findOne({
    where: {
      name,
    },
  })
    .then(board => {
      if (!board) {
        res.sendStatus(404)
      } else {
        board
          .getThreads({
            limit: 10,
            order: [['updatedAt', 'DESC']],
            attributes: {
              exclude: ['reported', 'delete_password'],
            },
            include: [
              {
                model: Reply,
                separate: true,
                limit: 3,
                order: [['updatedAt', 'DESC']],
                attributes: {
                  exclude: ['reported', 'delete_password'],
                },
              },
            ],
          })
          .then(threads => {
            res.json(threads)
          })
          .catch(error => {
            res.status(400).json({
              error,
            })
          })
      }
    })
    .catch(error => {
      res.status(400).json({
        error,
      })
    })
}

exports.createThread = ({ db, body, params: { boardName: name } }, res) => {
  const Board = db.import('../models/board.js')
  const Thread = db.import('../models/thread.js')

  Board.findOne({
    where: {
      name,
    },
  })
    .then(board => {
      if (!board) {
        res.sendStatus(404)
      } else {
        Thread.create(body)
          .then(thread => {
            board
              .addThread(thread)
              .then(() => {
                res.status(201).json(thread)
              })
              .catch(error => {
                res.status(400).json({ error })
              })
          })
          .catch(error => {
            res.status(400).json(error)
          })
      }
    })
    .catch(error => {
      res.status(400).json(error)
    })
}

exports.reportThread = ({ db, body: { thread_id: id } }, res) => {
  const Thread = db.import('../models/thread.js')

  Thread.findByPk(id)
    .then(thread => {
      if (!thread) {
        res.sendStatus(404)
      } else {
        thread
          .update({
            reported: true,
          })
          .then(() => {
            res.json({
              message: 'Success',
            })
          })
          .catch(error => {
            res.status(400).json({ error })
          })
      }
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}

exports.deleteThread = ({ db, body: { thread_id: id, delete_password: password } }, res) => {
  const Thread = db.import('../models/thread.js')

  Thread.findByPk(id)
    .then(thread => {
      if (!thread) {
        res.sendStatus(404)
      } else {
        thread.comparePassword(password).then(equal => {
          if (!equal) {
            res.status(401).json({ error: 'Incorrect password' })
          } else {
            thread
              .destroy()
              .then(() => {
                res.json({
                  message: 'Success',
                })
              })
              .catch(error => {
                res.status(400).json({ error })
              })
          }
        })
      }
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}
