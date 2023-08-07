import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";


const Faq = () => {
  return (
    <>
      <Meta title={"FAQ"} />
      <BreadCrumb title="FAQ" />
      <section className="policy-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy">
                <h3 className="fw-bold">How can I shop at DigiSmart?</h3>
                <span>
                  You can visit our official website DigiSmart.com and select your order from the available options.
                </span>
              </div>
              <div className="policy">
                <h3 className="fw-bold">How will you deliver my item if I am out?</h3>
                <span>
                  In this case, our shipping company will notify you via message and redeliver the order as per your availability next time. However, we request you to make purchase in a manner that someone is available to receive the order at the provided delivery address.
                </span>
              </div>
              <div className="policy">
                <h3 className="fw-bold">What if I receive damaged order?</h3>
                <span>
                  If your package is damaged at the time of accepting the delivery, please return it and inform us immediately.  If you find the package is damaged after accepting the delivery, you can write to us through email within 24 hours of receiving the package.
                </span>
              </div>
              <div className="policy">
                <h3 className="fw-bold">How many days do you take to deliver the order?</h3>
                <span>
                  After receiving the request, we process the order within 48 hours that gets delivered to your address within 7 business working days depending on the location. In some cases, the delivery of the product might take a little longer if the accessibility of your location is too far.
                </span>
              </div>
              <div className="policy">
                <h3 className="fw-bold">Can I change my Email Id or Mobile number?</h3>
                <span>
                  We apologize for this, your phone number or email id cannot be changed once registered to the portal. However, you have the choice to create new account using new phone number or Email Id.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default Faq