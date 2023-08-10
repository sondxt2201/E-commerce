import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../features/user/userSlice";

const Wishlist = () => {
  const [grid, setGrid] = useState(3);
  const dispatch = useDispatch();

  useEffect(() => {
    Wishlist();
  }, []);

  const Wishlist = () => {
    dispatch(getWishlist())
  };

  const wishlistState = useSelector(state => state?.auth?.wishlist)

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <section className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center flex-row-reverse">
                  <div className="d-flex align-items-center gap-10 ">
                    <p className="totalproducts mb-0">{wishlistState?.length} Products</p>
                    <div className="d-flex gap-10 align-items-center grid">
                      <img
                        onClick={() => {
                          setGrid(3);
                        }}
                        src="images/gr4.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(4);
                        }}
                        src="images/gr3.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(6);
                        }}
                        src="images/gr2.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(12);
                        }}
                        src="images/gr.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="products-list pb-5">
                <div className="d-flex gap-10 flex-wrap">
                  {
                    wishlistState
                      ? ((wishlistState?.map((item, index) => {
                        return (
                          <ProductCard
                            key={index}
                            grid={grid}
                            data={item}
                          />
                        )
                      })))
                      : (
                        <div className="text-center fs-3">
                          NO DATA
                        </div>
                      )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default Wishlist;
