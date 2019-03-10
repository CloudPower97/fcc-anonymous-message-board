const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const server = require('../index')

chai.use(chaiHttp)

suite('Functional Tests', function() {
  suite('API ROUTING FOR /api/threads/:board', function() {
    suite('POST', function() {})

    suite('GET', function() {})

    suite('DELETE', function() {})

    suite('PUT', function() {})
  })

  suite('API ROUTING FOR /api/replies/:board', function() {
    suite('POST', function() {})

    suite('GET', function() {})

    suite('PUT', function() {})

    suite('DELETE', function() {})
  })
})
