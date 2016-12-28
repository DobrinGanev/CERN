import {FETCH_MESSAGE_START, FETCH_MESSAGE_ERROR, RECEIVE_MESSAGE} from '../actions/actionTypes';

const messages = [
		{
				message: "Initial state message: Hello"
		}
];
const initialState = {
		messages: messages,
		isLoading: true,
		error: false
};

export default message = (state = initialState, action) => {
		switch (action.type) {
				case FETCH_MESSAGE_START:
						{
								return {
										...state,
										isLoading: true
								}
						}
				case FETCH_MESSAGE_ERROR:
						{
								return {
										...state,
										isLoading: false,
										error: true
								}
						}
				case RECEIVE_MESSAGE:
						{
								console.log(action)
								return {
										...state,
										messages: action.messages,
										isLoading: false,
										error: false
								}
						}
				default:
						return state
		}
}
