import React from "react"
import Heading from "../../common/Heading"
import { location } from "../../data/Data"
import "./style.css"

import { Link, useHistory } from 'react-router-dom';

const Location = () => {
  const history = useHistory();

  const search = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        history.push({
          pathname: '/search',
          search: '?update=true',  // query string
          state: {  // location state
            coords: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }, 
          },
        }); 
      },
      (error) => {
        alert(error.message)
      }
    );
  }

  return (
    <>
      <section className='location padding'>
        <div className='container'>
          <Heading title='Explore By Location' subtitle='' />

          <div className='content grid3 mtop'>
            {location.map((item, index) => (
              <div className='box' key={index}>
                <a onClick={() =>{ if(item.name == 'Your Current Location'){search() } }}>
                  <img src={item.cover} alt='' />
                  <div className='overlay'>
                    <h5>{item.name}</h5>
                    <p>
                      <label>{item.Villas}</label>
                      <label>{item.Offices}</label>
                      <label>{item.Apartments}</label>
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Location
