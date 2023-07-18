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

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = () => {
    dispatch(getABlog(getBlogId))
  };

  const blogState = useSelector(state => state?.blog?.blog)
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
                    ? blogState?.img[0]?.url
                    : "https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=826&t=st=1689703013~exp=1689703613~hmac=8cc035843cbb13edd969450e9ad63b1d2da1106899d1c13e869e01c47969fa55"}
                  className="img-fluid w-75 my-4"
                  alt="blog"
                />
                <p dangerouslySetInnerHTML={{ __html: blogState?.description?.substr(0, 15) + "...", }} >
                </p>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default SingleBlog;
