import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../assets/images/prodcompare.svg";
import wish from "../assets/images/wish.svg";
import wishlist from "../assets/images/wishlist.svg";
import watch from "../assets/images/watch.jpg";
import watch2 from "../assets/images/watch-2.webp";
import addcart from "../assets/images/add-cart.svg";
import view from "../assets/images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";


const ProductCard = (props) => {
  const { grid, data } = props;
  let location = useLocation();
  const dispatch = useDispatch();

  const add2Wishlist = (id) => {
    dispatch(addToWishlist(id))
  }

  return (
    <>
      {
        data?.map((item, index) => {
          return (
            <div
              key={index}
              className={`${location.pathname == "/product"
                ? `gr-${grid}`
                : (location.pathname == "/wish-list"
                  ? `gr-${grid}`
                  : 'col-3')}`}
            >
              <Link
                className="product-card position-relative"
              // to={`${location.pathname == "/"
              //   ? "/product/:id"
              //   : location.pathname == "/product/:id"
              //     ? "/product/:id"
              //     : location.pathname == "/wish-list"
              //       ? "/product/:id"
              //       : ":id"
              //   }`}
              >
                <div className="wishlist-icon position-absolute">
                  <button className="border-0 bg-transparent" onClick={() => add2Wishlist(item?._id)}>
                    <img src={wish} alt="wishlist" />
                  </button>
                </div>
                <div className="product-image">
                  <img
                    src={item?.images[0]?.url}
                    className="img-fluid mx-auto"
                    alt="product image"

                  />
                  <img
                    src={item?.images[1]?.url}
                    className="img-fluid mx-auto"
                    alt="product image"

                  />
                </div>
                <div className="product-details">
                  <h6 className="brand">
                    {item?.brand}
                  </h6>
                  <h5 className="product-title">
                    {item?.title}
                  </h5>
                  <ReactStars
                    count={5}
                    size={24}
                    value={parseInt(item?.totalrating)}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p
                    className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  >
                  </p>
                  <p className="price">${item?.price}</p>
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-15">
                    <button className="border-0 bg-transparent">
                      <img src={prodcompare} alt="compare" />
                    </button>
                    <button className="border-0 bg-transparent">
                      <img src={view} alt="view" />
                    </button>
                    <button className="border-0 bg-transparent">
                      <img src={addcart} alt="addcart" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          )
        })
      }
    </>
  );
};

export default ProductCard;
