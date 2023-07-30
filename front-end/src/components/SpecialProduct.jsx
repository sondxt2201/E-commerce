import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";

const SpecialProduct = (props) => {
  const { data } = props;
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const add2Wishlist = (id) => {
    dispatch(addToWishlist(id))
  }

  return (
    <>
      <div className="col-6 mb-3">
        <div className="special-product-card">
          <div className="d-flex justify-content-between">
            <Link to={`/product/${data?._id}`}>
              <img
                alt="watch"
                style={{
                  width: "400px",
                  height: "320px",
                  paddingRight: "10px",
                }}
                src={data.images
                  ? data.images[0]?.url
                  : "https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=826&t=st=1689703013~exp=1689703613~hmac=8cc035843cbb13edd969450e9ad63b1d2da1106899d1c13e869e01c47969fa55"} className="img-fluid"

              />
            </Link>
            <div className="special-product-content" >
              <div
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/product/${data?._id}`)
                }}
              >
                <h5 className="brand">{data?.brand}</h5>
                <h6 className="title">{data?.title}</h6>
              </div>
              <ReactStars
                count={5}
                size={24}
                value={parseInt(data?.totalrating)}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
                <span className="red-p">{`$${data?.price}`}</span> &nbsp; <strike>{`$${data?.price + 500}`}</strike>
              </p>
              <div className="discount-till d-flex align-items-center gap-10">
                <p className="mb-0">
                  <b>5 </b>days
                </p>
                <div className="d-flex gap-10 align-items-center">
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>
                </div>
              </div>
              <div className="prod-count my-3">
                <p>Products: {data?.quantity}</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: data?.quantity / data?.quantity + data?.sold * 100 + "%" }}
                    aria-valuenow={data?.quantity / data?.quantity + data?.sold * 100}
                    aria-valuemin={data?.quantity}
                    aria-valuemax={data?.sold + data?.quantity}
                  ></div>
                </div>
              </div>
              <Link className="button">Add to Cart</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpecialProduct;
