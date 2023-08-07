import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

const PrivacyPolicy = () => {
  return (
    <>
      <Meta title={"Privacy Policy"} />
      <BreadCrumb title="Privacy Policy" />
      <section className="policy-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy">
                <span>
                  DigiSmart is committed to taking care of your personal information as we highly believe that data protection is a sign of trust. We protect your information and data at all costs because your privacy is important for us to retain relationships for the long run. Our privacy policy reflects as to how we collect your personal information and how it is used. We only collect information which is necessary for us and will only keep the information as long as it is relevant for the purpose it is being used for.  Our policy sets out your right to ask about your personal information and how it is updated, deleted, or transferred.
                  This privacy policy is applicable only for personal information that we obtain, not information obtained by third party. It is good if you read the privacy policy alongside terms & conditions. You can visit the site and browse as long as you want without having to provide your personal information. Your identity is not revealed during your visit to the site unless you create the account on the site and log on using your details such as name and password.
                </span>
              </div>
              <div className="policy">
                <h3>How we collect your personal information</h3>
                <span>
                  We collect information that you provide to us for interaction and placing an order. DigiSmart collects and stores your data to provide you our services and process your purchase on our site. Some of the important information that we may collect include gender, name, title, postal address, email address, telephone number, delivery address, payment details, bank account details, or payment card details. This information is required to enable you to place an order successfully on the website. The data that we collect from you is used for payment processing for the product and delivering the same product to you. We keep your data protected even in cases when we have to pass on your information to the third party to make delivery of the product to you that includes name, email id, phone number, address to the third party.
                </span>
              </div>
              <div className="policy">
                <h3>Cookies</h3>
                <span>
                  Accepting cookies is not necessary for visiting the site. However, we would like to clarify that for better functionality and ordering, you must activate the cookies. Cookies are nothing but tiny text files that help identify your computer to the server during your visit to the site. These files are stored on a hard drive by internet browser. Cookies are used to save time while you are on the site, recognize your internet protocol address, and provide you convenience while using the site. For example- Cookies helps to remember who you are whenever you visit the site to do shopping online and don’t ask to re-enter your email address. You can set your browser to not accept cookies but it will limit your use of the site.  Please note that use of cookies does not store your personal details and keeps your system malfunction-free against viruses.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default PrivacyPolicy;
