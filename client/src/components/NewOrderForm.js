import React from 'react';

const NewOrderForm = ({
  users,
  products,
  productsids,
  totalht,
  onChangeValue,
  onChangeProducts,
  createNewOrder,
  date,
}) => (
  <div>
    <h2>Add new order</h2>
    <div>
      <select onChange={onChangeValue.bind(this, 'userid')}>
        {users.map(({ name, id }) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <input
        type="date"
        onChange={onChangeValue.bind(this, 'date')}
        value={date}
      />
    </div>
    <div>
      {products.map(({ id, title, price }) => (
        <label key={id}>
          <input
            type="checkbox"
            value={id}
            checked={productsids.includes(id)}
            onChange={onChangeProducts}
          />
          {title}
        </label>
      ))}
    </div>
    <div>
      <input
        type="number"
        value={totalht}
        placeholder="Total HT"
        onChange={onChangeValue.bind(this, 'totalht')}
      />
    </div>
    <button onClick={createNewOrder}>Add</button>
  </div>
);

export default NewOrderForm;
