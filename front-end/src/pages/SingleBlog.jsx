import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Meta from "../components/Meta";
import blog from "../assets/images/blog-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/blogs/blogSlice";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];
  const blogState = useSelector(state => state?.blog?.blog)

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = () => {
    dispatch(getABlog(getBlogId))
  };

  return (
    <>
      <Meta title={blogState?.title} />
      <BreadCrumb title={blogState?.title} />
      <section className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-9">
              <div className="single-blog-card">
                <Link to="/blogs" className="d-flex align-items-center gap-10">
                  <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
                </Link>
                <h3 className="title">{blogState?.title}</h3>
                <img
                  src={blogState?.img
                    ? blogState?.img[0]?._id
                    : "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/Samsung-Galaxy-S23-FE.jpeg"}
                  className="img-fluid w-75 my-4"
                  alt="blog"
                />
                <p dangerouslySetInnerHTML={{ __html: blogState?.description}} ></p>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default SingleBlog;
