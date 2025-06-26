import React from 'react';
import ProductSchema from '../ProductSchema';

export default (original) => {
  return function ProductFullDetail(props) {
    return (
      <>
        <ProductSchema />
        {original(props)}
      </>
    )
  }
};
