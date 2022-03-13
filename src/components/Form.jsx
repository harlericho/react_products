import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faUndo } from "@fortawesome/free-solid-svg-icons";
const URL_API = "http://127.0.0.1:8000/";
const URL_IMAGE = "http://127.0.0.1:8000/storage/uploads/";
const initalForm = {
  id: null,
  code: "",
  names: "",
  description: "",
  price: "",
  image: "",
};
const Form = ({ getAllProducts, setDataEdit, dataEdit }) => {
  const [form, setForm] = useState(initalForm);
  const refCode = useRef();
  const refNames = useRef();
  const refPrice = useRef();
  const refImage = useRef();

  const [image, setImage] = useState({
    preview: "",
    file: "",
  });
  const handleImagePreview = (e) => {
    let imageBase64 = URL.createObjectURL(e.target.files[0]);
    let imageFile = e.target.files[0];
    form.image = imageFile;
    setImage({
      preview: imageBase64,
      file: imageFile,
    });
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id === null) {
      addProduct(form);
    } else {
      updateProduct(form);
    }
  };
  const addProduct = (product) => {
    var params = new FormData();
    params.append("code", product.code);
    params.append("names", product.names);
    params.append("description", product.description);
    params.append("price", product.price);
    params.append("image", product.image);
    axios
      .post(URL_API + "api/products/", params)
      .then((res) => {
        toast.success(res.data.product, { theme: "colored" });
        getAllProducts();
        handleReset();
      })
      .catch((err) => {
        if (err.response.status === 422) {
          if (err.response.data.error.code) {
            refCode.current.focus();
            toast.error(err.response.data.error.code[0], {
              theme: "colored",
            });
            return;
          }
          if (err.response.data.error.names) {
            refNames.current.focus();
            toast.error(err.response.data.error.names[0], {
              theme: "colored",
            });
            return;
          }
          if (err.response.data.error.price) {
            refPrice.current.focus();
            toast.error(err.response.data.error.price[0], {
              theme: "colored",
            });
            return;
          }
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
      .post(URL_API + "api/products/" + product.id, params)
      .then((res) => {
        toast.success(res.data.product, { theme: "colored" });
        getAllProducts();
        handleReset();
      })
      .catch((err) => {
        if (err.response.status === 422) {
          if (err.response.data.error.code) {
            refCode.current.focus();
            toast.error(err.response.data.error.code[0], {
              theme: "colored",
            });
            return;
          }
          if (err.response.data.error.names) {
            refNames.current.focus();
            toast.error(err.response.data.error.names[0], {
              theme: "colored",
            });
            return;
          }
          if (err.response.data.error.price) {
            refPrice.current.focus();
            toast.error(err.response.data.error.price[0], {
              theme: "colored",
            });
            return;
          }
        }
      });
  };
  const handleReset = () => {
    setForm(initalForm);
    setImage({
      preview: "",
      file: "",
    });
    setDataEdit(null);
    refImage.current.value = "";
    refCode.current.focus();
  };
  useEffect(() => {
    refCode.current.focus();
    if (dataEdit !== null) {
      toast.warning("This mode edit product", { theme: "colored" });
      setForm({
        id: dataEdit.id,
        code: dataEdit.code,
        names: dataEdit.names,
        description: dataEdit.description ?? "",
        price: dataEdit.price,
        image: dataEdit.image,
      });
      if (dataEdit.image !== null) {
        setImage({
          preview: URL_IMAGE + dataEdit.image,
          file: dataEdit.image,
        });
      } else {
        setImage({
          preview: "",
          file: "",
        });
      }
    } else {
      setForm(initalForm);
    }
  }, [dataEdit]);

  return (
    <Fragment>
      <h6>
        {dataEdit === null ? "Form Create Product" : "Form Update Product"}
      </h6>
      <form id="formData" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="code" className="form-label">
            Code
          </label>
          <input
            type="text"
            className="form-control"
            name="code"
            minLength="6"
            maxLength="6"
            value={form.code}
            ref={refCode}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="names" className="form-label">
            Names
          </label>
          <input
            type="text"
            className="form-control"
            name="names"
            value={form.names}
            ref={refNames}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            name="price"
            value={form.price}
            ref={refPrice}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 container-img">
          <center>
            <img src={image.preview} alt="" width={80} />
          </center>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control input"
            name="image"
            ref={refImage}
            onChange={handleImagePreview}
          />
        </div>

        <button
          type="submit"
          className={dataEdit === null ? "btn btn-primary" : "btn btn-success"}
          title={dataEdit === null ? "Create" : "Update"}
        >
          {dataEdit === null ? (
            <FontAwesomeIcon icon={faPlus} />
          ) : (
            <FontAwesomeIcon icon={faEdit} />
          )}
        </button>
        <button
          type="button"
          className="btn btn-info text-white"
          onClick={handleReset}
        >
          <FontAwesomeIcon icon={faUndo} />
        </button>
      </form>
    </Fragment>
  );
};

export default Form;
