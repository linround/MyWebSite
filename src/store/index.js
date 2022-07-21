import {configureStore} from '@reduxjs/toolkit'
import userSlice from './user'

export const store = configureStore({reducer:{user: userSlice}})
