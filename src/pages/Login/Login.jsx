/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, currentUser } from '../../redux/doctors/users';
import './Login.css';

const Login = ({ authenticate }) => {
  /* Setup Redux dispatch */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  /* Load Redux State */
  const users = useSelector((state) => state.user);
  // *********************************

  const initialState = {
    username: '',
    id: '',
  };

  //* ******************* */
  const navigate = useNavigate();

  const [init, setInit] = useState(initialState);

  const handleInputChange = (event) => {
    const { value } = event.target;
    const userx = users.filter((user) => user.username === value)[0];
    setInit(userx);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(currentUser(init));
    authenticate(init);
    navigate('/home');
  };

  return (
    <div
      className="loginContainer"
      data-testid="doctorLogin"
    >
      <form
        className="loginForm"
        onSubmit={handleSubmit}
      >
        <h2 data-testid="loginTitle">Login</h2>

        <label htmlFor="username">
          <b data-testid="loginUsername">Username</b>
          <select
            id="username"
            name="username"
            value={init.username}
            onChange={handleInputChange}
            required
          >
            <option value="">--Please choose an option--</option>
            {users.map((user) => (
              <option
                value={user.username}
                key={user._id}
              >
                {user.username}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="addButton"
          data-testid="loginButton"
        >
          Login
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
