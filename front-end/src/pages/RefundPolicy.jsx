import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

const RefundPolicy = () => {
  return (
    <>
      <Meta title={"Refund Policy"} />
      <BreadCrumb title="Refund Policy" />
      <section className="policy-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy">
                <span>
                  Although we try to the extent of our full capacity to keep our customers satisfied with our services still, if you are not satisfied with our product, we can go ahead with a request of full refund for your happiness. If you find your order not up to the mark in terms of quality, comfort, or have any other problem, we are happy to provide your full refund amount. You can return the unused item with receipt within 30 days. In any case, if you wish to change the item you have purchased, you will have to follow the return request process. <br />
                </span>
                <span>
                  You are required to specify the account number in which you want the amount to be credited. After initiating the return request, you will receive a confirmation in your registered email ID for the return initiated. As soon as we receive the product at our warehouse from your end, we will process the refund at the earliest. In case you come across any problem or have any query, you can email our customer support for clarification.
                </span>
              </div>
              <div className="policy">
                <h3>
                  Terms & conditions for returns
                </h3>
                <span >
                  We will not be liable or responsible to pay the amount for incorrect fund transfer. The customer will be held accountable for the complete information shared by him. Refund credits will be issued only after when a product is received at the warehouse. The process of refund will be initiated after receiving the product and might take around 7 business working days for the amount to reflect in your bank account. At the time of returning the order, make sure the seal of the item is not broken or damaged before handing it over to the courier. It will be good to use separate packets for items to keep it protected and safe.
                  <br />
                  <span className="fw-bold">
                    Note: – You can raise the return request or return the item within 30 days of delivery.
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default RefundPolicy;
