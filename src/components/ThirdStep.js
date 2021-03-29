import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import csc from 'country-state-city';
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';


const ThirdStep = (props) => {
  const history = useHistory();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // effect on taking countries
  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true);
        const result = await csc.getAllCountries();
        let allCountries = [];
        allCountries = result?.map(({ isoCode, name }) => ({
          isoCode,
          name
        }));
        const [{ isoCode: firstCountry } = {}] = allCountries;
        setCountries(allCountries);
        setSelectedCountry(firstCountry);
        setIsLoading(false);
      } catch(err) {
        setCountries([]);
        setIsLoading(false);
      }
    }

    getCountries();
  }, []);

  // effect on taking states when the selected country has changed
  useEffect(() => {
    const getStates = async () => {
      try {
        const result = await csc.getStatesOfCountry(selectedCountry);
        let allStates = [];
        allStates = result?.map(({ isoCode, name }) => ({
          isoCode,
          name
        }));
        const [{ isoCode: firstState = '' } = {}] = allStates;
        setCities([]);
        setSelectedCity('');
        setStates(allStates);
        setSelectedState(firstState);
      } catch(err) {
        setStates([]);
        setCities([]);
        setSelectedCity('');
      }
    }

    getStates();
  }, [selectedCountry]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const result = await csc.getCitiesOfState(
          selectedCountry,
          selectedState
        );
        let allCities = [];
        allCities = result?.map(({ name }) => ({
          name
        }));
        const [{ name: firstCity = '' } = {}] = allCities;
        setCities(allCities);
        setSelectedCity(firstCity);
      } catch(err) {
        setCities([]);
      }
    }

    getCities();
  }, [selectedState]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = props;
      const updatedData = {
        country: countries.find(
          (country) => country.isoCode === selectedCountry
        )?.name,
        state:
          states.find((state) => state.isoCode === selectedState)?.name || '',
        city: selectedCity
      };

      await axios.post(`${BASE_API_URL}/register`, {
        ...user,
        ...updatedData
      });

      Swal.fire('Awesome!', "You're successfully registered!", 'success').then(
        (result) => {
          if (result.isConfirmed || result.isDismissed) {
            history.push('/');
          }
        }
      );

    } catch(error) {
      if(error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data
        });
      }
    }
  }

  return (
    <Form className="input-form" onSubmit={handleSubmit}>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}
      >
        <Form.Group controlId="country">
          {isLoading && (<p className="loading">Loading countries. Please wait...</p>)}
          <Form.Label>Country</Form.Label>
          <Form.Control 
            as="select"
            name="country"
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
          >
            {
              countries.map(({ isoCode, name }) => (
                <option value={isoCode} key={isoCode}>
                  {name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            as="select"
            name="state"
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
          >
            {
              states.length > 0 ? (
                states.map(({ isoCode, name }) => (
                  <option value={isoCode} key={isoCode}>
                    {name}
                  </option>
                ))
              ) : (
                <option value="" key="">
                  No states found...
                </option>
              )
            }
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            as="select"
            name="city"
            value={selectedCity}
            onChange={(event) => setSelectedCity(event.target.value)}
          >
            {
              cities.length > 0 ? (
                cities.map(({ name }) => (
                  <option value={name} key={name}>
                    {name}
                  </option>
                ))
              ) : (
                <option value="">No cities found</option>
              )
            }
          </Form.Control>
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Register
        </Button>
      </motion.div>
    </Form>
  )
}

export default ThirdStep;