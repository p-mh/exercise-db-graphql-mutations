import React from 'react';
import { graphql } from 'react-apollo';

import { getProducts } from '../services/queries';

const Products = ({ data: { loading, products } }) => {
  const showProducts =
    products &&
    products.map(({ title, description, price }) => (
      <div key={title}>
        <p>{title}</p>
        <p>{description}</p>
        <p>{price} €</p>
      </div>
    ));
  return <div>{showProducts}</div>;
};

export default graphql(getProducts)(Products);
