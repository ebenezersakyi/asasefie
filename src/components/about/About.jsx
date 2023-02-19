import React from "react"
import Back from "../common/Back"
import Footer from "../common/footer/Footer"
import Heading from "../common/Heading"
import img from "../images/about.jpg"
import "./about.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='About Us' title='About Us - Who We Are?' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='Our Story' subtitle='Check out our story and work process' />

            <p>Asasefie is an innovative real estate app that is revolutionizing the way people buy and sell properties in Africa. Our mission is to provide a comprehensive and convenient solution for all real estate needs, making it easier for homebuyers, sellers, and real estate agents to navigate the market.</p>
            <p>We understand the challenges faced by real estate agents in showcasing their properties effectively, and that's why we have designed Asasefie to be a user-friendly and comprehensive solution for the real estate market. Our app provides real estate agents with a platform to showcase their properties to a wide audience, increasing their visibility and reach.</p>
            {/* <button className='btn2'>More About Us</button> */}
          </div>
          <div className='right row'>
            <img src='./immio.jpg' alt='' />
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default About
