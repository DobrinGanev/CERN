import { Client } from 'cassandra-driver'
import config from '../../config'

/**
* Create a singleton client instance with its methods promisified (i.e. gives us methods like executeAsync)
* https://github.com/KillrVideo/killrvideo-nodejs
*/


export const cassandra = new Client({
  contactPoints: config.contactPoints,
  queryOptions: {
    prepare: true
  }
})



