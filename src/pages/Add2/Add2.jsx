/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import './Add2.css';
import './loader.css';
import { useNavigate } from 'react-router-dom';

import { addDoctor, finishDoctor } from '../../redux/doctors/adds';

const Add2 = () => {
  /* Load Redux State */
  const adds = useSelector((state) => state.add);

  /* Setup Redux dispatch */
  const dispatch = useDispatch();

  const history = useNavigate();

  // *********************************

  const [listingData, setListingData] = useState('');
  const [ansApi, setAnsApi] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  let data64; // init variable

  /* Put this Conditional for starting web app o refreshing
   * to avoid errors because initial value is ""
   * initial value:
   * listingData = "" and listingData.selectedFile = undefined
   */

  if (listingData !== '') {
    data64 = listingData.selectedFile.split(',');
  }

  // Input File
  // Convert image to base 64
  // set ansApi to false
  const handleListing = ({ base64 }) => {
    setListingData({ ...listingData, selectedFile: base64 });

    setAnsApi('');
  };

  // Send image to ImgBB with AXIOS
  const handleClick = () => {
    // show loader hiden window
    setIsLoader(!isLoader);

    const data = new FormData();
    data.append('image', data64[1]);

    // imgbb's personal Token
    // https://es.imgbb.com/
    // const imgbbToken = '165bc83a2b0f87e5ddc8af943b7fcba4'; // old apikey
    const imgbbToken = '98dabcd849de75954f9b95dc5b738c19'; // new apikey

    const APIurl = 'https://api.imgbb.com/1/upload?key=';

    fetch(APIurl + imgbbToken, {
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setAnsApi(data.data.image.url);
        dispatch(addDoctor({ ...adds, image: data.data.image.url }));
        setIsLoader(isLoader);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoader(isLoader);
      });
  };

  const handleNext = () => {
    dispatch(finishDoctor(adds));
    history('/add3');
  };

  return (
    <div className="add2Container">
      <h2>Add Doctor - Step 2/3</h2>

      <div
        id="loader"
        className={isLoader ? '' : 'hidden'}
      />

      <div className={`animate-bottom ${isLoader ? 'hidden' : ''}`}>
        {/* Input file to select an image.
      The selected image will save on imgbb web storage
      imgbb creates an url for every image that you upload
      the main porpuse is fill all url_image field on database's API
      */}
        {!ansApi && (
          <div>
            <h3>Select doctor&apos;s image</h3>
            <FileBase
              type="file"
              data-testid="add2File"
              multiple={false}
              onDone={({ base64 }) => handleListing({ base64 })}
            />
          </div>
        )}

        {listingData && (
          <div>
            <h3>Image Preview</h3>
            <img
              className={`img ${listingData ? '' : 'hidden'}`}
              src={data64}
              alt="Preview"
            />
          </div>
        )}

        {!ansApi && listingData && (
          <div>
            <h4>Click the button to CONFIRM</h4>
            <button
              disabled={!(listingData && !ansApi)}
              className="btn"
              type="button"
              onClick={() => handleClick()}
            >
              CONFIRM
            </button>
          </div>
        )}

        <div className={ansApi ? '' : 'hidden'}>
          <h5 className="add2Attached">Image Attached!!</h5>
          <button
            type="button"
            className="add2Button"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add2;
