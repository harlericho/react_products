import React, { Fragment } from "react";
import imagen from "../sinimagen.png";
const URLIMAGE = "http://127.0.0.1:8000/storage/uploads/";
const Item = ({ product, url, setDataEdit, deleteProduct }) => {
  return (
    <Fragment>
      <tr>
        <td>{product.code}</td>
        <td>
          {product.image ? (
            <img src={URLIMAGE + product.image} alt={product.name} width={40} />
          ) : (
            <img src={imagen} alt={product.name} width={40} />
          )}
        </td>
        <td>{product.names}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>
          <button
            className="btn btn-success btn-sm"
            title="Edit"
            onClick={() => {
              setDataEdit(product);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            title="Delete"
            onClick={() => {
              deleteProduct(product.id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default Item;
