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

  return (
    <div>
      <div className="homeTitle">
        <h1>DOCTORS ONLINE</h1>
        <p>Find the best doctors in your area</p>
      </div>
      {
          doctors && (
            <div className="doctorContainer">
                {doctors.map((doctor) => (
                  <Link to={`/detailspage/${doctor.id}`} key={doctor.id}>
                    <div className="doctor">
                      <img src={doctor.image} alt={`doctor${doctor.id}`} />
                      <h3>
                        {doctor.name}
                        {' '}
                        {doctor.lastname}
                      </h3>
                      <p>{doctor.speciality}</p>
                    </div>
                  </Link>
                ))}
            </div>
          )
        }
    </div>
  );
};

export default Home;
