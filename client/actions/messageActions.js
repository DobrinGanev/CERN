import fetch from 'isomorphic-fetch';
import { FETCH_MESSAGE_START, FETCH_MESSAGE_ERROR, RECEIVE_MESSAGE } from './actionTypes'

const receiveMessage = (json) => {
	return { type: RECEIVE_MESSAGE, messages: json }
}
const fetchMessageStart = () => {
	return { type: FETCH_MESSAGE_START }
}
const fetchError = () => {
	return { type: FETCH_MESSAGE_ERROR }
}

export const fetchMessage = () => {
	return dispatch => {
		dispatch(fetchMessageStart())
		return fetch('/hello')
			.then(response => response.json())
			.then(json => dispatch(receiveMessage(json)))
			.catch(() => {
				dispatch(fetchError())
			})
	}
}
