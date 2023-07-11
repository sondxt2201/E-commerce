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

// const updateProduct = async (product) => {
//   const response = await axios.put(
//     `${base_url}product/update-product/${product.id}`,
//     {
//       title: product.productData.title,
//       description: product.productData.description,
//       price: product.productData.price,
//       category: product.productData.category,
//       brand: product.productData.brand,
//       quantity: product.productData.quantity,
//       tags: product.productData.tags,
//       color: product.colors,
//       images: product.images
//     },
//     config
//   );
//   return response.data;
// };

export const productService = {
  getAllProduct,
  getAProduct,
  addToWishlist,
  // updateProduct,
};
