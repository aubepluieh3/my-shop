const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products");

const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors({
    origin: "http://localhost:3000"
  }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI, { dbName: "shop" })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));
  

app.use("/api/products", productsRouter);

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

function getReply(msg) {
  const text = msg.toLowerCase();
  if (text.includes("배송")) return "평균 배송 기간은 3~5일입니다.";
  if (text.includes("상품")) return "상품 상세 정보는 상품 페이지를 확인해주세요.";
  if (text.includes("안녕")) return "안녕하세요! 무엇을 도와드릴까요? 😊";
  return "죄송합니다, 이해하지 못했습니다. 다른 문의사항이 있으신가요?";
}


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
      io.emit("receive_message", { text: msg, sender: "user" });

      const reply = getReply(msg);
      setTimeout(() => {
        io.emit("receive_message", { text: reply, sender: "bot" });
      }, 500);
      
  });
  socket.on("disconnect", () => {
      console.log("사용자 연결 종료:", socket.id);
  });
});


const PORT = 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
