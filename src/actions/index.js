import * as types from '../constants/ActionTypes'

export const selectTool = text => ({ type: types.SELECT_TOOL, text });
export const changeSize = text => ({ type: types.CHANGE_SIZE, text });
export const changeColor = text => ({ type: types.CHANGE_COLOR, text });
export const uploadImage = text => ({ type: types.UPLOAD_IMAGE, text });
export const shouldReset = () => ({ type: types.SHOULD_RESET });
export const didReset = () => ({ type: types.DID_RESET });
export const shouldSave = () => ({ type: types.SHOULD_SAVE });
export const didSave = () => ({ type: types.DID_SAVE });
