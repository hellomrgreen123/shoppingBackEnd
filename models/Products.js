const {model,Schema} = require('mongoose')

const productSchema = new Schema({
    productName:String,
    price:String,
    category:String,
    quantity:{ type: Number, min:0, max: 99},
    username:String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }



})

module.exports = model('Product', productSchema);