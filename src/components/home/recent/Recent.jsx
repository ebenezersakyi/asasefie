import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"

const Recent = (props) => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title={props.title} subtitle='' />
          <RecentCard houses={props.houses} />
        </div>
      </section>
    </>
  )
}

export default Recent
