// movies.js
import { createAsyncThunk } from '@reduxjs/toolkit';

// Actions... types
const GET_DOCTOR = 'doctors/GET_DOCTOR';
const GET_ALL_DOCTORS = 'doctors/GET_ALL_DOCTORS';
const DELETE_DOCTOR = 'doctors/DELETE_DOCTOR';
const UPDATE_DOCTOR = 'doctors/UPDATE_DOCTOR';

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    // do reducer stuff
    // GET doctor from the API
    case `${GET_DOCTOR}/fulfilled`:
      return action.payload;
    // GET all doctors from the API
    case `${GET_ALL_DOCTORS}/fulfilled`:
      return action.payload;
    // DELETE doctor from the API
    case `${DELETE_DOCTOR}/fulfilled`:
      // get the doctor id from the action metadata
      return state.filter((doctor) => doctor.id !== action.meta.arg);

    // UPDATE_DOCTOR from the API
    case UPDATE_DOCTOR:
      return action.payload;
    default: return state;
  }
}

const doctorAPI = 'http://localhost:3001/api/v1/doctors';
// const doctorAPI = 'https://doctorsmongo-back.vercel.app/api/v1/doctors';

// Action Creators
export const getDoctor = createAsyncThunk(GET_DOCTOR, async (id) => {
  const getDoctorUrl = `${doctorAPI}/${id}`;
  const response = await fetch(getDoctorUrl,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  const result = await response.json();
  return result;
}); /* getDoctor - createAsyncThunk - API */

export const getAllDoctors = createAsyncThunk(GET_ALL_DOCTORS, async () => {
  const getAllDoctorsUrl = doctorAPI;
  const response = await fetch(getAllDoctorsUrl,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  const result = await response.json();
  return result;
}); /* getAllDoctors - createAsyncThunk - API */

export const deleteDoctor = createAsyncThunk(DELETE_DOCTOR, async (id) => {
  const deleteDoctorUrl = `${doctorAPI}/${id}`;
  const response = await fetch(deleteDoctorUrl,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  const result = await response.json();
  return result;
}); /* deleteDoctor - createAsyncThunk - API */

export function updateDoctor(obj) {
  return { type: UPDATE_DOCTOR, payload: obj };
} /* updateDoctor */
