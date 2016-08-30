import fetch from 'isomorphic-fetch';
import {
	MESSAGE_FETCH,
	MESSAGE_STOP_FETCH,
} from './actionTypes';

function receiveMessage(json) {
	return {
		type: MESSAGE_FETCH,
		messages: json,
		isLoading: true
	};
}

function stopFetch() {
	return {
		type: MESSAGE_STOP_FETCH,
		isLoading: false
	}
}

export function fetchMessage() {
	return function (dispatch) {
		return fetch('/hello')
			.then(response => response.json())
			.then(json => dispatch(receiveMessage(json))).then(function(){
		       dispatch(stopFetch())
			})
	 	}
}
