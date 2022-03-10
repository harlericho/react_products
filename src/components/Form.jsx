import React, { Fragment, useEffect, useRef, useState } from "react";
const URLIMAGE = "http://127.0.0.1:8000/storage/uploads/";
const initalForm = {
  id: null,
  code: "",
  names: "",
  description: "",
  price: "",
  image: "",
};
const Form = ({ addProduct, updateProduct, setDataEdit, dataEdit }) => {
  const [form, setForm] = useState(initalForm);
  const refCode = useRef();
  const refNames = useRef();
  const refDescription = useRef();
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
    if (form.code === "") {
      refCode.current.focus();
      return;
    }
    if (form.names === "") {
      refNames.current.focus();
      return;
    }
    if (form.price === "") {
      refPrice.current.focus();
      return;
    }
    if (form.id === null) {
      addProduct(form);
    } else {
      updateProduct(form);
    }
    handleReset();
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
      setForm(dataEdit);
      if (dataEdit.image !== null) {
        setImage({
          preview: URLIMAGE + dataEdit.image,
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
            required
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
            required
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
            ref={refDescription}
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
            required
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
        >
          {dataEdit === null ? "Create" : "Update"}
        </button>
        <button
          type="button"
          className="btn btn-info text-white"
          onClick={handleReset}
        >
          New
        </button>
      </form>
    </Fragment>
  );
};

export default Form;
