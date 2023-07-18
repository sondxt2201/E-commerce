import React from "react";
import { Link } from "react-router-dom";
import Utility from "../utils/Utility";


const BlogCard = (props) => {
  const {data } = props;
  return (
    <div className="blog-card" style={{ margin: '5px' }} >
      <div className="card-image">
        <img
          src={data?.image
            ? data?.image[0]?.url
            : "https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=826&t=st=1689703013~exp=1689703613~hmac=8cc035843cbb13edd969450e9ad63b1d2da1106899d1c13e869e01c47969fa55"}
          className="img-fluid "
          alt="blog"
          style={{
            width: '250px',
            height: '250px',
          }}
        />
      </div>
      <div className="blog-content">
        {/* <p className="date">{Utility.GetFullDateMinuteString(new Date())}</p> */}
        <p className="date">{data?.createdAt}</p>
        <h5 className="title">{data?.title}</h5>
        <p
          className="desc"
          dangerouslySetInnerHTML={{ __html: data?.description.substr(0, 15) + "...", }}
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
