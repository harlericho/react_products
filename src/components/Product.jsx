import React, { Fragment, useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
const URL_API = "http://127.0.0.1:8000/";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [dataEdit, setDataEdit] = useState(null);
  const getAllProducts = () => {
    axios
      .get(URL_API + "api/products/")
      .then((res) => {
        toast.info("Product list loaded", { theme: "colored" });
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const deleteProduct = (id) => {
    // var params = new FormData();
    // params.append("id", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(URL_API + "api/products/" + id)
          .then((res) => {
            Swal.fire("Deleted!", res.data.product, "success");
            getAllProducts();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <Form
              getAllProducts={getAllProducts}
              dataEdit={dataEdit}
              setDataEdit={setDataEdit}
            />
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="card">
          <div className="card-body table table-responsive">
            <List
              products={products}
              setDataEdit={setDataEdit}
              deleteProduct={deleteProduct}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
