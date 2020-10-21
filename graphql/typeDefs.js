const { gql } = require('apollo-server');

module.exports = gql`
type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
type Product{
    id:ID!
    productName:String!,
    price:String!,
    category:String!,
    quantity:Int!,
    username:String!
}
input RegisterProduct{
    productName:String!
       price:String!
      category:String!
       quantity:Int!
}
input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

input UpdateProduct{
    id:ID!
    productName:String!,
    price:String!,
    category:String!,
    quantity:Int!,
    username:String
}
type Query{
    getProducts:[Product]
    getProductById(productId:ID!):Product
    getProductsByCategory( category:String!): Product


}

type Mutation{
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createProduct(product:RegisterProduct!): Product!
    deleteProduct(productId: ID!):String!
    deleteOwnedByCategory(category: String!):String!
    updateProduct(product:UpdateProduct!):String!
    
}
`