/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DetailsPage.css';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDoctors } from '../../redux/doctors/doctors';

const DetailsPage = () => {
  /* Load Redux State */
  const allDoctors = useSelector((state) => state.doctor);

  /* Setup Redux dispatch */
  const dispatch = useDispatch();

  // *********************************

  const { id } = useParams();

  const doctors = allDoctors.filter((doctor) => doctor._id === id);

  /* Clean - Redux movies store */
  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  /* Redirect to RESERVE page by doctor */
  const history = useNavigate();

  const handleButton = () => {
    history(`/reserve/${id}`);
  };

  return (
    <div
      className="detailsContainer"
      data-testid="doctorDetail"
    >
      <h2 data-testid="detailsTitle">DetailsPage</h2>
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          className="detailsDiv1"
        >
          <img
            src={doctor.image}
            alt="doc"
            className="detailsImage"
          />
          <div className="detailsDiv2">
            <h3
              className="detailsName"
              data-testid="detailsName"
            >
              Dr. {doctor.name.toUpperCase()} {doctor.lastname.toUpperCase()}
            </h3>
            <h4
              className="detailsSubName"
              data-testid="detailsParagraph"
            >
              Passion for Health
            </h4>
            <div className="detailsDiv3">
              <p>Speciality:</p>
              <p>{doctor.speciality}</p>
            </div>

            <div className="detailsDiv3">
              <p>Experience:</p>
              <p>{doctor.experience}</p>
            </div>

            <div className="detailsDiv3">
              <p>Consultation fee:</p>
              <p>{doctor.consultation}</p>
            </div>

            <div className="detailsDivButton">
              <button
                type="button"
                className="detailsButton"
                onClick={handleButton}
              >
                <BsFillCalendar2WeekFill />
                &nbsp;Reserve
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailsPage;
