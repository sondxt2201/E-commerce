import React, { useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from '../features/user/userSlice';
import * as ntc from "ntcjs";


const Order = () => {
    const dispatch = useDispatch();
    const orderState = useSelector(state => state?.auth?.getOrderedProducts?.orders)

    console.log(orderState)


    useEffect(() => {
        dispatch(getUserOrder())
    }, [])

    return (
        <>
            <BreadCrumb title='Order' />
            <section className='cart-wrapper home-wrapper-2 py-5'>
                <div className="container-xxl">
                    <table className='col-12'>
                        <thead>
                            <tr>
                                <td><h5>Order Id</h5></td>
                                <td><h5>Total Amount</h5></td>
                                <td><h5>Total Amount After Discount</h5></td>
                                <td><h5>Status</h5></td>
                            </tr>
                        </thead>
                        <tbody>
                            {orderState && orderState?.map((item, index) => {
                                return (
                                    <>
                                        <tr style={{ backgroundColor: "#febd69" }} className='mt-3' key={index}>
                                            <td><p>{item?._id}</p></td>
                                            <td><p>{item?.totalPrice}</p></td>
                                            <td><p>{item?.totalPriceAfterDiscount}</p></td>
                                            <td><p>{item?.orderStatus}</p></td>
                                        </tr>
                                        <tr className='bg-secondary'>
                                            <td>
                                                <h6>Product Name</h6>
                                            </td>
                                            <td>
                                                <h6>Quantity</h6>
                                            </td>
                                            <td>
                                                <h6>Price</h6>
                                            </td>
                                            <td>
                                                <h6>Color</h6>
                                            </td>
                                        </tr>
                                        {item?.orderItems?.map((i, index) => {
                                            return (
                                                <>
                                                    <tr style={{ backgroundColor: "#232f3e" }} key={index}>
                                                        <td className='text-white'>
                                                            <p>{i?.product.title}</p>
                                                        </td>
                                                        <td className='text-white'>
                                                            <p>{i?.quantity}</p>
                                                        </td>
                                                        <td className='text-white'>
                                                            <p>{i?.price}</p>
                                                        </td>
                                                        <td className='text-white'>
                                                            <p>{ntc.name(i?.color?.title)[1]}</p>
                                                        </td>
                                                    </tr >
                                                </>
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </section >
        </>
    )
}

export default Order