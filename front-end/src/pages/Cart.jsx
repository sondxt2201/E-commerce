import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, removeAProduct, updateAProduct } from "../features/user/userSlice";
import * as ntc from "ntcjs";

const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const userCartState = useSelector((state) => state?.auth?.cartProducts);

  useEffect(() => {
    dispatch(getUserCart())
  }, [])

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(updateAProduct({
        id: productUpdateDetail?.id,
        quantity: productUpdateDetail?.quantity
      }));
      setTimeout(() => {
        dispatch(getUserCart())
      }, 300);
    }
  }, [productUpdateDetail])

  const deleteAProduct = (id) => {
    dispatch(removeAProduct(id));
    setTimeout(() => {
      dispatch(getUserCart())
    }, 300);
  }

  const totalPrice = () => {
    let total = 0;
    if (userCartState) {
      userCartState?.forEach((item) => {
        total += (item?.price * item?.quantity)
      });
    }
    return total;
  }

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>
              {userCartState && userCartState?.map((item, index) => {
                return (
                  <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          src={item?.productId?.images
                            ? item?.productId?.images[0]?.url
                            : "https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=826&t=st=1689703013~exp=1689703613~hmac=8cc035843cbb13edd969450e9ad63b1d2da1106899d1c13e869e01c47969fa55"}
                          className="img-fluid"
                          alt="product image" />
                      </div>
                      <div className="w-75">
                        <p className="">{item?.productId?.title}</p>
                        <div className="d-flex gap-3">Color:
                          <ul className="colors ps-0">
                            <li style={{ backgroundColor: item?.color?.title }} ></li>
                          </ul>
                          <span>{ntc.name(item?.color?.title)[1]}</span>
                        </div>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">${item?.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          name=""
                          min={0}
                          max={item?.productId?.quantity}
                          id=""
                          value={item?.quantity}
                          onChange={(e) => { setProductUpdateDetail({ id: item?._id, quantity: e.target.value }) }}
                        />
                      </div>
                      <div>
                        <AiFillDelete className="text-danger " onClick={() => deleteAProduct(item?._id)} />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">${item?.quantity * item?.price}</h5>
                    </div>
                  </div>
                )
              })}

            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/product" className="button">
                  Continue To Shopping
                </Link>
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: ${totalPrice()}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/check-out" className="button">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
