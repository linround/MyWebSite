import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentDialogId: '',
}



const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    toggleDialog(state, action) {
      state.currentDialogId = action.payload
    },
  },
})


export const dialogSelector = (state) => state.dialog.currentDialogId


export const { toggleDialog, } = dialogSlice.actions
export default dialogSlice.reducer
