import React, { useEffect } from "react"
import Heading from "../../common/Heading"
import { team } from "../../data/Data"
import "./team.css"

const Team = (props) => {

  useEffect(() => {
    // console.log('props', props)
  },[props.agentDetails])

  return (
    <>
      <section className='team background'>
        <div className='container'>
          <Heading title='Our Featured Agents' subtitle='' />

          <div className='content mtop grid3'>
            {props.agentDetails.slice(0,6).map((val, index) => (
              <div className='box' key={index}>
                <button className='btn3'>{val.houses.length} Listings</button>
                <div className='details'>
                  <div className='img'>
                    <img src={val.profilePicture} alt='' />
                    <i className='fa-solid fa-circle-check'></i>
                  </div>
                  <i className='fa fa-location-dot'></i>
                  <label>{val.country}</label>
                  <h4>{val.firstName} {val.lastName}</h4>
{/* 
                  <ul>
                    {val.icon.map((icon, index) => (
                      <li key={index}>{icon}</li>
                    ))}
                  </ul> */}
                  <div className='button flex'>
                    <button >
                      <i className='fa fa-envelope'></i>
                      Message
                    </button>
                    <button className='btn4'>
                      <i className='fa fa-phone-alt'></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Team
