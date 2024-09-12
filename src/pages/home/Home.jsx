/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllDoctors } from '../../redux/doctors/doctors';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  const doctors = useSelector((state) => state.doctor);

  if (!doctors) {
    return (
      <div>
        <div className="homeTitle">
          <h1 data-testid="title">DOCTORS ONLINE</h1>
          <p data-testid="subtitle">Find the best doctors in your area</p>
        </div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="homeTitle">
        <h1 data-testid="title">DOCTORS ONLINE</h1>
        <p data-testid="subtitle">Find the best doctors in your area</p>
      </div>

      {doctors && (
        <div
          className="doctorContainer"
          data-testid="doctorContainer"
        >
          {doctors.map((doctor) => (
            <Link
              to={`/detailspage/${doctor._id}`}
              key={doctor._id}
            >
              <div className="doctor">
                <img
                  src={doctor.image}
                  alt={`doctor${doctor._id}`}
                />
                <h3>
                  {doctor.name.toUpperCase()} {doctor.lastname.toUpperCase()}
                </h3>
                <p>{doctor.speciality}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
