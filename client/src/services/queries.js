import { gql } from 'apollo-boost';

export const getUsers = gql`
  {
    users {
      id
      name
      address {
        num
        street
        town
      }
    }
  }
`;

export const addUserAndAddress = gql`
  mutation(
    $name: String
    $password: String
    $num: String
    $street: String
    $town: String
  ) {
    addUserAndAddress(
      name: $name
      password: $password
      num: $num
      street: $street
      town: $town
    ) {
      name
      password
      address {
        num
        street
        town
      }
    }
  }
`;

export const getProducts = gql`
  {
    products {
      id
      title
      description
      price
    }
  }
`;

export const getOrders = gql`
  {
    orders {
      date
      totalht
      user {
        name
      }
      products {
        title
        description
        price
      }
    }
  }
`;

export const addOrder = gql`
  mutation($date: String, $totalht: Int, $userid: ID, $productsids: [ID]) {
    addOrderAndOrdersProducts(
      date: $date
      totalht: $totalht
      userid: $userid
      productsid: $productsids
    ) {
      date
    }
  }
`;
