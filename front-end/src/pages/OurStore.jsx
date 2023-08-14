import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../features/products/productSlice";
import { TiDeleteOutline } from "react-icons/ti";

const OurStore = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.products);
  const [grid, setGrid] = useState(3);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null)



  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newTags = [];

    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand)
      category.push(element.category)
      newTags.push(element.tags)
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newTags);
  }, [productState])

  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);

  const getProducts = () => {
    dispatch(getAllProduct({ sort, tag, brand, category, minPrice, maxPrice }));
  }

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <section className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Categories</h3>
                <div>
                  <ul className="ps-0">
                    {
                      categories && [...new Set(categories)].map((item, index) => {
                        return (
                          <li key={index} onClick={() => setCategory(item)}>{item}</li>
                        )
                      })
                    }
                  </ul>
                  <li
                    style={{ listStyle: 'none' }}
                    onClick={() => {
                      dispatch(getAllProduct({}))
                    }}
                  >
                    <TiDeleteOutline />
                  </li>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By</h3>
                <div>
                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex align-items-center gap-10">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        placeholder="From"
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <label htmlFor="floatingInput">From</label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInput1"
                        placeholder="To"
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                      <label htmlFor="floatingInput1">To</label>
                    </div>
                  </div>
                  <h5 className="sub-title">Product Tags</h5>
                  <div>
                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                      {
                        tags && [...new Set(tags)].map((item, index) => {
                          return (
                            <><li
                              style={{ cursor: "pointer" }}
                              className="badge bg-light text-secondary rounded-3 py-2 px-3 text-capitalize"
                              key={index}
                              onClick={() => setTag(item)}
                            >
                              {item}
                            </li>
                            </>
                          )
                        })
                      }
                      <li
                        style={{ listStyle: 'none' }}
                        onClick={() => {
                          dispatch(getAllProduct({}))
                        }}
                      >
                        <TiDeleteOutline />
                      </li>
                    </div>
                  </div>
                  <h5 className="sub-title">Product Brands</h5>
                  <div>
                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                      {
                        brands && [...new Set(brands)].map((item, index) => {
                          return (
                            <li
                              style={{ cursor: "pointer" }}
                              className="badge bg-light text-secondary rounded-3 py-2 px-3 text-capitalize"
                              key={index}
                              onClick={() => setBrand(item)}
                            >
                              {item}
                            </li>
                          )
                        })
                      }
                      <li
                        style={{ listStyle: 'none' }}
                        onClick={() => {
                          dispatch(getAllProduct({}))
                        }}
                      >
                        <TiDeleteOutline />
                      </li>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="filter-card mb-3">
                <h3 className="filter-title">Random Products</h3>
                <div>
                  <div className="random-products mb-3 d-flex">
                    <div className="w-50">
                      <img
                        src="images/watch.jpg"
                        className="img-fluid"
                        alt="watch"
                      />
                    </div>
                    <div className="w-50">
                      <h5>
                        Kids headphones bulk 10 pack multi colored for students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>$300</b>
                    </div>
                  </div>
                  <div className="random-products d-flex">
                    <div className="w-50">
                      <img
                        src="images/watch.jpg"
                        className="img-fluid"
                        alt="watch"
                      />
                    </div>
                    <div className="w-50">
                      <h5>
                        Kids headphones bulk 10 pack multi colored for students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>$300</b>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: "100px" }}>
                      Sort By:
                    </p>
                    <select
                      name=""
                      defaultValue={"manual"}
                      className="form-control form-select"
                      id=""
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="title">Alphabetically, A-Z</option>
                      <option value="-title">Alphabetically, Z-A</option>
                      <option value="price">Price, low to high</option>
                      <option value="-price">Price, high to low</option>
                      <option value="created">Date, old to new</option>
                      <option value="-created">Date, new to old</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10">
                    <p className="totalproducts mb-0">{productState?.length} Products</p>
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
                <div className="d-flex gap-10 flex-wrap" >
                  {
                    productState
                      ? ((productState.map((item, index) => {
                        return (
                          <ProductCard
                            key={index}
                            grid={grid}
                            data={item}
                          />
                        )
                      })))
                      : (
                        <div className="d-flex gap-10 flex-wrap">
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

export default OurStore;
