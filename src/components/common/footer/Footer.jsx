import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="download-apps">
              <h4>Download our app</h4>
              <div className="app-links">
                <a href="https://apps.apple.com/gh/app/asasefie/id1666692315">
                  <FontAwesomeIcon icon={faApple} size="2x" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.asasefie.realestate.app&hl=en&gl=US">
                  <FontAwesomeIcon icon={faGooglePlay} size="2x" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8">
            <div className="footer-menu">
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="https://www.privacypolicies.com/live/315f063d-1a54-4050-b229-eb4bde71186f">Privacy Policy</a></li>
                {/* <li><a href="#">Terms and Conditions</a></li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
