/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors } from '../../redux/doctors/doctors';
import { getAllReservations } from '../../redux/doctors/reservations';

import './MyReservations.css';

const MyReservations = () => {
  /* Setup Redux dispatch */
  const dispatch = useDispatch();

  /* Clean - Redux movies store */
  useEffect(() => {
    dispatch(getAllReservations());
    dispatch(getAllDoctors());
  }, [dispatch]);

  /* Load Redux State */
  const allReservations = useSelector((state) => state.reservation);
  console.log(allReservations);
  const doctors = useSelector((state) => state.doctor);
  // *********************************

  /* Get user_id */
  const storedUser =
    JSON.parse(localStorage.getItem('user')) || ''; /* Get User */

  /* Reservations filtered by user_id */
  /* const reservations = allReservations.filter((reserve) => reserve.user_id === storedUser.id); */

  /* Reservations filtered by user_id */
  let reservations = [];
  if (Array.isArray(allReservations)) {
    reservations = allReservations.filter(
      (reserve) => reserve.user_id === storedUser._id
    );
  }

  // *********************************

  return (
    <div data-testid="reservations-table">
      <h2>My Reservation</h2>

      {reservations.length > 0 ? (
        <div className="myReserDiv">
          <table id="customers">
            <tbody>
              <tr>
                <th>Doctor id</th>
                <th>City</th>
                <th>Datetime</th>
              </tr>

              {reservations.map((reserve) => {
                /* Doctor's name by ID */
                const doctor = doctors.find(
                  (doc) => doc._id.toString() === reserve.doctor_id.toString()
                );
                const doctorName = doctor
                  ? `${doctor.name} ${doctor.lastname}`
                  : '';

                const dateString = reserve.datetime.slice(0, 16);
                const date = new Date(dateString);
                const formattedDate = date.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                });

                const formattedTime = date.toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                const formattedDateTime = `${formattedDate}, ${formattedTime}`;

                return (
                  <tr key={reserve._id}>
                    <td>Dr. {doctorName.toUpperCase()}</td>
                    <td>{reserve.city}</td>
                    <td>{formattedDateTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No reservations found</div>
      )}
    </div>
  );
};

export default MyReservations;
