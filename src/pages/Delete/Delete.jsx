/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllDoctors, deleteDoctor } from '../../redux/doctors/doctors';

import './Delete.css';

const Delete = () => {
  /* Load Redux State */
  const doctors = useSelector((state) => state.doctor);
  // *********************************

  /* Setup Redux dispatch */
  const dispatch = useDispatch();

  /* Navigate */
  const history = useNavigate();

  const handleButton = (id) => {
    dispatch(deleteDoctor(id));
    history('/home');
  };

  /* Clean - Redux movies store */
  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  return (
    <div>
      <h2>Delete</h2>

      {doctors && (
        <div className="delDiv">
          <table id="customers">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Speciality</th>
                <th className="delAction">Action</th>
              </tr>

              {doctors.length > 0 &&
                doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td className="delName">
                      Dr. {doctor.name.toUpperCase()}{' '}
                      {doctor.lastname.toUpperCase()}
                    </td>
                    <td>{doctor.speciality}</td>
                    <td>
                      <button
                        type="button"
                        className="delButton"
                        onClick={() => handleButton(doctor._id)}
                        data-testid="delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Delete;
