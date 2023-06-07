/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ReservationForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllDoctors } from '../../redux/doctors/doctors';
import { addReservation } from '../../redux/doctors/reservations';

const ReservationForm = () => {
  /* Setup Redux dispatch */
  const dispatch = useDispatch();

  /* Get All Doctors */
  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  const history = useNavigate();
  const { id } = useParams(); /* Doctor's ID */
  const storedUser =
    JSON.parse(localStorage.getItem('user')) || ''; /* Get User */

  /* Load Redux State */
  const allDoctors = useSelector((state) => state.doctor);

  const initialState = {
    city: '',
    datetime: '',
    doctor_id: id,
    user_id: storedUser._id,
  };

  //* ******************* */

  const [init, setInit] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInit({ ...init, [name]: value });
  };

  /* Get doctor by ID */
  const doctorId = (allDoctors?.filter((doctor) => doctor._id === id))[0];

  /* Save doctorId */
  if (doctorId) {
    localStorage.setItem('doctorId', JSON.stringify(doctorId));
  }

  const storedDoctor = JSON.parse(localStorage.getItem('doctorId')) || '';

  const handleReserve = (e) => {
    e.preventDefault();
    dispatch(addReservation(init));
    /* dispatch(getAllReservations()); */
    history('/home');
  };

  return (
    <div>
      <section className="reservation">
        <div className="reservation-container">
          <h2
            className="reservation-title"
            data-testid="title"
          >
            Make your reservations
          </h2>
          <h3>(*)only complete CITY and DATETIME fields</h3>

          <form
            className="addForm"
            onSubmit={handleReserve}
          >
            <label htmlFor="city">
              <b>City</b>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter City"
                autoComplete="off"
                value={init.city}
                onChange={handleInputChange}
                required
              />
            </label>

            <label htmlFor="datetime">
              <b>Datetime</b>
              <input
                type="datetime-local"
                id="datetime"
                name="datetime"
                placeholder="Enter Datetime"
                autoComplete="off"
                value={init.datetime}
                onChange={handleInputChange}
                required
              />
            </label>

            <label htmlFor="doctor">
              <b>Doctor</b>
              <input
                type="text"
                id="doctor"
                name="doctor"
                autoComplete="off"
                value={`Dr. ${storedDoctor.name.toUpperCase()} ${storedDoctor.lastname.toUpperCase()}`}
                disabled
              />
            </label>

            <label htmlFor="user">
              <b>Username</b>
              <input
                type="text"
                id="user"
                name="user"
                autoComplete="off"
                value={storedUser.username}
                disabled
              />
            </label>

            <input
              type="submit"
              value="Reserve"
              className="addButton"
            />
          </form>
        </div>
      </section>
    </div>
  );
};

export default ReservationForm;
