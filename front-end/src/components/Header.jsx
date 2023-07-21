import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector(state => state?.auth?.cartProducts)

  // useEffect(() => {
  //   dispatch(totalPrice())
  // }, [cartState])

  const totalPrice = () => {
    let total = 0;
    if (cartState) {
      cartState?.forEach((item) => {
        total += (item?.price * item?.quantity)
      });
    }
    return total;
  }

  const totalItem = () => {
    let total = 0;
    if (cartState) {
      cartState?.forEach((item) => {
        total += item?.quantity
      });
    }
    return total;
  }

  return (
    <>
      <header className='header-top-strip py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-6'>
              <p className='text-white mb-0'>
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className='col-6'>
              <p className='text-end text-white mb-0'>
                Hotline: {""}
                <a className='text-white' href='tel: (+84) 8-4844-5844' />
                (+84) 8-4844-5844
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className='header-upper py-3'>
        <div className='container-xxl'>
          <div className='row align-items-center'>
            <div className='col-2'>
              <h2>
                <Link className='text-white' to="/">Digishop</Link>
              </h2>
            </div>
            <div className='col-5'>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2" />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className='fs-6' />
                </span>
              </div>
            </div>
            <div className='col-5'>
              <div className='header-upper-links d-flex align-items-center justify-content-between'>
                <div>
                  <Link className='d-flex align-items-center gap-10 text-white' to="/compare-product">
                    <img src='images/compare.svg' alt='compare' />
                    <p className='mb-0'>
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link className='d-flex align-items-center gap-10 text-white' to="/wish-list">
                    <img src='images/wishlist.svg' alt='wishlist' />
                    <p className='mb-0'>
                      Favorite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link className='d-flex align-items-center gap-10 text-white' to="/login">
                    <img src='images/user.svg' alt='user' />
                    <p className='mb-0'>
                      Login <br /> My account
                    </p>
                  </Link>
                </div>
                <div>
                  <Link className='d-flex align-items-center gap-10 text-white' to="/cart">
                    <img src='images/cart.svg' alt='cart' />
                    <div className='d-flex flex-column'>
                      <span className='badge bg-white text-dark'>
                        {totalItem()}
                      </span>
                      <p className='mb-0'>
                        ${totalPrice()}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className='header-bottom py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='menu-bottom d-flex align-items-center gap-30'>
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button" id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className='md-5 d-inline-block'>
                        Shop Categories
                      </span>
                    </button>
                    <ul className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1">
                      <li>
                        <Link className="dropdown-item text-white" to="#">Wacth</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="#">TV</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="#">Camera</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="#">Laptop</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='menu-links'>
                  <div className='d-flex align-items-center gap-15'>
                    <NavLink className='' to='/'>Home</NavLink >
                    <NavLink className='' to='/product'>Our Store</NavLink >
                    <NavLink className='' to='/blogs'>Blogs</NavLink >
                    <NavLink className='' to='/contact'>Contact</NavLink >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header