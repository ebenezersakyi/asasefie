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

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/contact' component={Contact} />

          <Route path='/search' component={Search} />
          <Route path="/currencydisclaimer" component={CurrencyDisclaimer} />
          <Route path="/downloadplatform" component={ChoosePlatform} />
          {/* <Route path="/signin" component={SignIn} /> */}
        </Switch>
      </Router>
    </>
  )
}

export default Pages
