import {createSlice} from "@reduxjs/toolkit";



const initialState = {
  name: '',
  theme: 'dark'
}

function storageSetUser(user = {}) {
  localStorage.setItem('user', JSON.stringify(user))
}
function storageGetUser(){
  return JSON.parse(localStorage.getItem('user'))
}


const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    signIn(state,action){
      state.name = action.payload
      const localUser = storageGetUser()
      storageSetUser({
        name:  state.name,
        theme: localUser?.theme || state.theme
      })
    },
    signOut(state) {
      state.name = ''
      localStorage.removeItem('user')
    },
    toggleTheme(state,action) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      storageSetUser({
        name: action.payload.name,
        theme: state.theme
      })
    }
  }
})


export const userSelector = state =>{
  const userInfo = storageGetUser() || {}
  return userInfo || state.user
}


export const { signIn,signOut,toggleTheme } = userSlice.actions
export default userSlice.reducer