import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const togglePassword = () => {
    setVisible(!visible);
  };

  let schema = yup.object().shape({
    email: yup.string().required("Email is Required").email("Email should be valid"),
    password: yup.string().required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (value) => {
      dispatch(login(value));
    }
  });

  const {
    user,
    isLoading,
    isError,
    isSuccess,
    message
  } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess, message]);

  return (
    <div className='py-5' style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
        <h3 className='text-center'>Login</h3>
        <p className='text-center'>Login to your account to continue</p>
        <div className="error-large text-center">
          {message.message === "Rejected" ? "You are not an admin!" : ""}
        </div>
        <form action="" className="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type='text'
            name="email"
            label='Email Address'
            id='email'
            value={formik.values.email}
            onChange={formik.handleChange("email")}
          />
          <div className='error'>
            {formik.touched.email && formik.errors.email ? (
              <div>
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <CustomInput
            type={visible ? "text" : "password"}
            name="password"
            label='Password'
            id='pass'
            value={formik.values.password}
            onChange={formik.handleChange("password")}
          />
          <div className='error'>
            {formik.touched.password && formik.errors.password ? (
              <div>
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className='mb-3 text-end mt-2 d-flex justify-content-between'>
            <span className='pointer' onClick={togglePassword}>
              {visible === false ? <FaEye /> : <FaEyeSlash />}
            </span>
            {/* <Link to='forgot-password' className=''>
              Forgot Password?
            </Link> */}
          </div>
          <button
            to='/admin'
            className='border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5'
            style={{ background: '#ffd333' }}
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login