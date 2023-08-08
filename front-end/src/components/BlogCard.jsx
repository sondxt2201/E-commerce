import React from "react";
import { Link } from "react-router-dom";
import Utility from "../utils/Utility";


const BlogCard = (props) => {
  const { data } = props;
  return (
    <div className="blog-card" style={{ margin: '5px' }} >
      <div className="card-image">
        <img
          src={data?.images[0]?.url
            ? data?.images[0]?.url
            : "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/Samsung-Galaxy-S23-FE.jpeg"}
          className="img-fluid "
          alt="blog"
          style={{
            width: '250px',
            height: '250px',
          }}
        />
      </div>
      <div className="blog-content">
        <p className="date">{Utility.GetFullDateMinuteString(data?.createdAt)}</p>
        <h5 className="title"
          style={{
            width: "100%",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            height: "65px"
          }}
        >{data?.title}
        </h5>
        <p
          className="desc"
          dangerouslySetInnerHTML={{ __html: data?.description?.substring(0, 15) }}
          
        ></p>
        <Link
          className="button"
          to={`/blog/${data?._id}`} >
          Read More
        </Link>
      </div>
    </div >
  );
};

export default BlogCard;
