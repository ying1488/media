import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";
import { removeUser } from '../thunks/removeUser';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    extraReducers(builders) {
        builders.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        });
        builders.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builders.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builders.addCase(addUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builders.addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        });
        builders.addCase(addUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error
        });

        builders.addCase(removeUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builders.addCase(removeUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.filter(user => {
                return user.id !== action.payload.id
            });
        });
        builders.addCase(removeUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const usersReducer = usersSlice.reducer;