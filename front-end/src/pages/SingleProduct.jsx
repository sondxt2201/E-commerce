import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import watch from "../assets/images/watch.jpg";
import watch2 from "../assets/images/watch-1.avif";
import { useDispatch, useSelector } from "react-redux";
import { addRating, addToWishlist, getAProduct, getAllProduct } from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProd2Cart, getUserCart } from "../features/user/userSlice";


const SingleProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getProductId = location.pathname.split("/")[2];
  const productState = useSelector(state => state?.product?.product)
  const lstProductState = useSelector(state => state?.product?.products)
  const cartState = useSelector(state => state?.auth?.cartProducts)

  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [orderedProduct, setorderedProduct] = useState(true);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const [img, setImg] = useState(productState?.images
    ? productState?.images[0]?.url
    : "htttps://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=826&t=st=1689703013~exp=1689703613~hmac=8cc035843cbb13edd969450e9ad63b1d2da1106899d1c13e869e01c47969fa55"
  );

  console.log(img)

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
    dispatch(getAllProduct());
    // dispatch(setImg(null))
  }, []);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId._id) {
        setAlreadyAdded(true)
      }
    }
  }, [])

  const add2Wishlist = () => {
    addToWishlist(getProductId);
  }

  const add2Cart = () => {
    if (color === null) {
      toast.error("Please Choose Color");
      return false;
    } else {
      dispatch(addProd2Cart({
        productId: getProductId,
        color: color,
        price: productState?.price,
        quantity: quantity,
      }));
      navigate('/cart')
    }
  };


  const props = {
    width: 600,
    height: 600,
    zoomWidth: 600,
    img: img
  };

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const closeModal = () => { };

  const addRatingProduct = () => {
    if (star == null) {
      toast.error("Please add star rating!")
      return false;
    }
    if (comment == null) {
      toast.error("Please write the review about the product!")
      return false;
    } else {
      dispatch(addRating({
        star: star,
        comment: comment,
        prodId: getProductId
      }))
    }
  }

  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title={productState?.title} />
      <section className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  <ReactImageZoom {...props} />
                </div>
              </div>
              <div className="other-product-images d-flex flex-wrap gap-15">
                {productState?.images?.map((item, index) => {
                  return (
                    <img
                      onClick={() => {
                        setImg(item.url)
                      }}
                      key={index}
                      // className="img-fluid"
                      style={{ maxWidth: '150px', height: 'auto' }}
                      src={item?.url
                        ? item?.url
                        : "https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=826&t=st=1689703013~exp=1689703613~hmac=8cc035843cbb13edd969450e9ad63b1d2da1106899d1c13e869e01c47969fa55"}
                      alt=""
                    />
                  )
                })}
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">
                    {productState?.title}
                  </h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">${productState?.price}</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={parseInt(productState?.totalrating)}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 t-review">{"2 Reviews"}</p>
                  </div>
                  <a className="review-btn" href="#review">
                    Write a Review
                  </a>
                </div>
                <div className=" py-3">
                  {/* <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Type:</h3>
                    <p className="product-data">{productState?.category}</p>
                  </div> */}
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Brand:</h3>
                    <p className="product-data">{productState?.brand}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Category:</h3>
                    <p className="product-data">{productState?.category}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Tags:</h3>
                    <p className="product-data">{productState?.tags}</p>
                  </div>
                  {/* <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Available:</h3>
                    <p className="product-data">{productState?.quantity > 0 ? productState?.quantity : "Out of Stock"}</p>
                  </div> */}
                  {/* <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">Size:</h3>
                    <div className="d-flex flex-wrap gap-15">
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        S
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        M
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XL
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XXL
                      </span>
                    </div>
                  </div> */}
                  {alreadyAdded === false
                    && (
                      <div className="d-flex gap-10 flex-column mt-2 mb-3">
                        <h3 className="product-heading">Color:</h3>
                        <Color colorData={productState?.color} setColor={setColor} />
                      </div>
                    )
                  }
                  <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                    {alreadyAdded === false
                      && (
                        <>
                          <h3 className="product-heading">Quantity:</h3>
                          <div className="">
                            <input
                              type="number"
                              name=""
                              min={1}
                              max={productState?.quantity}
                              className="form-control"
                              style={{ width: "70px" }}
                              id=""
                              value={quantity}
                              onChange={(e) => { setQuantity(e.target.value) }}
                            />
                          </div>
                        </>
                      )
                    }
                    <div className={`d-flex align-items-center gap-30 ms-5 ${alreadyAdded ? 'ms-0' : 'ms-5'} `}>
                      <button
                        className="button border-0"
                        // data-bs-toggle="modal"
                        // data-bs-target="#staticBackdrop"
                        type="button"
                        onClick={() => {
                          alreadyAdded ? navigate('/cart') : add2Cart()
                        }}
                      >
                        {alreadyAdded ? "Go to Cart" : "Add to Cart"}
                      </button>
                      <button className="button signup">Buy It Now</button>
                    </div>
                  </div>
                  {/* <div className="d-flex align-items-center gap-15">
                    <div>
                      <a href="">
                        <TbGitCompare className="fs-5 me-2" /> Add to Compare
                      </a>
                    </div>
                    <div
                    onClick={() =>
                      add2Wishlist()
                    }
                    >
                      <a href="">
                        <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                      </a>
                    </div>
                  </div> */}
                  <div className="d-flex gap-10 flex-column  my-3">
                    <h3 className="product-heading">Shipping & Returns :</h3>
                    <p className="product-data">
                      Free shipping and returns available on all orders! <br /> We
                      ship all US domestic orders within
                      <b> 5-10 business days!</b>
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-3">
                    <h3 className="product-heading">Product Link:</h3>
                    <a
                      href="#"
                      onClick={() => {
                        copyToClipboard(
                          window.location.href
                        );
                      }}
                    >
                      Copy Product Link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="bg-white p-3">
                <p
                  dangerouslySetInnerHTML={{ __html: productState?.description }}
                >
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="reviews-wrapper home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 id="review">Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value={parseInt(productState?.totalrating)}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">Based on {productState?.ratings?.length} Reviews</p>
                    </div>
                  </div>
                  {orderedProduct && (
                    <div>
                      <a className="text-dark text-decoration-underline" href="">
                        Write a Review
                      </a>
                    </div>
                  )}
                </div>
                <div className="review-form py-4">
                  <h4>Write a Review</h4>
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(e) => {
                        setStar(e)
                      }}
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      onChange={(e) => {
                        setComment(e.target.value)
                      }}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <button className="button border-0" type="button" onClick={addRatingProduct}>Submit Review</button>
                  </div>
                </div>
                <div className="reviews mt-4">
                  {productState && productState?.ratings?.map((item, index) => {
                    return (
                      <div className="review" key={index}>
                        <div className="d-flex gap-10 align-items-center">
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                            onChange={() => {

                            }}
                          />
                        </div>
                        <p className="mt-3">
                          {item?.comment}
                        </p>
                      </div>
                    )
                  })}

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
          </div>
          <div className="row">
            {lstProductState && lstProductState?.map((item, index) => {
              if (item.tags === "popular")
                return (
                  <ProductCard
                    key={index}
                    data={item}
                  />
                )
            })}
            {/* <ProductCard
              data={popularProduct}
            /> */}
          </div>
        </div>
      </section>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img src={watch} className="img-fluid" alt="product image" />
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">Apple Watch</h6>
                  <p className="mb-1">Quantity: 100</p>
                  <p className="mb-1">Color: black</p>
                  <p className="mb-1">Size: M</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button type="button" className="button" data-bs-dismiss="modal">
                View My Cart
              </button>
              <button type="button" className="button signup">
                Checkout
              </button>
            </div>
            <div className="d-flex justify-content-center py-3">
              <Link
                className="text-dark"
                to="/product"
                onClick={() => {
                  closeModal();
                }}
              >
                Continue To Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
