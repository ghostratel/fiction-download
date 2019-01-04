import { SELECT_NAV } from './actionTypes'
const defaultStore = {
	activeNav: '/'
}

const reducer = (state = defaultStore, action) => {
	switch (action.type) {
		case SELECT_NAV:
			let {route} = action.payload
			return {...state, activeNav: route}
		default:
			return state
	}
}

export default reducer
