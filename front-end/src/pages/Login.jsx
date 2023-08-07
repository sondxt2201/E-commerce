import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import CustomInput from "../components/CustomInput";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/userSlice";
import * as yup from 'yup';
import { useFormik } from "formik";

const loginSchema = yup.object({
  email: yup.string().required("Email is Required").email("Email should be valid"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const authState = useSelector(state => state?.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const togglePassword = () => {
    setVisible(!visible);
  };

  const {
    isSuccess,
    isError,
    isLoading,
  } = authState;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  })

  useEffect(() => {
    if (authState.user !== null && authState.isError === false) {
      navigate("/")
    }
  }, [authState])


  // useEffect(() => {
  //   if (isSuccess == true) {
  //     navigate("/")
  //   }
  // }, [isSuccess])

  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />
      <section className="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Login</h3>
                <form
                  action=""
                  className="d-flex flex-column gap-15"
                  onSubmit={formik.handleSubmit}
                >
                  <CustomInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.email && formik.errors.email}
                  </div>
                  <CustomInput
                    type={visible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.password && formik.errors.password ? (
                      <div>
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <div className='mb-3 text-end mt-2 d-flex justify-content-between'>
                      <span className='pointer' onClick={togglePassword}>
                        {visible === false ? <FaEye /> : <FaEyeSlash />}
                      </span>
                      <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0" type="submit">
                        Login
                      </button>
                      <Link to="/sign-up" className="button signup">
                        SignUp
                      </Link>
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

export default Login;
