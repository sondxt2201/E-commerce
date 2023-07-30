import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
        <div className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent" onClick={() => add2Wishlist(data?._id)}>
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div
            className="product-image"
            onClick={() => navigate(`/product/${data?._id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img
              className="img-fluid mx-auto"
              alt="product image"
              src={(data?.images[0] !== undefined)
                ? data?.images[0]?.url
                : "https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=826&t=st=1689703013~exp=1689703613~hmac=8cc035843cbb13edd969450e9ad63b1d2da1106899d1c13e869e01c47969fa55"}
              style={{
                height: '270px',
                width: '200px',
              }}
            />
            <img
              className="img-fluid mx-auto"
              alt="product image"
              src={(data?.images[0] !== undefined)
                ? data?.images[0]?.url
                : "https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=826&t=st=1689703013~exp=1689703613~hmac=8cc035843cbb13edd969450e9ad63b1d2da1106899d1c13e869e01c47969fa55"}
              style={{
                height: '270px',
                width: '200px',
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
              <Link className="border-0 bg-transparent" to={`/product/${data?._id}`}>
                <img src={view} alt="view" />
              </Link>
              <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
