import {SELECT_NAV} from './actionTypes'
export const select_nav = (route) => ({
	type: SELECT_NAV,
	payload: {route}
})
