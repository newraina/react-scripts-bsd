
import { toCamelcase } from 'object-keys-mapping'
import nprogress from 'nprogress'
import Fetch from 'fetch.io'

import {
  apiPrefix
} from 'config'

export const request = new Fetch({
  prefix: apiPrefix,
  
  beforeRequest() {
    nprogress.start()
  },
  
  afterResponse() {
    if (nprogress.isStarted()) {
      nprogress.done()
    }
  },
  
  afterJSON(body) {
    const { msg, description } = body
    if (msg !== 'success') {
      throw new Error(msg)
    }
  }
})

/**
 * no progress
 */
export const request2 = new Fetch({
  prefix: apiPrefix,
  
  afterJSON(body) {
    const { msg, description } = body
    if (msg !== 'success') {
      throw new Error(msg)
    }
  }
})
