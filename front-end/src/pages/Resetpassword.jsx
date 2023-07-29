import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import * as yup from 'yup';
import { useFormik } from "formik";
import { forgotPasswordToken, resetPassword } from "../features/user/userSlice";
import { useDispatch } from "react-redux";


const passwordSchema = yup.object({
  password: yup.string().required("Password is Required")
});


const Resetpassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getToken = location.pathname.split("/")[2];

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(resetPassword({
        token: getToken,
        password: values.password
      }));
      navigate("/login")
    },
  });


  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <section className="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Reset Password</h3>
                <form action="" className="d-flex flex-column gap-15" onSubmit={formik.handleSubmit}>
                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.password && formik.errors.password}
                  </div>
                  <CustomInput
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.password && formik.errors.password}
                  </div>
                  <div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0">Ok</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resetpassword;
