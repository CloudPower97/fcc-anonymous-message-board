const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const server = require('../index')

chai.use(chaiHttp)

suite('Functional Tests', function() {
  suite('API ROUTING FOR /api/threads/:board', () => {
    const delete_password = '1234'
    let thread_id

    suite('GET', () => {
      test('List recent threads', done => {
        chai
          .request(server)
          .get('/api/threads/general')
          .end((err, { status, body }) => {
            assert.equal(status, 200)
            assert.isArray(body)
            assert.containsAllKeys(body[0], [
              'id',
              'text',
              'createdAt',
              'updatedAt',
              'BoardId',
              'Replies',
            ])
            assert.isArray(body[0].Replies)
            done()
          })
      })
    })

    suite('POST', () => {
      test('Create thread', done => {
        chai
          .request(server)
          .post('/api/threads/general')
          .set('content-type', 'application/json')
          .send({ text: 'Example test', delete_password })
          .end((err, { status, body }) => {
            thread_id = body.id

            assert.equal(status, 201)

            assert.containsAllKeys(body, ['id', 'text', 'createdAt', 'updatedAt'])
            done()
          })
      })
    })

    suite('PUT', () => {
      test('Report thread', done => {
        chai
          .request(server)
          .put('/api/threads/general')
          .set('content-type', 'application/json')
          .send({ thread_id })
          .end((err, { status, body }) => {
            assert.equal(status, 200)
            assert.equal(body.message, 'Success')
            done()
          })
      })
    })

    suite('DELETE', () => {
      test('Delete thread with password', done => {
        chai
          .request(server)
          .delete('/api/threads/general')
          .set('content-type', 'application/json')
          .send({ thread_id, delete_password })
          .end((err, { status, body }) => {
            assert.equal(status, 200)
            assert.equal(body.message, 'Success')
            done()
          })
      })
    })
  })

  suite('API ROUTING FOR /api/replies/:board', () => {
    const delete_password = '1234'
    let reply_id

    suite('GET', () => {
      test('Show all replies on thread', done => {
        chai
          .request(server)
          .get('/api/replies/general')
          .query({ thread_id: 1 })
          .end((err, { status, body }) => {
            assert.equal(status, 200)

            assert.isArray(body)
            done()
          })
      })
    })

    suite('POST', () => {
      test('Create reply on thread', done => {
        chai
          .request(server)
          .post('/api/replies/general')
          .set('content-type', 'application/json')
          .send({ thread_id: 1, text: 'Example reply', delete_password })
          .end((err, { status, body }) => {
            reply_id = body.id

            assert.equal(status, 201)
            assert.containsAllKeys(body, ['id', 'text', 'createdAt', 'updatedAt'])

            done()
          })
      })
    })

    suite('PUT', () => {
      test('Report reply on thread', done => {
        chai
          .request(server)
          .put('/api/replies/general')
          .set('content-type', 'application/json')
          .send({ reply_id, delete_password })
          .end((err, { status, body }) => {
            assert.equal(status, 200)
            assert.equal(body.reported, true)

            done()
          })
      })
    })

    suite('DELETE', () => {
      test('Change reply to `[deleted]` on thread', done => {
        chai
          .request(server)
          .delete('/api/replies/general')
          .set('content-type', 'application/json')
          .send({ reply_id, delete_password })
          .end((err, { status, body }) => {
            assert.equal(status, 200)
            assert.equal(body.message, 'Success')

            done()
          })
      })
    })
  })
})
