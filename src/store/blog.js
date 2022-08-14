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
    addBlogItem(state, action) {
      const { type, data, } = action.payload
      const source = state[type]
      if (source.includes(data)) {
        state[type].push(`${data}${Date.now()}`)
      } else {
        state[type].push(data)
      }
    },
  },
})


export const blogsSelector = (state) => state.blogs.blogs
export const githubSelector = (state) => state.blogs.github


export const { addBlogItem, } = blogsSlice.actions
export default blogsSlice.reducer