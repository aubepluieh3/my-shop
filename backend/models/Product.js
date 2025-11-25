const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },          // 상품 이름
  price: { type: Number, required: true },         // 가격
  image: { type: String, required: true },         // 이미지 URL
  discountRate: { type: Number, default: 0 },      // 할인율(선택)
  stock: { type: Number, default: 100 },           // 재고
  createdAt: { type: Date, default: Date.now },    // 생성일
  updatedAt: { type: Date, default: Date.now }     // 수정일
});

productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Product", productSchema);
