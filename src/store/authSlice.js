import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status: false,
    userDetails: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true,
            state.userDetails = action.payload
        },

        logout: (state) => {
            state.status = false,
            state.userDetails = null
        },
    }
})

export default authSlice.reducer

export const {login, logout} = authSlice.actions