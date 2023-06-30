import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BsLinkedin, BsGithub, BsFacebook, BsInstagram } from 'react-icons/bs';

const Footer = () => {
  return (
    <>
      <footer className='py-4'>
        <div className='container-xxl'>
          <div className='row align-items-center'>
            <div className='col-5'>
              <div className='footer-top-data d-flex gasp-30 align-items-center'>
                <img src='images/newsletter.svg' alt='' />
                <h2 className='mb-0 text-white'>Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className='col-7'>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2" />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-4'>
              <h4 className='text-white mb-4'>Contact Us</h4>
              <div className='footer-links d-flex flex-column'>
                <address className='text-white'>
                  Địa chỉ: Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội
                </address>
                <a href='tel: +84 8-4844-5844' className='mt-2 d-block mb-2 text-white'>+84 8-4844-5844</a>
                <a href='mailto: SON.DXT182755@SIS.HUST.EDU.VN' className='mt-2 d-block mb-2 text-white'>SON.DXT182755@SIS.HUST.EDU.VN</a>
                <div className='social-icons d-flex align-items-center gap-30 mt-4'>
                  <a className='text-white' href='#'>
                    <BsFacebook className='fs-4' />
                  </a>
                  <a className='text-white' href='#'>
                    <BsInstagram className='fs-4' />
                  </a>
                  <a className='text-white' href='#'>
                    <BsGithub className='fs-4' />
                  </a>
                  <a className='text-white' href='#'>
                    <BsLinkedin className='fs-4' />
                  </a>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <h4 className='text-white mb-4'>Information</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1' to="/privacy-policy">Privacy Policy</Link>
                <Link className='text-white py-2 mb-1' to="/refund-policy">Refund Policy</Link>
                <Link className='text-white py-2 mb-1' to="/shipping-policy">Shipping Policy</Link>
                <Link className='text-white py-2 mb-1' to="/term-and-conditions">Term & Conditions</Link>
                <Link className='text-white py-2 mb-1' to="/blogs">Blogs</Link>
              </div>
            </div>
            <div className='col-3'>
              <h4 className='text-white mb-4'>Account</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>About Us</Link>
                <Link className='text-white py-2 mb-1'>Faq</Link>
                <Link className='text-white py-2 mb-1'>Contact</Link>
              </div>
            </div>
            <div className='col-2'>
              <h4 className='text-white mb-4'>Quick Links</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Laptops</Link>
                <Link className='text-white py-2 mb-1'>Headphones</Link>
                <Link className='text-white py-2 mb-1'>Tables</Link>
                <Link className='text-white py-2 mb-1'>Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <p className='text-center mb-0 text-white'>
                &copy;{new Date().getFullYear()}; Powered by SonDXT
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer