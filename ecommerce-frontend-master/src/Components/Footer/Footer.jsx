import React from 'react'
import './Footer.css'
import footer_logo from '../assets/logo_big.png'
import instagram from '../assets/instagram_icon.png'
import pinterster from '../assets/pintester_icon.png'
import whatsapp from '../assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>SHOPPEE</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={instagram} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={pinterster} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={whatsapp} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>© 2023 by Shoppee. Proudly created with Wix.com</p>
            </div>
    </div>
  )
}

export default Footer;