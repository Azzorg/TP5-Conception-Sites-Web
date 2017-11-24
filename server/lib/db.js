"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CONFIG = {
  user: "antoine",
  password: "antoine"
};

var Order = new Schema({
  id: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  products: Array
}, { versionKey: false });


var Product = new Schema({
  id: { type: Number, unique: true },
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
  features: Array
}, { versionKey: false });

mongoose.model("Order", Order);
mongoose.model("Product", Product);

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://" + CONFIG.user + ":" + CONFIG.password + "@ds151993.mlab.com:51993/online-shop",
  { useMongoClient: true });
