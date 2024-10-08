import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { items } from "./Data";
import Product from "./Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ cart, setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [reletedProducts, setReletedProducts] = useState([]);

  useEffect(() => {
    const filterProduct = items.find((product) => product.id == id);
    setProduct(filterProduct);
  }, [id]);

  useEffect(() => {
    if (product.category) {
      const reletedProduct = items.filter(
        (prod) => prod.category === product.category && prod.id !== product.id
      );
      setReletedProducts(reletedProduct);
    }
  }, [product]);

  const addToCart = (id, price, title, description, imgSrc) => {
    const newCartItem = { id, price, title, description, imgSrc };
    setCart([...cart, newCartItem]);

    toast.success("🦄 Item added to cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container con">
        <div className="img">
          <img src={product.imgSrc} alt={product.title} />
        </div>
        <div className="text-center">
          <h1 className="card-title">{product.title}</h1>
          <p className="card-text">{product.description}</p>
          <button className="btn btn-primary mx-3">{product.price} ₹</button>
          <button
            onClick={() =>
              addToCart(
                product.id,
                product.price,
                product.title,
                product.description,
                product.imgSrc
              )
            }
            className="btn btn-warning"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <h1 className="text-center">Related products</h1>
      <Product cart={cart} setCart={setCart} items={reletedProducts} />
    </>
  );
};

export default ProductDetails;
