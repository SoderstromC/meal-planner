import { createSlice } from '@reduxjs/toolkit'

const initialItems = localStorage.getItem('shopping') ? JSON.parse(localStorage.getItem('shopping')) : []

const shopping = createSlice({
  name: 'shopping',
  initialState: { items: initialItems },
  reducers: {
    setAllItems: (store, action) => {
      store.items = action.payload
    },
    toggleItem: (store, action) => {
      console.log(store)
      console.log(action)
      store.items.forEach((item) => {
        if (item.id === action.payload) {
          item.isCompleted = !item.isCompleted
        }
      })
    },
    deleteItem: (store, action) => {
      // Mutable
      // store.items.splice(action.payload, 1)

      // Immutable
      const updatedItems = store.items.filter((item) => {
        return store.items.indexOf(item) !== action.payload
      })
      store.items = updatedItems
    },
    addItem: (store, action) => {
      // Mutable
      // store.items.push(action.payload)

      // Immutable
      store.items = [...store.items, action.payload]
    }
  }
})

export default shopping