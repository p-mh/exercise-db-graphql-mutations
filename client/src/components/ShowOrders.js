import React from 'react';

const ShowOrders = ({ loadingOrders, orders }) =>
  !loadingOrders &&
  orders.map(({ date, totalht, user: { name: userName }, products }, index) => (
    <div key={index} style={{ borderTop: '#000 1px solid' }}>
      <p>date: {date}</p>
      <p>totalht: {totalht}</p>
      <p>user infos : {userName}</p>
      <p>products :</p>
      {products.map(({ title, description, price }) => (
        <div key={title}>
          <p>
            products infos : {title} ({description})
          </p>
          <p>price : {price} €</p>
        </div>
      ))}
    </div>
  ));

export default ShowOrders;
