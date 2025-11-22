const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products");

const app = express();
app.use(cors({
    origin: "http://localhost:3000"
  }));
app.use(express.json());

app.use("/api/products", productsRouter);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
