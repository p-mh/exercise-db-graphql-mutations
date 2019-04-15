import React from 'react';
import { graphql, compose } from 'react-apollo';

import {
  getOrders,
  addOrder,
  getUsers,
  getProducts,
} from '../services/queries';

import NewOrderForm from './NewOrderForm';
import ShowOrders from './ShowOrders';

const changeProducts = value => prevState => {
  const { productsids } = prevState;
  if (productsids.includes(value)) {
    const valueIndex = productsids.indexOf(value);
    return {
      productsids: [
        ...productsids.slice(0, valueIndex),
        ...productsids.slice(valueIndex + 1),
      ],
    };
  }
  return { productsids: [...productsids, value] };
};

class Orders extends React.Component {
  state = {
    userid: '1',
    productsids: [],
    totalht: '',
    date: '',
  };

  createNewOrder = () => {
    const { totalht, ...otherData } = this.state;
    this.props.addOrder({
      variables: { totalht: Number(totalht), ...otherData },
      refetchQueries: [{ query: getOrders }],
    });
    this.setState({
      userid: '1',
      productsids: [],
      totalht: '',
      date: '',
    });
  };

  onChangeValue = (label, { target: { value } }) => {
    this.setState({ [label]: value });
  };

  onChangeProducts = ({ target: { value } }) => {
    this.setState(changeProducts(value));
  };

  render() {
    const {
      getOrders: { loading: loadingOrders, orders },
      getUsers: { users },
      getProducts: { products },
    } = this.props;
    const { productsids, totalht, date } = this.state;

    return (
      <div>
        <NewOrderForm
          users={users || []}
          products={products || []}
          productsids={productsids}
          totalht={totalht}
          onChangeValue={this.onChangeValue}
          onChangeProducts={this.onChangeProducts}
          createNewOrder={this.createNewOrder}
          date={date}
        />
        <ShowOrders loadingOrders={loadingOrders} orders={orders} />
      </div>
    );
  }
}

export default compose(
  graphql(getOrders, { name: 'getOrders' }),
  graphql(addOrder, { name: 'addOrder' }),
  graphql(getUsers, { name: 'getUsers' }),
  graphql(getProducts, { name: 'getProducts' })
)(Orders);
