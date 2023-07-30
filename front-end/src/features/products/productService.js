import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/axiosConfig";

const getAllProduct = async () => {
  const response = await axios.get(`${base_url}product/all-product`);
  if (response.data) {
    return response.data;
  }
};

const getAProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);
  if (response.data) {
    return response.data;
  }
};

const addToWishlist = async (id) => {
  const response = await axios.put(
    `${base_url}product/wishlist`,
    { prodId: id },
    config);
  if (response.data) {
    return response.data;
  }
};

const rateProduct = async (data) => {
  const response = await axios.put(
    `${base_url}product/rating`,
    data,
    config);
  if (response.data) {
    return response.data;
  }
};

export const productService = {
  getAllProduct,
  getAProduct,
  addToWishlist,
  rateProduct
};
