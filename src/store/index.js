import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user'
import dialogSlice from './dialog'
import blogsSlice from './blog'


export const store = configureStore({ reducer: {
  user: userSlice,
  dialog: dialogSlice,
  blogs: blogsSlice,
}, })
