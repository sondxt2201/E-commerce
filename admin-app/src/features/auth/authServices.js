import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  };
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(
    `${base_url}user/order/all-order`,
    config
  );
  return response.data;
};

const getOrderByUserId = async (id) => {
  const response = await axios.get(
    `${base_url}user/order/order-by-user/${id}`,
    config
  );
  return response.data;
};

const getOrderByOrderId = async (id) => {
  const response = await axios.get(
    `${base_url}user/order/order-by-id/${id}`,
    config
  );
  return response.data;
};

const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/update-order/${data.id}`, {status: data.status},
    config
  );
  return response.data;
};

const getMonthlyOrders = async () => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,
    config
  );
  return response.data;
};

const getYearlyOrders = async () => {
  const response = await axios.get(
    `${base_url}user/getYearlyOrders`,
    config
  );
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrderByUserId,
  getOrderByOrderId,
  getMonthlyOrders,
  getYearlyOrders,
  updateOrder
};

export default authService;
