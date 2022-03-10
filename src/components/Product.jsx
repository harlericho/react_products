import React, { Fragment, useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";
import axios from "axios";
import Swal from "sweetalert2";
const URL = "http://127.0.0.1:8000/";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [dataEdit, setDataEdit] = useState(null);
  const getAllProducts = () => {
    axios
      .get(URL + "api/products/")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const addProduct = (product) => {
    var params = new FormData();
    params.append("code", product.code);
    params.append("names", product.names);
    params.append("description", product.description);
    params.append("price", product.price);
    params.append("image", product.image);
    axios
      .post(URL + "api/products/", params)
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: res.data.product,
          icon: "success",
        });
        getAllProducts();
      })
      .catch((err) => {
        if (err.response.status === 422) {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
          });
        }
      });
  };
  const updateProduct = (product) => {
    var params = new FormData();
    params.append("code", product.code);
    params.append("names", product.names);
    params.append("description", product.description);
    params.append("price", product.price);
    params.append("_method", "PUT");
    if (product.image !== null) {
      params.append("image", product.image);
    }
    axios
      .post(URL + "api/products/" + product.id, params)
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: res.data.product,
          icon: "success",
        });
        getAllProducts();
      })
      .catch((err) => {
        if (err.response.status === 422) {
          Swal.fire({
            title: "Error",
            text: err.response.data.error.code[0],
            icon: "error",
          });
        }
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
          .delete(URL + "api/products/" + id)
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
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <Form
              addProduct={addProduct}
              updateProduct={updateProduct}
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
