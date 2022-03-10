import React, { Fragment } from "react";
import Item from "./Item";
const List = ({ products, setDataEdit, deleteProduct }) => {
  return (
    <Fragment>
      <h6>List of products</h6>
      <table className="table table-striped">
        <thead>
          <tr>
            <th itemScope="col">Code</th>
            <th itemScope="col">Image</th>
            <th itemScope="col">Names</th>
            <th itemScope="col">Description</th>
            <th itemScope="col">Price</th>
            <th itemScope="col" colSpan="2">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" align="center">
                No products found
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <Item
                key={index}
                product={product}
                setDataEdit={setDataEdit}
                deleteProduct={deleteProduct}
              />
            ))
          )}
        </tbody>
      </table>
    </Fragment>
  );
};

export default List;
