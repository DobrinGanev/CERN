import { Client } from 'cassandra-driver';
import Promise from 'bluebird';
import config from '../../config';
//https://github.com/KillrVideo/killrvideo-nodejs
export const cassandra = Promise.promisifyAll(
  new Client({
    contactPoints: config.contactPoints,
    queryOptions: {
      prepare: true
    }
  })
);
