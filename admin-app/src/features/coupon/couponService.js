import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/all-coupon`, config);

  return response.data;
};

const createCoupon = async (coupon) => {
  const response = await axios.post(`${base_url}coupon/`, coupon, config);

  return response.data;
};

const updateCoupon = async (coupon) => {
  const response = await axios.put(
    `${base_url}coupon/${coupon.id}`,
    {
      name: coupon.couponData.name,
      expire: coupon.couponData.expire,
      discount: coupon.couponData.discount,
    },
    config
  );

  return response.data;
};

const getCoupon = async (id) => {
  const response = await axios.get(`${base_url}coupon/${id}`, config);

  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(`${base_url}coupon/delete-coupon/${id}`, config);

  return response.data;
};

const couponService = {
  getCoupons,
  createCoupon,
  deleteCoupon,
  getCoupon,
  updateCoupon,
};

export default couponService;
