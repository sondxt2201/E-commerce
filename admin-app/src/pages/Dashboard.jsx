import React, { useEffect } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyData, getOrders, getYearlyData } from "../features/auth/authSlice";
import { useState } from "react";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product Count",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "Total Price After Discount",
    dataIndex: "priceafterdiscount",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];


const Dashboard = () => {
  const dispatch = useDispatch();
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const monthlyDataState = useSelector(state => state?.auth?.monthlyData);
  const yearlyDataState = useSelector(state => state?.auth?.yearlyData);
  const orderState = useSelector(state => state?.auth?.orders);

  useEffect(() => {
    dispatch(getMonthlyData())
    dispatch(getYearlyData())
    dispatch(getOrders())
    // window.location.reload()
  }, [])


  useEffect(() => {
    let data = [];
    let monthlyOrdersCount = [];
    let monthNames = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({
        type: monthNames[element?._id?.month],
        income: element?.amount,
      })
      monthlyOrdersCount.push({
        type: monthNames[element?._id?.month],
        sales: element?.count,
      })
    }
    setDataMonthly(data)
    setDataMonthlySales(monthlyOrdersCount)

    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
      data1.push({
        key: i + 1,
        name: orderState[i]?.user?.firstname + orderState[i]?.user?.lastname,
        product: orderState[i]?.orderItems?.length,
        price: orderState[i]?.totalPrice,
        priceafterdiscount: orderState[i]?.totalPriceAfterDiscount,
        status: orderState[i]?.orderStatus,
      });
    }
    setOrderData(data1)
  }, [monthlyDataState, yearlyDataState, orderState])

  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };


  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Income</p>
            <h4 className="mb-0 sub-title">${yearlyDataState && yearlyDataState[0]?.amount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              {/* <BsArrowDownRight /> 32% */}
            </h6>
            <p className="mb-0  desc">Income Last Year</p>
          </div>
        </div>
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">{yearlyDataState && yearlyDataState[0]?.count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              {/* <BsArrowDownRight /> 32% */}
            </h6>
            <p className="mb-0 desc">Sales Last Year</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-evenly">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Income Statistics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Sales Statistics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
