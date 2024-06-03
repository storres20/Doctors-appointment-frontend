/* eslint-disable max-len */
/* eslint-disable no-alert */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Add.css';
import { useNavigate } from 'react-router-dom';
import { finishDoctor } from '../../redux/doctors/adds';

import { uploadFile } from '../../firebase/config';

const Add = () => {
  /* Setup Redux dispatch */
  const dispatch = useDispatch();

  const initialState = {
    name: '',
    lastname: '',
    speciality: '',
    experience: '',
    consultation: '',
    image: '',
  };

  //* ******************* */
  const history = useNavigate();

  const [init, setInit] = useState(initialState);
  const [file, setFile] = useState(null); // setFile for Firebase
  const [visible, setVisible] = useState(true); // setVisible for show and hide buttons
  const [preview, setPreview] = useState(''); // setPreview for image preview

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInit({ ...init, [name]: value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await uploadFile(file);
      setInit({ ...init, image: result });
      alert('All fields are correct');
      setVisible(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    dispatch(finishDoctor(init));
    history('/');
  };

  return (
    <div>
      <form className="addForm" onSubmit={handleSubmit}>
        <h2>Add Doctor - Step 1/3</h2>

        <label htmlFor="name">
          <b>First Name</b>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name.."
            autoComplete="off"
            value={init.name}
            onChange={handleInputChange}
            required
          />
        </label>

        <label htmlFor="lastname">
          <b>Last Name</b>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Your last name.."
            autoComplete="off"
            value={init.lastname}
            onChange={handleInputChange}
            required
          />
        </label>

        <label htmlFor="speciality">
          <b>Speciality</b>
          <select
            id="speciality"
            name="speciality"
            value={init.speciality}
            onChange={handleInputChange}
            required
          >
            <option value="">--Please choose an option--</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Urology">Urology</option>
          </select>
        </label>

        <label htmlFor="experience">
          <b>Experience</b>
          <input
            type="number"
            id="experience"
            name="experience"
            placeholder="Your experience in years"
            min="1"
            autoComplete="off"
            value={init.experience}
            onChange={handleInputChange}
            required
          />
        </label>

        <label htmlFor="consultation">
          <b>Consultation Fee</b>
          <input
            type="number"
            id="consultation"
            name="consultation"
            placeholder="Your consultation fee in dollars"
            min="1"
            autoComplete="off"
            value={init.consultation}
            onChange={handleInputChange}
            required
          />
        </label>

        <label htmlFor="image">
          <b>Image</b>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFileChange}
            required
          />
        </label>

        {preview && (
          <div>
            <img src={preview} alt="preview" style={{ width: '200px', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <button type="submit" className={visible ? 'addButton' : 'hide'}>Verificate</button>

        <button type="button" className={visible ? 'hide' : 'addButton'} onClick={handleNext}>Finish</button>
      </form>
    </div>
  );
};

export default Add;
