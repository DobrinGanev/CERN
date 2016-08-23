import test from 'ava';
import nock from 'nock';
import fetch from 'isomorphic-fetch';
import http from "http";

const API_URL = "http://mytest.com";

export default function callApi(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  })
  .then(
    response => response,
    error => error
  );
}


test('method defaults to GET', t => {
  var reply = {
    message : "hello world"
  }
 nock(API_URL)
      .get("/test")
      .reply(200,reply);
    return callApi('test').then(response => {
         t.deepEqual(response, reply);
     });
});

test('sends the body', t => {
  const body = { id: 5 };
  const reply = { foo: 'bar' };
  nock(API_URL)
    .post('/foo', body)
    .reply(200, reply);
  return callApi('foo', 'post', body).then(response => {
    t.deepEqual(response, reply);
  });
});

test('returns the error', t => {
  const reply = { message: 'Errrrrrrrrr' };
  nock(API_URL)
    .get('/send_error')
    .reply(500, reply);
  return callApi('send_error').then(error => {
    t.deepEqual(error, reply);
  });
});
