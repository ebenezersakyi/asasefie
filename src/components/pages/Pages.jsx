import React from "react"
import Header from "../common/header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "../home/Home"
import Footer from "../common/footer/Footer"
import About from "../about/About"
import Services from "../services/Services"
import Contact from "../contact/Contact"
import Search from "../search/Search"
import CurrencyDisclaimer from "../common/bits/CurrencyDisclaimer"
import ChoosePlatform from "../common/bits/ChoosePlatform"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import './Pages.css'

const Pages = () => {
  return (
    // <>
    //   <Router>
    //     <Header />
    //     <Switch>
    //       <Route exact path='/' component={Home} />
    //       <Route exact path='/about' component={About} />
    //       <Route exact path='/services' component={Services} />
    //       <Route exact path='/contact' component={Contact} />

    //       <Route path='/search' component={Search} />
    //       <Route path="/currencydisclaimer" component={CurrencyDisclaimer} />
    //       <Route path="/downloadplatform" component={ChoosePlatform} />
    //       {/* <Route path="/signin" component={SignIn} /> */}
    //     </Switch>
    //   </Router>
    // </>

    <>
      <div 
        style={{ 
          display: 'flex',
          flexDirection: 'column',
          background: 'silver',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%'
        }}
      >
        <h2>Site currently not available</h2>
        <div className="col-12 col-md-4">
          <div className="download-apps">
            <h4>Download our app</h4>
            <div className="app-linkss">
              <a href="https://apps.apple.com/gh/app/asasefie/id1666692315">
                <FontAwesomeIcon icon={faApple} size="2x" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.asasefie.realestate.app&hl=en&gl=US">
                <FontAwesomeIcon icon={faGooglePlay} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pages
