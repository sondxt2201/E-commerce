import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog, getAllBlogCat } from "../features/blogs/blogSlice";

const Blog = () => {
  const dispatch = useDispatch();
  const blogState = useSelector(state => state?.blog?.blogs)
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    let category = [];

    for (let index = 0; index < blogState.length; index++) {
      const element = blogState[index];
      category.push(element.category)
    }
    setCategories(category);
  }, [blogState]);


  useEffect(() => {
    dispatch(getAllBlog())
  }, [])

  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <section className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Find By Categories</h3>
                <div>
                  <ul className="ps-0">
                    {
                      categories && [...new Set(categories)].map((item, index) => {
                        return (
                          <>
                            <li key={index} onClick={() => setCategory(item)}>{item}</li>
                          </>
                        )
                      })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                {blogState?.filter(val => val.category == category).map((item, index) => (
                  <div className="col-6 mb-3" key={index}>
                    <BlogCard
                      data={item}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
