const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const products = [
  { "name": "핑구 키링", "price": 7000, "image": "/images/keyring.png" },
  { "name": "슬리퍼", "price": 23000, "image": "/images/slippers.png" },
  { "name": "농구공", "price": 10000, "image": "/images/basketball.jpeg" },
  { "name": "케로로 티셔츠", "price": 30000, "discountRate": 15, "image": "/images/keroro.png" },
  { "name": "MLB 뉴욕 양키스 미드 크라운 볼캡 데님 블랙", "price": 57000, "image": "/images/era.png" },
  { "name": "이불", "price": 28000, "image": "/images/bedding.png" },
  { "name": "아비브 어성초 패드", "price": 26000, "image": "/images/abib.png" },
  { "name": "핸드볼 스페지알", "price": 123000, "image": "/images/adidas.png" }
];

async function migrate() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "shop" });
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("✅ Products migrated!");
  mongoose.disconnect();
}

migrate();