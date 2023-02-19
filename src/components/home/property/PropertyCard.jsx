import React from "react"
import { list } from "../../data/Data"
import './Property.css'

const RecentCard = (props) => {
  return (
    <>
      <div className='container__house'>
        {props.houses.map((val, index) => {
          const { cover, category, location, name, price, type } = val
          return (
            // <div className='box shadow' key={index}>
            //   <div >
            //     <img className="img" src={val.houseImage[0]} alt='' />
            //   </div>
            //   <div className='text'>
            //     <div className='category flex'>
            //       <span style={{ background: val.forSale? "#25b5791a" : "#ff98001a", color: val.forSale? "#25b579" : "#ff9800" }}>{val.forSale? "For Sale" : "For Rent"}</span>
            //       {/* <i className='fa fa-heart'></i> */}
            //     </div>
            //     {/* <h4>{name}</h4> */}
            //     <p>
            //       <i className='fa fa-location-dot'></i> {val.country}
            //     </p>
            //     <p>
            //       {val.description}
            //     </p>
            //     <p>
            //       {val.finishedSquareFeet} sqft
            //     </p>
            //   </div>
            //   <div className='button flex'>
            //     <div>
            //       <label htmlFor=''>Price: </label> <button className='btn1'>$ {(val.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</button>
            //     </div>
            //     <span>{val.homeType}</span>
            //   </div>
            // </div>

            <div className="house-listing">
            <img src={val.houseImage[0]} alt='' className="house-listing-image" />
            <div className="house-listing-details">
              <div className="house-listing-address">{val.country}</div>
              <div className="house-listing-city">{val.description}</div>
              <div className="house-listing-price">$ {(val.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
              {/* <div className="house-listing-bed-bath-sqft">{beds} beds, {baths} baths, {sqft} sqft</div> */}
              <div className={`house-listing-sale-type${val.forSale ? " for-sale" : " for-rent"}`}>{val.forSale? "For Sale" : "For Rent"}</div>
            </div>
          </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
