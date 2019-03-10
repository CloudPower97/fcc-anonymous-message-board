const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const db = require('./models').sequelize

db.authenticate()
  .then(() => {
    const { PORT } = process.env

    const boardsRouter = require('./routes/boards')
    const threadsRouter = require('./routes/threads')
    const repliesRouter = require('./routes/replies')

    module.exports = express()
      .use(helmet())
      .use(cors())
      .use(express.json())
      .use(
        express.urlencoded({
          extended: false,
        })
      )
      .use((req, res, next) => {
        req.db = db
        next()
      })
      .use('/api/boards', boardsRouter)
      .use('/api/threads', threadsRouter)
      .use('/api/replies', repliesRouter)
      .listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
      })
  })
  .catch(err => {
    console.error('Unable to connect to the database: ', err)
  })
