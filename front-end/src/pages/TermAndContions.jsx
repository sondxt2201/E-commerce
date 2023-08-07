import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

const TermAndConditions = () => {
  return (
    <>
      <Meta title={"Term And Conditions"} />
      <BreadCrumb title="Term And Conditions" />
      <section className="policy-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy">
                <span>
                  Please read the terms & conditions before using the website DigiSmart. Access to DigiSmart and use of products and services of this website are subject to the following terms and conditions. By using the services provided by our website DigiSmart, you acknowledge and agree to all Terms of Services on the website which may be updated at any time without any prior notice. You are advised to check this page regularly to see the changes we may have made. We reserve the right to change, review and withdraw the services without prior notice. We will not be liable to the user if for any reason this Website is made unavailable for any period. We may restrict your access to some parts or the entire Website from time to time.
                </span>
              </div>
              <div className="policy">
                <h3>
                  Services
                </h3>
                <span>
                  DigiSmart is an online electronics store that offers great value to the consumer in the form of bespoke services. Upon registering to the website, you are allowed to purchase a variety of products as an official customer. DigiSmart shall deliver the product to the registered address and you will be entitled to pay for the service at the time of booking the order.
                </span>
              </div>
              <div className="policy">
                <h3>
                  Privacy
                </h3>
                <span>
                  DigiSmart is committed to safeguarding your privacy under all circumstances right from the moment you are registered to our website. As mentioned in our Privacy Statement we keep the information of our customers confidential and safe. If you are not familiar with such content regarding our policy, we encourage you to read them carefully. It is the best time for you to get the in-depth details of how we at DigiSmart protect the information of our customers. We may use the information under specific circumstances but never disclose the information of our customers to any person or any party.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermAndConditions;
