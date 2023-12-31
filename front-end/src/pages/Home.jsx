import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Link, useNavigate } from 'react-router-dom';
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import { service } from '../utils/Data';
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog } from "../features/blogs/blogSlice";
import { getAllProduct } from "../features/products/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogState = useSelector((state) => state?.blog?.blogs)
  const productState = useSelector((state) => state?.product?.products);

  useEffect(() => {
    allBlog();
    allProduct();
  }, []);

  const allBlog = () => {
    dispatch(getAllBlog())
  };

  const allProduct = () => {
    dispatch(getAllProduct())
  }

  return (
    <>
      <section className='home-wrapper-1 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-6'>
              <div
                className='main-banner position-relative rounded-3'
                style={{ overflow: 'hidden', cursor: "pointer" }}
                onClick={() => {
                  navigate('/product/64d51036a67c225d526a2317')
                }}
              >
                <img
                  className='img-fluid rounded-3'
                  src='https://www.apple.com/v/macbook-air/q/images/overview/macbook_air__d2234mv3oe0y_large.jpg'
                  alt='main banner'
                  style={{
                    right: '-270px',
                    width: '100%',
                    position: 'relative',
                    height: '418px',
                  }}
                />
                <div className="main-banner-content position-absolute">
                  <h4>Strikingly thin and fast <br />
                    so you can work, play, <br />
                    or create anywhere.</h4>
                  <h5>MacBook Air</h5>
                  <p>From $1299 <br />
                    or <br />
                    $108.25/mo. for 12 mo.*</p>
                  <Link className='button'>BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-10">
                <div className="small-banner position-relative"
                  style={{ overflow: 'hidden', cursor: "pointer" }}
                  onClick={() => {
                    navigate('/product/64d51036a67c225d526a2317')
                  }}
                >
                  <img
                    className='img-fluid rounded-3'
                    src='images/catbanner-01.jpg'
                    alt='main banner'
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>BEST SALE</h4>
                    <h5>MacBook Air 15”</h5>
                    <p>From $1299 <br />
                      or <br />
                      $108.25/mo. for 12 mo.*</p>
                  </div>
                </div>
                <div className="small-banner position-relative"
                  style={{ overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/product/64cc0d098e791a35b2a9fb4a')
                  }}
                >
                  <img
                    className='img-fluid rounded-3'
                    src='images/catbanner-02.jpg'
                    alt='main banner'
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>Apple Watch Ultra</h5>
                    <p>From $799.00 <br />
                      or <br />
                      $33.29/mo.per month for 24 mo.*</p>
                  </div>
                </div>
                <div className="small-banner position-relative"
                  style={{ overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/product/64d5126ca67c225d526a27c6')
                  }}
                >
                  <img
                    className='img-fluid rounded-3'
                    src='images/catbanner-03.jpg'
                    alt='main banner'
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>iPad Air</h5>
                    <p>From $599 <br />
                      or <br />
                      $49.91/mo.per month for 12 mo.*</p>
                  </div>
                </div>
                <div className="small-banner position-relative"
                  style={{ overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/product/64cc14563cd6106c6b78f557')
                  }}
                >
                  <img
                    className='img-fluid rounded-3'
                    src='images/catbanner-04.jpg'
                    alt='main banner'
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>AirPods Max</h5>
                    <p>From $549.00 <br />
                      or <br />
                      $91.50/mo.per month for 6 mo.*</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='home-wrapper-2 py-5'>
        <div className="container-xl">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                {service?.map((item, index) => {
                  return (
                    <div className='d-flex align-items-center gap-15' key={index}>
                      <img src={item.image} alt='services' />
                      <div>
                        <h6>{item.title}</h6>
                        <p className='mb-0'>{item.tagline}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                <div
                  className="d-flex gap align-items-center"
                  onClick={() => navigate('/product')}
                  style={{
                    cursor: 'pointer'
                  }}>
                  <div>
                    <h6>Laptop</h6>
                    {/* <p>10 Items</p> */}
                  </div>
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/44/303500/msi-gaming-gf63-thin-11sc-i5-664vn-glr-thumb-600x600.jpg"
                    alt="Gaming"
                    style={{
                      height: '110px',
                      width: '110px',
                    }}
                  />
                </div>
                <div
                  className="d-flex gap align-items-center"
                  onClick={() => navigate('/product')}
                  style={{
                    cursor: 'pointer'
                  }}>
                  <div>
                    <h6>Cellphone</h6>
                    {/* <p>10 Items</p> */}
                  </div>
                  <img
                    src="https://cdn2.cellphones.com.vn/150x,webp,q70/media/tmp/catalog/product/p/i/pin-trau-0092.png"
                    alt="Celphone"
                    style={{
                      height: '110px',
                      width: '110px',
                    }}
                  />
                </div>

                <div
                  className="d-flex gap align-items-center"
                  onClick={() => navigate('/product')}
                  style={{
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <h6>Speaker</h6>
                    {/* <p>10 Items</p> */}
                  </div>
                  <img
                    src="https://cdn2.cellphones.com.vn/150x,webp,q70/media/catalog/product/l/o/loa-karaoke_1.png"
                    alt="speaker"
                    style={{
                      height: '110px',
                      width: '110px',
                    }}
                  />
                </div>

                <div
                  className="d-flex gap align-items-center"
                  onClick={() => navigate('/product')}
                  style={{
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <h6>Smart Watches</h6>
                    {/* <p>10 Items</p> */}
                  </div>
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/7077/248752/samsung-galaxy-watch-4-40mm-tn-2-600x600.jpg"
                    alt="smart-watch"
                    style={{
                      height: '110px',
                      width: '110px',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Featured Collection</h3>
            </div>
            <div className="row" >
              {productState && productState?.map((item, index) => {
                if (item.tags === "featured")
                  return (
                    <ProductCard
                      key={index}
                      data={item}
                    />
                  )
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="famous-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/famous-1.webp"
                  className="img-fluid"
                  alt="famous"
                  style={{ overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/product/64d51842a67c225d526a33f8')
                  }}
                />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 8</h6>
                  <p>From $399or $16.62/mo. for 24 mo.*</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative"
                style={{ overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => {
                  navigate('/product/64d519bca67c225d526a36ed')
                }}
              >
                <img
                  src="images/famous-2.webp"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">Studio Display</h5>
                  <h6 className="text-dark">600 nits of brightness.</h6>
                  <p className="text-dark">27-inch 5K Retina display</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/famous-3.webp"
                  className="img-fluid"
                  alt="famous"
                  style={{ overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/product/64cc12d33cd6106c6b78f51f')
                  }}
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">smartphones</h5>
                  <h6 className="text-dark">Smartphone 14 Pro.</h6>
                  <p className="text-dark">
                    From $999.00 or $41.62/mo. for 24 mo.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative"
                style={{ overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => {
                  navigate('/product/64d51c5aa67c225d526a3a01')
                }}
              >
                <img
                  src="images/famous-4.webp"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">home speakers</h5>
                  <h6 className="text-dark">Room-filling sound.</h6>
                  <p className="text-dark">
                    From $299
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Special Products</h3>
            </div>
          </div>
          <div className="row" >
            {productState && productState?.map((item, index) => {
              if (item.tags === "special")
                return (
                  <SpecialProduct
                    key={index}
                    data={item}
                  />
                )
            })}
          </div>
        </div>
      </section>
      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Popular Products</h3>
            </div>
          </div>
          <div className="row" >
            {productState && productState?.map((item, index) => {
              if (item.tags === "popular")
                return (
                  <ProductCard
                    key={index}
                    data={item}
                  />
                )
            })}
          </div>
        </div>
      </section>
      <section class1="marque-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img src="images/brand-01.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-02.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-03.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-04.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-05.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-06.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-07.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-08.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class1="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Latest Blogs</h3>
            </div>
          </div>
          <div className="row">
            {blogState?.map((item, index) => {
              if (index <= 4) {
                return (
                  <div className="col-3" key={index}>
                    <BlogCard
                      data={item}
                    />
                  </div>
                )
              }
            })}

          </div>
        </div>
      </section>
    </>
  )
}

export default Home