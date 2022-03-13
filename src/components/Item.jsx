import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import imagen from "../sinimagen.png";
const URL_IMAGE = "http://127.0.0.1:8000/storage/uploads/";
const Item = ({ product, setDataEdit, deleteProduct }) => {
  return (
    <Fragment>
      <tr>
        <td>{product.code}</td>
        <td>
          {product.image ? (
            <img
              src={URL_IMAGE + product.image}
              alt={product.name}
              width={40}
            />
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
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="btn btn-danger btn-sm"
            title="Delete"
            onClick={() => {
              deleteProduct(product.id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default Item;
