import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";


const About = () => {
  return (
    <>
      <Meta title={"About"} />
      <BreadCrumb title="About" />
      <section className="policy-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy">
                <span>
                  At DigiSmart, we understand your priorities and the time you invest in us to get your most desired product. We respect the time you invest while purchasing with us. We have a team of capable engineers who knows their specialities. We are a brand full of trustworthy communities and provide you with the best electronic gadgets within your budget. What else are you seeking?
                </span>
              </div>
              <div className="policy">
                <h3>What do we provide</h3>
                <span>
                  <span className="fw-bold">1. Laptop</span>: As the world is getting more remote so there is more need for laptops. We stored laptops of every new brand that you have been looking for. From Lenovo to HP, we have stocked every model for you. <br />
                  <span className="fw-bold">2. Smartphones</span>: We have stocked every sort of mobile phone especially for you. You will find every range of GB in our store. We have mainly focused on collecting every model of phone as much as we can so that our customers can find everything according to their range and their choice.<br />
                  <span className="fw-bold">3. Surveillance cameras</span>: You can look up at cameras too. We have especially classified surveillance cameras so that you can purchase them according to your choice.<br />
                  <span className="fw-bold">4. Digital Cameras</span>: The world is getting more digital and digital. The reason why we stocked all these products is so that our customers can purchase according to their pay range. You can access them. Try once and you will purchase again.<br />
                </span>
              </div>
              <div className="policy">
                <h3>Values we truly believe in:</h3>
                <span>
                  1. Nature towards the customers is friendly and generous and never got customer service problem.<br />
                  2. Product quality is our utmost priority and it has never become a problem as the quality of the best work is a guarantee.<br />
                  3. Also, their technologies have changed according to time and need to get better versions of the products.<br />
                  4. Hence, we can say the work and values are most efficient and effective and have the best customer service.<br />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About