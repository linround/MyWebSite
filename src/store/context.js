import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  context: {
    app: {
      options: [],
    },
    folder: {
      options: [],
    },
    footerMenu: {
      options: [],
    },
  },
}


const contextSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
  },
})


export const context = (state) => state.context


export default contextSlice.reducer
