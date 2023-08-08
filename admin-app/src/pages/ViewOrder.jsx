import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUserId, getOrders, getOrderByOrderId } from "../features/auth/authSlice";
import * as ntc from "ntcjs";
import Utility from "../utils/Utility";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  // {
  //   title: "Action",
  //   dataIndex: "action",
  // },
];

const ViewOrder = () => {
  const location = useLocation();
  const orderState = useSelector((state) => state.auth.order.orderItems);
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByOrderId(orderId));
  }, []);

  const data1 = [];
  if (orderState) {
    for (let i = 0; i < orderState.length; i++) {
      data1.push({
        key: i + 1,
        name: orderState[i]?.product?.title,
        brand: orderState[i]?.product?.brand,
        amount: orderState[i]?.product?.price,
        date: Utility.GetFullDateMinuteString(orderState[i]?.product?.createdAt),
        color: ntc.name(orderState[i]?.color?.title)[1],
        count: orderState[i]?.quantity,
        // action: (
        //   <>
        //     <Link to="/" className=" fs-3 text-danger">
        //       <BiEdit />
        //     </Link>
        //     <Link className="ms-3 fs-3 text-danger" to="/">
        //       <AiFillDelete />
        //     </Link>
        //   </>
        // ),
      });
    }
  } else {
  }
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
