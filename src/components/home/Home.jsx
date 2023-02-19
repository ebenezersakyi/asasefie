import React, { useEffect, useState } from "react"
import Footer from "../common/footer/Footer"
import Awards from "./awards/Awards"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import Location from "./location/Location"
import Price from "./price/Price"
import Recent from "./property/Property"
import Team from "./team/Team"

const Home = () => {
  const [VerifiedAgentData, setVerifiedAgentData] = useState([])
  const [homesFromVerifiedAgents, setHomesFromVerifiedAgents] = useState([])

  useEffect(() => {
    getVerifedAgents()
  },[])

  const getVerifedAgents = async () => {
    try{
      const data = await fetch(`${process.env.REACT_APP_API_URL}/verifiedusers`)
      const response = await data.json()
      // console.log('success', response)
      setVerifiedAgentData(response.data)

      const houses = response.data.map((item) => {
        return item.houses
      }).flat(1)
      // console.log('houses', houses)
      setHomesFromVerifiedAgents(houses)

    }catch(err){
      console.error(err)
    }
  }

  return (
    <>
      <Hero />
      {/* <Featured /> */}
      <Recent title={'Homes For You'} houses={homesFromVerifiedAgents} />
      {/* <Awards /> */}
      {/* <Location /> */}
      {/* <Team agentDetails={VerifiedAgentData} /> */}
      {/* <Price /> */}
      <Footer />
    </>

  )
}

export default Home
