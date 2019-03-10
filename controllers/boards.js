exports.getBoards = ({ db }, res) => {
  const Board = db.import('../models/board.js')

  Board.findAll()
    .then(boards => {
      res.json(boards)
    })
    .catch(error => {
      res.status(400).json({
        error,
      })
    })
}

exports.getBoard = ({ db, params: { boardName: name } }, res) => {
  const Board = db.import('../models/board.js')

  Board.findOne({
    where: {
      name,
    },
  })
    .then(board => {
      if (!board) {
        res.sendStatus(404)
      } else {
        res.json(board)
      }
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}

exports.createBoard = ({ db, body }, res) => {
  const Board = db.import('../models/board')

  Board.create(body)
    .then(board => {
      res.status(201).json(board)
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}

exports.updateBoard = ({ db, body, params: { boardName: name } }, res) => {
  const Board = db.import('../models/board.js')

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
          .update(body)
          .then(board => {
            res.json(board)
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

exports.deleteBoard = ({ db, params: { boardName: name } }, res) => {
  const Board = db.import('../models/board.js')

  Board.destroy({
    where: {
      name,
    },
  })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.status(400).json(error)
    })
}
