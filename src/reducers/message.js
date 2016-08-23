import {
	MESSAGE_FETCH,
  MESSAGE_STOP_FETCH
} from '../actions/actionTypes';

const initialState = {
	messages: [{
    data: "Hello"
  }],
	isLoading: true
};

export default function message(state = initialState, action) {
	debugger;
	switch (action.type) {
	case MESSAGE_FETCH:
		return Object.assign({}, state, {
			  messages: [action.messages, ...state.messages],
				isLoading: action.isLoading
	    })
	case MESSAGE_STOP_FETCH:
	return Object.assign({}, state, {
			isLoading: action.isLoading
		})
	default:
		return state;
	}
}
