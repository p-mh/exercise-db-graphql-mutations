import React from 'react';

const NewUserForm = ({
  name,
  password,
  num,
  street,
  town,
  changeInputValue,
  createUser,
}) => (
  <div>
    <p>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={changeInputValue.bind(this, 'name')}
      />
    </p>
    <p>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={changeInputValue.bind(this, 'password')}
      />
    </p>
    <p>
      <input
        type="text"
        placeholder="address num"
        value={num}
        onChange={changeInputValue.bind(this, 'num')}
      />
    </p>
    <p>
      <input
        type="text"
        placeholder="address street"
        value={street}
        onChange={changeInputValue.bind(this, 'street')}
      />
    </p>
    <p>
      <input
        type="text"
        placeholder="address town"
        value={town}
        onChange={changeInputValue.bind(this, 'town')}
      />
    </p>
    <p>
      <button onClick={createUser}>Create new user</button>
    </p>
  </div>
);

export default NewUserForm;
