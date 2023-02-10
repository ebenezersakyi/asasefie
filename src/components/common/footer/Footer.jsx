import React from "react"
import { footer } from "../../data/Data"
import "./footer.css"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <section className='footerContact'>
        <div className='container'>
          <div className='send flex'>
            <div className='text'>
              <h1>Do You Have Questions ?</h1>
              <p>We'll help you to grow your career and growth.</p>
            </div>
            <button className='btn5'><Link to={'/contact'}>Contact Us Today</Link></button>
          </div>
        </div>
      </section>

      <footer>
        <div className='container'>
          <div className='box'>
            <div className='logo'>
              <img src='../images/logo.png' alt='' />
              <h2>Do You Need Help With Anything?</h2>
              <p>Receive updates, hot deals, tutorials, discounts sent straignt in your inbox every month</p>

              <div className='input flex'>
                <input type='text' placeholder='Email Address' />
                <button className="btn1">Subscribe</button>
              </div>
            </div>
          </div>

          {footer.map((val) => (
            <div className='box'>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> <a style={{ color: 'white', textDecoration: 'none' }} href={items.url}>{items.list}</a> </li>
                ))}
              </ul>
            </div>
          ))}

          <div className='download__img'>
            {/* <h3>Get the app</h3> */}
            <a href='https://apps.apple.com/gh/app/asasefie/id1666692315' style={{ color: 'black', textDecoration: 'none' }}>
                <img className='image__tag' src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/640px-Download_on_the_App_Store_Badge.svg.png"} alt="" />
            </a>
            <a href='https://play.google.com/store/apps/details?id=com.asasefie.realestate.app&hl=en&gl=US' style={{ color: 'black', textDecoration: 'none' }}>
                <img className='image__tag' src={"https://mylapels.com/wp-content/uploads/2019/02/global-playstore.png"} alt="" />
            </a>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <span>© 2023 Asasefie.</span>
        <a 
          href='https://www.privacypolicies.com/live/315f063d-1a54-4050-b229-eb4bde71186f' 
          target="_blank" 
          style={{ color: 'white', textDecoration: 'none', marginLeft: 5 }}
        >
          Terms of service
        </a>
      </div>
    </>
  )
}

export default Footer
