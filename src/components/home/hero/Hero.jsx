import React, { useState } from "react"
import Heading from "../../common/Heading"
import "./hero.css"
import { Link, useHistory } from 'react-router-dom';

import { PacmanLoader } from 'react-spinners';

import PlacesAutocomplete, {geocodeByAddress,getLatLng} from "react-places-autocomplete";

const Hero = () => {
  const [address, setAddress] = useState("");
  const history = useHistory();
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });

  const handleSelect = async value => {
    setAddress(value);
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log('latLng', latLng)
    setCoordinates(latLng);
  };

  const navigateToSearch = async () => {
    if(coordinates.lat !== null){
      history.push({
        pathname: '/search',
        search: '?update=true',  // query string
        state: {  // location state
          coords: coordinates, 
        },
      }); 
    }else{
      alert('Input a county, city or neighbourhood')
    }
  }

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Search Your Next Home ' subtitle='Find new & featured property located in your local city.' />

          <form className='flex'>
            <div className='box'>
              {/* <span>City/Street</span> */}
              {/* <input type='text' placeholder='Location' /> */}

              <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading &&                         
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '80%', margin: 15 }}>          
                          <PacmanLoader 
                            size={10}
                            color={'black'}
                          />
                        </div>
                      }
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              
            </div>





            {/* <div className='box'>
              <span>Property Type</span>
              <input type='range' placeholder='Property Type' />
            </div> */}
            {/* <div className='box'>
              <span>Price Range ($)</span>
              <input
                type="range"
                min={0}
                max={100}
                style={{ background: 'black', width: '100%' }}
                // value={this.state.maxValue}
                // onChange={this.handleMaxChange}
              />            
            </div> */}
            {/* <div className='box'>
              <h4>Advance Filter</h4>
            </div> */}
            <button onClick={() => { navigateToSearch() }} className='btn1'>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Hero
