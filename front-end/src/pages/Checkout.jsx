import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserCart } from "../features/user/userSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import * as ntc from "ntcjs";
import { useState } from "react";

const shippingSchema = yup.object({
  country: yup.string().required("Country is Required"),
  firstname: yup.string().required("First name is Required"),
  lastname: yup.string().required("Last name is Required"),
  address: yup.string().required("Address is Required"),
  city: yup.string().required("City is Required"),
  state: yup.string().required("State/District is Required"),
  pincode: yup.string().required("Zip code is Required"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector(state => state?.auth?.cartProducts)
  const [shippingInfo, setShippingInfo] = useState(null);

  useEffect(() => {
    dispatch(getUserCart())
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      country: "",
      firstname: "",
      lastname: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values)
      console.log(shippingInfo)
    },
  })

  const totalPrice = () => {
    let total = 0;
    if (cartState) {
      cartState?.forEach((item) => {
        total += (item?.price * item?.quantity)
      });
    }
    return total;
  }

  const totalFee = (shippingFee) => {
    let totalFee = 0;
    totalFee = totalPrice() + parseInt(shippingFee)
    return totalFee;
  }

  return (
    <>
      <section className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">Check out</h3>
                <nav
                  style={{ "--bs-breadcrumb-divider": ">" }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link className="text-dark total-price"
                        to="/cart"
                      >
                        Cart/
                      </Link>
                    </li>
                    {/* &nbsp; / &nbsp; */}
                    <li
                      className="breadcrumb-item total-price active"
                      aria-current="page"
                    >
                      Information/
                    </li>
                    {/* &nbsp; / &nbsp; */}
                    <li
                      className="breadcrumb-item total-price active"
                      aria-current="page"
                    >
                      Shipping/
                    </li>
                    {/* &nbsp; / &nbsp; */}
                    <li
                      className="breadcrumb-item total-price active"
                      aria-current="page"
                    >
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className="title total">Contact Information</h4>
                <p className="user-details total">
                  SonDXT (SON.DXT182755@sis.hust.edu.vn)
                </p>
                <h4 className="mb-3">Shipping Address</h4>
                <form
                  onSubmit={formik.handleSubmit}
                  action=""
                  className="d-flex gap-15 flex-wrap justify-content-between"
                >
                  <div className="w-100">
                    <select
                      className="form-control form-select"
                      id=""
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange("country")}
                      onBlur={formik.handleBlur("country")}
                    >
                      <option value="" selected disabled>
                        --- Select Country ---
                      </option>
                      <option value="vietnam" >
                        Việt Nam
                      </option>
                      <option value="china" >
                        China
                      </option>
                      <option value="japan" >
                        Japan
                      </option>
                    </select>
                    <div className="error ms-2 my-1">
                      {formik.touched.country && formik.errors.country}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      value={formik.values.firstname}
                      onChange={formik.handleChange("firstname")}
                      onBlur={formik.handleBlur("firstname")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      value={formik.values.lastname}
                      onChange={formik.handleChange("lastname")}
                      onBlur={formik.handleBlur("lastname")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Address"
                      className="form-control"
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Apartment, Suite ,etc"
                      className="form-control"
                      value={formik.values.other}
                      onChange={formik.handleChange("other")}
                      onBlur={formik.handleBlur("other")}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <select
                      className="form-control form-select"
                      id=""
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                    >
                      <option value="" selected disabled>
                        --- Select City ---
                      </option>
                      <option value="hanoi">
                        Hà Nội
                      </option>
                      <option value="saigon">
                        Tp Hồ Chí Minh
                      </option>
                      <option value="danang">
                        Đà Nẵng
                      </option>
                    </select>
                    <div className="error ms-2 my-1">
                      {formik.touched.city && formik.errors.state}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="State/District"
                      className="form-control"
                      value={formik.values.state}
                      onChange={formik.handleChange("state")}
                      onBlur={formik.handleBlur("state")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.state && formik.errors.state}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Zip code"
                      className="form-control"
                      value={formik.values.pincode}
                      onChange={formik.handleChange("pincode")}
                      onBlur={formik.handleBlur("pincode")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.pincode && formik.errors.pincode}
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/cart" className="text-dark">
                        <BiArrowBack className="me-2" />
                        Return to Cart
                      </Link>
                      <Link to="/cart" className="button">
                        Continue to Shipping
                      </Link>
                      <button className="button" type="submit">
                        Place Order
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4">
                {cartState && cartState?.map((item, index) => {
                  return (
                    <div className="d-flex gap-10 mb-2 align-align-items-center" key={index}>
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.quantity}
                          </span>
                          <img
                            src={item?.productId?.images
                              ? item?.productId?.images[0]?.url
                              : "https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=826&t=st=1689703013~exp=1689703613~hmac=8cc035843cbb13edd969450e9ad63b1d2da1106899d1c13e869e01c47969fa55"}
                            className="img-fluid"
                            alt="product"
                            style={{ width: "98.63px", height: "98.63px" }}
                          />
                        </div>
                        <div>
                          <h5 className="total-price">{item?.productId?.title}</h5>
                          <p className="d-flex gap-3">Color:
                            <ul className="colors ps-0">
                              <li style={{ backgroundColor: item?.color?.title }} ></li>
                            </ul>
                            <span>{ntc.name(item?.color?.title)[1]}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">${item?.quantity * item?.price}</h5>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Subtotal</p>
                  <p className="total-price">${totalPrice()}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">$5</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">${totalFee(5)}</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
