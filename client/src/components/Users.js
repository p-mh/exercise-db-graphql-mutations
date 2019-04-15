import React from 'react';
import { compose, graphql } from 'react-apollo';

import { getUsers, addUserAndAddress } from '../services/queries';

import NewUserForm from './NewUserForm';

class Users extends React.Component {
  state = {
    name: '',
    password: '',
    num: '',
    street: '',
    town: '',
  };

  changeInputValue = (label, { target: { value } }) => {
    this.setState({
      [label]: value,
    });
  };

  createUser = () => {
    this.props.addUserAndAddress({
      variables: this.state,
      refetchQueries: [{ query: getUsers }],
    });
    this.setState({
      name: '',
      password: '',
      num: '',
      street: '',
      town: '',
    });
  };

  render() {
    const {
      usersQuery: { loading, users },
    } = this.props;

    const { name, password, num, street, town } = this.state;

    const isLoading = loading && <p>...loading</p>;
    const showUsers =
      users &&
      users.map(({ name, address: { num, street, town } }, index) => (
        <p key={index}>
          {name} : {num} {street}, {town}
        </p>
      ));

    return (
      <div>
        <NewUserForm
          name={name}
          password={password}
          num={num}
          street={street}
          town={town}
          changeInputValue={this.changeInputValue}
          createUser={this.createUser}
        />
        {isLoading || showUsers}
      </div>
    );
  }
}

export default compose(
  graphql(getUsers, { name: 'usersQuery' }),
  graphql(addUserAndAddress, { name: 'addUserAndAddress' })
)(Users);
