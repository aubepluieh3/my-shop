const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors({
    origin: "http://localhost:3000"
  }));
app.use(express.json());

app.use("/api/products", productsRouter);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
  console.log("사용자 연결됨:", socket.id);

  socket.on("send_message", (msg) => {
      console.log("📨 메시지:", msg);
      io.emit("receive_message", msg);
  });

  socket.on("disconnect", () => {
      console.log("사용자 연결 종료:", socket.id);
  });
});


const PORT = 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
