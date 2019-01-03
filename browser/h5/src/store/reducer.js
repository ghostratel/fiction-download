import { SELECT_NAV } from './actionTypes'
const defaultStore = {
	activeNav: '/'
}

const reducer = (state = defaultStore, action) => {
	console.log(state);
	switch (action.type) {
		case SELECT_NAV:
			return Object.assign(state, {activeNav: action.payload.route})
		default:
			return state
	}
}

export default reducer
