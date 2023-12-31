import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAllCategory, getAllProduct, getProductByCategory } from '../features/products/productSlice';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartState = useSelector(state => state?.auth?.cartProducts)
  const authState = useSelector(state => state.auth)
  const productState = useSelector(state => state?.product?.products)
  const categoryState = useSelector(state => state?.product?.categories)

  const [paginate, setPaginate] = useState(true);
  const [productOpt, setProductOpt] = useState([]);
  const [category, setCategory] = useState(null);


  useEffect(() => {
    dispatch(getAllCategory())
  }, [])

  useEffect(() => {
    dispatch(getProductByCategory({ category }));
  }, [category])

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index]
      data.push({
        id: index,
        prod: element?._id,
        name: element?.title
      })
    }
    setProductOpt(data);
  }, [productState])

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

  const handlelogout = () => {
    localStorage.clear()
    window.location.reload()
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
                <Link className='text-white' to="/">DigiSmart</Link>
              </h2>
            </div>
            <div className='col-5'>
              <div className="input-group">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log('Results paginated')}
                  options={productOpt}
                  paginate={paginate}
                  labelKey={"name"}
                  placeholder="Search for Products..."
                  minLength={2}
                  onChange={(values) => {
                    navigate(`/product/${values[0]?.prod}`)
                  }}
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className='fs-6' />
                </span>
              </div>
            </div>
            <div className='col-5'>
              <div className='header-upper-links d-flex align-items-center justify-content-evenly'>
                {/* <div>
                  <Link className='d-flex align-items-center gap-10 text-white' to="/compare-product">
                    <img src='images/compare.svg' alt='compare' />
                    <p className='mb-0'>
                      Compare <br /> Products
                    </p>
                  </Link>
                </div> */}
                <div>
                  <Link className='d-flex align-items-center gap-10 text-white' to="/wish-list">
                    <img src='images/wishlist.svg' alt='wishlist' />
                    <p className='mb-0'>
                      Favorite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div className='dropdown-header'>
                  <Link
                    to={authState?.user === null ? "/login" : "/user-profile"}
                    className='d-flex align-items-center gap-10 text-white'
                  >
                    <img src='images/user.svg' alt='user' />
                    {
                      authState?.user === null ? (
                        <p className='mb-0'>
                          Login <br /> My account
                        </p>
                      ) : (
                        <div className='mb-0'>
                          Welcome <br /> {authState?.user?.firstname + " " + authState?.user?.lastname}
                          <ul className="dropdown-menu-header">
                            <li>
                              <span className='border border-0 bg-transparent text-white text-uppercase' type='button' onClick={() => handlelogout()}> Logout</span>
                            </li>
                          </ul>
                        </div>
                      )

                    }
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
                      {
                        categoryState
                          ? ((categoryState?.map((item, index) => {
                            return (
                              <>
                                <li key={index} onClick={() => {
                                  setCategory(item.title)
                                }}
                                >
                                  <Link className="dropdown-item text-white" to="/product">{item.title}</Link>
                                </li>
                              </>
                            )
                          })))
                          : (
                            <>
                            </>
                          )
                      }
                    </ul>
                  </div>
                </div>
                <div className='menu-links'>
                  <div className='d-flex align-items-center gap-15'>
                    <NavLink className='' to='/'>Home</NavLink >
                    <NavLink className='' to='/product'>Our Store</NavLink >
                    <NavLink className='' to='/user-order'>My Order</NavLink >
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