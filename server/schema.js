const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const {
  getUsers,
  getProducts,
  getOrders,
  getUserById,
  getAdressByUserId,
  getOrdersByUserId,
  addUser,
  deleteUser,
  addOrder,
  addOrderAndOrdersProducts,
  getOrderedProducts,
  addUserAndUserAddress,
} = require('./dbCall');

const AddressType = new GraphQLObjectType({
  name: 'address',
  fields: () => ({
    id: { type: GraphQLID },
    num: { type: GraphQLString },
    street: { type: GraphQLString },
    town: { type: GraphQLString },
    postalCode: { type: GraphQLString },
    userid: { type: GraphQLID },
  }),
});

const ProductsType = new GraphQLObjectType({
  name: 'products',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLString },
  }),
});

const OrdersType = new GraphQLObjectType({
  name: 'orders',
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString },
    totalht: { type: GraphQLInt },
    userid: { type: GraphQLID },
    user: {
      type: UsersType,
      resolve: async (parent, args) => await getUserById(parent.userid),
    },
    products: {
      type: new GraphQLList(ProductsType),
      resolve: async (parent, args) => await getOrderedProducts(parent.id),
    },
  }),
});

const UsersType = new GraphQLObjectType({
  name: 'users',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    address: {
      type: AddressType,
      resolve: async (parent, args) => await getAdressByUserId(parent.id),
    },
    orders: {
      type: new GraphQLList(OrdersType),
      resolve: async (parent, args) => await getOrdersByUserId(parent.id),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UsersType),
      resolve: async (parent, args) => await getUsers(),
    },
    products: {
      type: new GraphQLList(ProductsType),
      resolve: async (parent, args) => await getProducts(),
    },
    user: {
      type: UsersType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, { id }) => await getUserById(id),
    },
    orders: {
      type: new GraphQLList(OrdersType),
      resolve: async (parent, args) => await getOrders(),
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UsersType,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, { name, password }) => {
        const newUser = await addUser(name, password);
        return newUser;
      },
    },
    addUserAndAddress: {
      type: UsersType,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        num: { type: GraphQLString },
        street: { type: GraphQLString },
        town: { type: GraphQLString },
      },
      resolve: async (parent, { name, password, num, street, town }) => {
        const newUserAndAdress = await addUserAndUserAddress(
          name,
          password,
          num,
          street,
          town
        );
        return newUserAndAdress;
      },
    },
    deleteUser: {
      type: UsersType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, { id }) => {
        const deletedUser = await deleteUser(id);
        return deletedUser;
      },
    },
    addOrder: {
      type: OrdersType,
      args: {
        date: { type: GraphQLString },
        totalht: { type: GraphQLInt },
        userid: { type: GraphQLID },
      },
      resolve: async (parent, { date, totalht, userid }) => {
        const newOrder = await addOrder(date, totalht, userid);
        return newOrder;
      },
    },
    addOrderAndOrdersProducts: {
      type: OrdersType,
      args: {
        date: { type: GraphQLString },
        totalht: { type: GraphQLInt },
        userid: { type: GraphQLID },
        productsid: { type: new GraphQLList(GraphQLID) },
      },
      resolve: async (parent, { date, totalht, userid, productsid }) => {
        const newOrder = await addOrderAndOrdersProducts(
          date,
          totalht,
          userid,
          productsid
        );
        return newOrder;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
