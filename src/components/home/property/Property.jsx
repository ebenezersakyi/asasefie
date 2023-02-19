import React from "react"
import Footer from "../../common/footer/Footer"
import Heading from "../../common/Heading"
import "./Property.css"
import RecentCard from "./PropertyCard"

const Recent = (props) => {
  return (
    <>
      <section className='container__main'>
        {/* <div className='container'> */}
          <Heading title={props.title} subtitle='' />
          <RecentCard houses={props.houses} />
        {/* </div> */}
      </section>
      {/* <Footer /> */}
    </>
  )
}

export default Recent
