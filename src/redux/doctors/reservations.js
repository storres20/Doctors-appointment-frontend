// movies.js
import { createAsyncThunk } from '@reduxjs/toolkit';

// Actions... types
const ADD_RESERVATION = 'doctors/ADD_RESERVATION';
const GET_ALL_RESERVATIONS = 'doctors/GET_ALL_RESERVATIONS';
const DELETE_RESERVATIONS = 'doctors/DELETE_RESERVATIONS';
const UPDATE_RESERVATION = 'doctors/UPDATE_RESERVATION';

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    // do reducer stuff
    // ADD reservation to the API
    case `${ADD_RESERVATION}/fulfilled`:
      return action.payload;

    case `${GET_ALL_RESERVATIONS}/fulfilled`:
      return action.payload;

    case `${DELETE_RESERVATIONS}/fulfilled`:
      return action.payload;

    // UPDATE_RESERVATION from the API
    case UPDATE_RESERVATION:
      return action.payload;
    default: return state;
  }
}

const reservationAPI = 'http://localhost:3001/api/v1/appointments';
// const reservationAPI = 'https://doctorsmongo-back.vercel.app/api/v1/appointments';

// Action Creators
export const addReservation = createAsyncThunk(ADD_RESERVATION, async (add) => {
  const addReservationUrl = reservationAPI;
  const response = await fetch(addReservationUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(add),
    });
  const result = await response.json();
  return result;
}); /* addReservation - createAsyncThunk - API */

export const getAllReservations = createAsyncThunk(GET_ALL_RESERVATIONS, async () => {
  const getAllReservationsUrl = reservationAPI;
  const response = await fetch(getAllReservationsUrl,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  const result = await response.json();
  return result;
}); /* getAllReservations - createAsyncThunk - API */

export function updateReservation(obj) {
  return { type: UPDATE_RESERVATION, payload: obj };
} /* updateReservation */
