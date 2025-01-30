import React from 'react';
import '../App.css';

const Footer = () => {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <footer className="footer">
        <div className="footer-social-media">
          <div className="footer-social-links">
            <a href="https://www.facebook.com" className="social-icon" aria-label="Facebook">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://youtube.com" className="social-icon" aria-label="YouTube">
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a href="https://www.instagram.com" className="social-icon" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.twitter.com" className="social-icon" aria-label="Twitter">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://github.com/ramya1128" className="social-icon" aria-label="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://wa.me/918015714320" className="social-icon" aria-label="WhatsApp">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a href="mailto:s.ramya1128@gmail.com" className="social-icon" aria-label="Email">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
        <div className="footer-bar">
          <p className="footer-copy">
            Copyright &copy; 2025; Designed by <b>Ramya S</b>
          </p>
          <pre className="foote-pre"><a className='a1' href='https://www.iubenda.com/en/help/2859-terms-and-conditions-when-are-they-needed'>Privacy Policy</a>  |  
          <a className='a1' href='https://www.iubenda.com/en/help/2859-terms-and-conditions-when-are-they-needed'>Security</a>  |  
          <a className='a1' href='https://www.iubenda.com/en/help/2859-terms-and-conditions-when-are-they-needed'>Terms & Condition</a>  |  
          <a className='a1' href='https://www.iubenda.com/en/help/2859-terms-and-conditions-when-are-they-needed'>Manage Cookie</a></pre>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
