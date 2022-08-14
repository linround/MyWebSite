import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  blogs: ['TypeScript', 'Vue源码解读'],
  github: [
    'gitPractice',
    'ssrD-demo ',
    'webpac5 ',
    'vue3admin',
    'typescript-vue-tutorial',
    'minipack ',
    'reactLearning',
    'VUE2 ',
    'react-admin-master',
    'hello-github-actions',
    'BLOG',
    'HomePage',
    'projectdemo',
    'plan',
    'runpage',
    'node-api-cn',
    'wx_miniProgram',
    'vue-webpack',
    'productdata',
    'cartvue',
    'Person',
    'vuex-demo',
    'animate.css',
    'OPPO2',
    'angular-rk9uiw-heroes',
    'angular-ufg7wz-aeqggx_shopping'
  ],
}



const blogsSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    addItem(state, action) {
      const type = action.payload.type
      state[type].push(action.payload.data)
    },
  },
})


export const blogsSelector = (state) => state.blogs.blogs
export const githubSelector = (state) => state.blogs.github


export const { addItem, } = blogsSlice.actions
export default blogsSlice.reducer
