import fetch from 'isomorphic-fetch';
import callApi from '../util/apiCaller';
import {
	MESSAGE_FETCH,
	MESSAGE_STOP_FETCH,
} from './actionTypes';

function receiveMessage(message) {
	return {
		type: MESSAGE_FETCH,
		messages: message,
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
		return callApi('hello', {
		}).then(function(data) {
	           var messages =[];
	            messages.push(data.message)
	 		       dispatch(receiveMessage(messages));
	 					 dispatch(stopFetch());
	 		    });
	 	}
}
