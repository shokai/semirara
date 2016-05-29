/* eslint-env mocha */

import {server} from '../'
import supertest from 'supertest'
import {assert} from 'chai'

describe('Semirara App', function () {
  const agent = supertest(server)

  it('redirect index to /general/hello', async function () {
    const res = await agent
            .get('/')
            .expect(302)
            .expect('Content-Type', /text/)
    assert.equal(res.header.location, '/general/hello')
    return res
  })
})
