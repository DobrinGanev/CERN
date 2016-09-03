import fetch from 'isomorphic-fetch';
import {
	FETCH_MESSAGE_START,
	FETCH_MESSAGE_ERROR,
	RECEIVE_MESSAGE,
} from './actionTypes';

function receiveMessage(json) {
	return {
		type: RECEIVE_MESSAGE,
		messages: json
	};
}
function fetchMessageStart() {
	return {
		type: FETCH_MESSAGE_START
	};
}
function fetchError() {
	return {
		type: FETCH_MESSAGE_ERROR
	}
}

export function fetchMessage() {
	return function (dispatch) {
		dispatch(fetchMessageStart())
		return fetch('/hello')
			.then(response => response.json())
			.then(json => dispatch(receiveMessage(json))).then(function(){
		      //  dispatch(stopFetch())
			})
	 	}
}
