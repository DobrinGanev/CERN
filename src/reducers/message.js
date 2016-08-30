import {
	MESSAGE_FETCH,
  MESSAGE_STOP_FETCH
} from '../actions/actionTypes';

const messages = [];
messages.push({
	message: "Initial state message: Hello"
})
const initialState = {
	messages: messages,
	isLoading: true
};

console.log(initialState)
export default function message(state = initialState, action) {
	switch (action.type) {
	case MESSAGE_FETCH:
		return Object.assign({}, state, {
			  messages: action.messages,
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
