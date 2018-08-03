import { SELECT_TOOL, CHANGE_SIZE, CHANGE_COLOR, UPLOAD_IMAGE, SHOULD_RESET, DID_RESET, SHOULD_SAVE, DID_SAVE } from "../constants/ActionTypes";
import { BRUSH } from "../constants/Tools";

const initialState = {
	tool: BRUSH,
	brush_size: "10",
	brush_color: "#494949",
	image_stamp: "",
	should_reset: false,
	should_save: false
}

export default function tools(state = initialState, action) {
	switch (action.type) {
		case CHANGE_SIZE:
			return Object.assign({}, state, {
				brush_size: action.text
			})

		case CHANGE_COLOR:
			return Object.assign({}, state, {
				brush_color: action.text
			})

		case SELECT_TOOL:
			return Object.assign({}, state, {
				tool: action.text
			})

		case UPLOAD_IMAGE:
			return Object.assign({}, state, {
				image_stamp: action.text
			})

		case SHOULD_RESET:
			return Object.assign({}, state, {
				should_reset: true
			})

		case DID_RESET:
			return Object.assign({}, state, {
				should_reset: false
			})

		case SHOULD_SAVE:
			return Object.assign({}, state, {
				should_save: true
			})

		case DID_SAVE:
			return Object.assign({}, state, {
				should_save: false
			})

		default:
			return state
	}
}
