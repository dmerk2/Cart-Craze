const typeDefs = `
  type Category {
    _id: ID
    name: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    orders: [Order]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    category: Category
    order: [Order]
    product: Product
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
