import React, { useState } from 'react'
import BreadCrumb from '../components/BreadCrumb';
import { useFormik } from "formik";
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/user/userSlice';
import { FiEdit } from "react-icons/fi";


const profileSchema = yup.object({
    firstname: yup.string().required("First name is Required"),
    lastname: yup.string().required("Last name is Required"),
    email: yup.string().required("Email is Required").email("Email should be valid"),
    mobile: yup.string().required("Mobile is Required"),
});


const Profile = () => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state?.auth?.user);
    const [edit, setEdit] = useState(true);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: userState?.firstname,
            lastname: userState?.lastname,
            email: userState?.email,
            mobile: userState?.mobile,
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            dispatch(updateProfile(values));
            setEdit(!edit)
        },
    });


    return (
        <>
            <BreadCrumb title='Profile' />
            <section className='cart-wrapper home-wrapper-2 py-5'>
                <div className="container-xxl">
                    <div className='row'>
                        <div className='col-12'>
                            <div className='d-flex justify-content-start align-items-center'>
                                <h3 className='my-3'>Updated Profile</h3>
                                <FiEdit onClick={() => setEdit(!edit)} style={{ cursor: "pointer", margin: "20px" }} className='fs-3' />
                            </div>
                        </div>
                        <div className='col-12'>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="firstname" className="form-label">First Name</label>
                                    <input
                                        disabled={edit}
                                        type="text"
                                        name="firstname"
                                        className="form-control"
                                        id="firstname"
                                        // aria-describedby="emailHelp"
                                        value={formik.values.firstname}
                                        onChange={formik.handleChange("firstname")}
                                        onBlur={formik.handleBlur("firstname")}
                                    />
                                    <div className="error ms-2 my-1">
                                        {formik.touched.firstname && formik.errors.firstname}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastname" className="form-label">Last Name</label>
                                    <input
                                        disabled={edit}
                                        type="text"
                                        name="lastname"
                                        className="form-control"
                                        id="lastname"
                                        value={formik.values.lastname}
                                        onChange={formik.handleChange("lastname")}
                                        onBlur={formik.handleBlur("lastname")}
                                    />
                                    <div className="error ms-2 my-1">
                                        {formik.touched.lastname && formik.errors.lastname}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        disabled={edit}
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        id="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange("email")}
                                        onBlur={formik.handleBlur("email")}
                                    />
                                    <div className="error ms-2 my-1">
                                        {formik.touched.email && formik.errors.email}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobile" className="form-label">Phone Number</label>
                                    <input
                                        disabled={edit}
                                        type="text"
                                        name="mobile"
                                        className="form-control"
                                        id="mobile"
                                        value={formik.values.mobile}
                                        onChange={formik.handleChange("mobile")}
                                        onBlur={formik.handleBlur("mobile")}
                                    />
                                    <div className="error ms-2 my-1">
                                        {formik.touched.mobile && formik.errors.mobile}
                                    </div>
                                </div>
                                {edit === false && (
                                    <button type="submit" className="btn btn-primary" >Save</button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile