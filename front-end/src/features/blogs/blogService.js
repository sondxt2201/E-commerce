import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/axiosConfig";

const getAllBlog = async (data) => {
  const response = await axios.get(`${base_url}blog/all-blog?${data?.category ? `category=${data?.category}&&` : ""}`);
  if (response.data) {
    console.log(response.data)
    return response.data;
  }
};

const getABlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`, config);
  if (response.data) {
    return response.data;
  }
};


export const blogService = {
  getAllBlog,
  getABlog,
};
