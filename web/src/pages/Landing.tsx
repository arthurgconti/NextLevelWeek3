import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import { FiArrowRight } from 'react-icons/fi'
import '../styles/pages/landing.css';

import logoImg from '../images/logo.svg';
import axios from 'axios';

function Landing() {

  const [city, setCity] = useState('')
  const [state, setState] = useState('')



  useEffect(() => {

    if (navigator.geolocation) {

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
      navigator.geolocation.getCurrentPosition((position) => {

        const { latitude: lat, longitude: lng } = position.coords

        async function getLocation() {
          await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}&autocomplete=false&types=place&limit=1`)
            .then((res) => {
              console.log(res)

              if (res.data.features.length > 0) {

                const resNameCityState = res.data.features[0].place_name
                console.log(resNameCityState);
                const names = resNameCityState.split(',')
                setCity(names[0])
                setState(names[1])
              }
              else {
                setCity('Sem localização')
                setState('Sem Localização')
              }
            })
            .catch((err) => console.log(err))
        }

        console.log(getLocation())

      }, (error) => {
        console.warn('ERROR(' + error.code + '): ' + error.message);
      }, options)

    }
  }, [])

  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>{city}</strong>
          <span>{state}</span>
        </div>

        <Link to="/login" className="button-access">
          Acesso restrito
          </Link>



        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;