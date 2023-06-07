// users.js
import { createAsyncThunk } from '@reduxjs/toolkit';

// Actions... types
const GET_ALL_USERS = 'doctors/GET_ALL_USERS';
const CURRENT_USER = 'doctors/CURRENT_USER';

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    // do reducer stuff
    // GET all doctors from the API
    case `${GET_ALL_USERS}/fulfilled`:
      return action.payload;

    // CURRENT_USER from the API
    case CURRENT_USER:
      return action.payload;
    default: return state;
  }
}

const userAPI = 'http://localhost:3001/api/v1/users';
// const userAPI = 'https://doctorsmongo-back.vercel.app/api/v1/users';

// Action Creators
export const getAllUsers = createAsyncThunk(GET_ALL_USERS, async () => {
  const getAllUsersUrl = userAPI;
  const response = await fetch(getAllUsersUrl,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  const result = await response.json();
  return result;
}); /* getAllUsers - createAsyncThunk - API */

export function currentUser(obj) {
  return { type: CURRENT_USER, payload: obj };
} /* currentUser */
