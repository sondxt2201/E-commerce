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
      <div
        className={`${location.pathname == "/product"
          ? `gr-${grid}`
          : (location.pathname == "/wish-list"
            ? `gr-${grid}`
            : 'col-3')}`}
      >
        <Link
          className="product-card position-relative"
          // to={`${location.pathname == "/"
          //   ? `/product/${data?._id}`
          //   : location.pathname == `/product/${data?._id}`
          //     ? `/product/${data?._id}`
          //     : location.pathname == "/wish-list"
          //       ? `/product/${data?._id}`
          //       : `${data?._id}`
          //   }`}
        >
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent" onClick={() => add2Wishlist(data?._id)}>
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img
              src={data?.images[0]?.url
                ? data?.images[0]?.url
                : "https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=826&t=st=1689703013~exp=1689703613~hmac=8cc035843cbb13edd969450e9ad63b1d2da1106899d1c13e869e01c47969fa55"}
              className="img-fluid mx-auto"
              alt="product image"
              style={{
                height: '270px',
                width: '201px',
              }}
            />
            <img
              src={data?.images[1]?.url
                ? data?.images[1]?.url
                : "https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=826&t=st=1689703013~exp=1689703613~hmac=8cc035843cbb13edd969450e9ad63b1d2da1106899d1c13e869e01c47969fa55"}
              className="img-fluid mx-auto"
              alt="product image"
              style={{
                height: '270px',
                width: '201px',
              }}
            />
          </div>
          <div className="product-details">
            <h6 className="brand">
              {data?.brand}
            </h6>
            <h5 className="product-title">
              {data?.title}
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={parseInt(data?.totalrating)}
              edit={false}
              activeColor="#ffd700"
            />
            <p
              className={`description ${grid === 12 ? "d-block" : "d-none"}`}
              dangerouslySetInnerHTML={{ __html: data?.description }}
            >
            </p>
            <p className="price">${data?.price}</p>
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
    </>
  );
}

export default ProductCard;
