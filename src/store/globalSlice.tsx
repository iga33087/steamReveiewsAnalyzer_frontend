import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    loading: false
  },
  reducers: {
    loadingChange: (state, action) => {
      state.loading = action.payload
    },
  }
})

export const { loadingChange } = globalSlice.actions

export default globalSlice.reducer