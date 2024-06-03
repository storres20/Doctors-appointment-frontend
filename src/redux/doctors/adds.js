// movies.js
import { createAsyncThunk } from '@reduxjs/toolkit';

// Actions... types
const FINISH_DOCTOR = 'doctors/FINISH_DOCTOR';
const ADD_DOCTOR = 'doctors/ADD_DOCTOR';

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    // do reducer stuff
    // GET all doctors from the API
    case `${FINISH_DOCTOR}/fulfilled`:
      return action.payload;

    // UPDATE movies from the API
    case ADD_DOCTOR:
      return action.payload;
    default: return state;
  }
}

// const doctorAPI = 'http://localhost:3001/api/v1/doctors';
const doctorAPI = 'https://doctorsmongo-back.vercel.app/api/v1/doctors';

// Action Creators
export const finishDoctor = createAsyncThunk(FINISH_DOCTOR, async (add) => {
  const finishDoctorUrl = doctorAPI;
  const response = await fetch(finishDoctorUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(add),
    });
  const result = await response.json();
  return result;
}); /* finishDoctor - createAsyncThunk - API */

export function addDoctor(obj) {
  return { type: ADD_DOCTOR, payload: obj };
} /* addDoctor - searchBar component */
