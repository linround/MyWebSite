import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user'
import dialogSlice from './dialog'


export const store = configureStore({ reducer: {
  user: userSlice,
  dialog: dialogSlice,
}, })
