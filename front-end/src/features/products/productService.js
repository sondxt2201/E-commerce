import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/axiosConfig";

const getAllProduct = async (data) => {
  const response = await axios.get(`${base_url}product/all-product?${data?.brand ? `brand=${data?.brand}&&` : ""}${data?.tag ? `tags=${data?.tag}&&` : ""}${data?.category ? `category=${data?.category}&&` : ""}${data?.sort ? `sort=${data?.sort}&&` : ""}${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}`);
  if (response.data) {
    return response.data;
  }
};

const getProductByCategory = async (data) => {
  const response = await axios.get(`${base_url}product/all-product?${data?.category ? `category=${data?.category}&&` : ""}`);
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

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/all-category`);

  return response.data;
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
  rateProduct,
  getProductCategories,
  getProductByCategory
};
