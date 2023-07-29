import axios from "axios";
import { base_url } from "../../utils/axiosConfig";
import { config } from "../../utils/axiosConfig";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  };
  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${base_url}user/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  };
  return response.data;
};

const getWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  if (response.data) {
    return response.data;
  }
}

const add2Cart = async (cartData) => {
  const response = await axios.post(`${base_url}user/cart`, cartData, config);
  if (response.data) {
    return response.data;
  };
}

const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config);
  if (response.data) {
    return response.data;
  }
}

const removeProductFromCart = async (id) => {
  const response = await axios.delete(`${base_url}user/remove-product/${id}`, config);
  if (response.data) {
    return response.data;
  }
}

const updateProductFromCart = async (data) => {
  const response = await axios.delete(`${base_url}user/update-product/${data.id}/${data.quantity}`, config);
  if (response.data) {
    return response.data;
  }
}

const createOrder = async (orderDetail) => {
  const response = await axios.post(`${base_url}user/cart/create-order`, orderDetail, config);
  if (response.data) {
    return response.data;
  }
}

const getUserOrder = async () => {
  const response = await axios.get(`${base_url}user/order/get-order`, config);
  if (response.data) {
    return response.data
  }
}

const updateUserProfile = async (data) => {
  const response = await axios.put(`${base_url}user/edit-user`, data, config);
  if (response.data) {
    return response.data
  }
}

const forgotPassToken = async(data) => {
  const response = await axios.post(`${base_url}user/forgot-password-token`, data, config);
  if (response.data) {
    return response.data
  }
}

const resetPass = async(data) => {
  const response = await axios.put(`${base_url}user/reset-password/${data.token}`, {password: data?.password}, config);
  if (response.data) {
    return response.data
  }
}

export const authService = {
  register,
  login,
  getWishlist,
  add2Cart,
  getCart,
  removeProductFromCart,
  updateProductFromCart,
  createOrder,
  getUserOrder,
  updateUserProfile,
  forgotPassToken,
  resetPass
}