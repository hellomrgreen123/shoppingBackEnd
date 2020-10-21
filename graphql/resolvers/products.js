const { AuthenticationError, UserInputError } = require("apollo-server");
var mongoose = require("mongoose")
const Product = require("../../models/Products");
const checkAuth = require("../util/check-auth");

module.exports = {
  Query: {
    async getProducts() {
      try {
        const products = await Product.find().sort();
        return products;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getProductById(_, { productId }) {
      try {
        const product = await Product.findById(productId);
        if (product) {
          return product;
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getProductsByCategory(_, { category }) {
      try {
        const productsByCategory = await Product.find(
          (product) => category === product.Category
        );
        if (productsByCategory) {
          return productsByCategory;
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createProduct(
      _,

      currentproduct,
      context
    ) {
      const user = checkAuth(context);
      console.log(user);
      const newProduct = new Product({
        productName: currentproduct.product.productName,
        user: user.id,
        price: currentproduct.product.price,
        category: currentproduct.product.category,
        quantity: currentproduct.product.quantity,
        username: user.username,
      });

      const product = await newProduct.save();
      context.pubsub.publish("NEW_POST", {
        newProduct: product,
      });
      return product;
    },
    async deleteProduct(_, { productId }, context) {
      const user = checkAuth(context);
      try {
        const product = await Product.findById(productId);
        if (user.username === product.username) {
          await product.deleteOne();
          return "Product deleted succesfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteOwnedByCategory(_, category, context) {
      console.log(category.category);
      const user = checkAuth(context);
      try {
        const productsByCategory = await Product.deleteMany({
          category: category.category,
          username: user.username,
        });
        console.log("///////////////");
        console.log(productsByCategory.deletedCount);
        if (productsByCategory.deletedCount > 0) {
          return "Your products in this category have been deleted";
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateProduct(_, currentproduct, context) {
      const user = checkAuth(context);
      console.log(currentproduct)
     console.log( currentproduct.product.id )
      try {
        const newProduct = Product.updateOne(
          { _id: currentproduct.product.id },
          {
            productName: currentproduct.product.productName,
            price: currentproduct.product.price,
            category: currentproduct.product.category,
            quantity: currentproduct.product.quantity,
          },
          { upsert: true },
          (err,result)=>( console.log(result))
        
          );
          
          console.log(newProduct)
        
        return "newProduct"
      }catch (err) {
        throw new Error(err);
      }
    },
  },
};
