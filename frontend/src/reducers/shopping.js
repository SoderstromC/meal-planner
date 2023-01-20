import { createSlice } from '@reduxjs/toolkit'

const initialItems = localStorage.getItem('shopping') ? JSON.parse(localStorage.getItem('shopping')) : []

const shopping = createSlice({
  name: 'shopping',
  initialState: { items: initialItems },
  reducers: {

    toggleItem: (store, action) => {
      console.log(store)
      console.log(action)
      store.items.forEach((item) => {
        if (item.id === action.payload) {
          item.isCompleted = !item.isCompleted
        }
      })
    },
      }
})

export default shopping