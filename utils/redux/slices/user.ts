import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { me } from '../../../api/users-api';

export const getMeThunk = createAsyncThunk(
  "user/me",
  ( _, thunkAPI ) => {
    return me().then(
      (res) => {
        return res.data;
      },
      (err) => {
        return err.response.data;
      }
    );
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    saveUser: ( state, payload: PayloadAction<object> ) => payload ? payload : state,
    deleteUser: state => {}
  },
  extraReducers: {
    [getMeThunk.fulfilled.toString()]: ( state, action ) => {
      return action.payload;
    }
  }
});

export const {
  saveUser,
  deleteUser
} = userSlice.actions;

export default userSlice.reducer;
