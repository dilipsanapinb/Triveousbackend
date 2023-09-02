const express = require("express");
require("dotenv").config();
const connection = require("./config/db");
const userRoute = require("./routes/auth.routes");
const categoryRoute = require("./routes/category.routes");
const productRoute = require("./routes/product.routes");
const cartRoute = require("./routes/cart.routes");
const placeOrder = require("./routes/order.routes");
const { swaggerServe, swaggerSetup } = require('./config/swaggerOptions');
const rate=require('./middlewares/ratelimiter')
const port = process.env.PORT || 5000;
const app = express();

const limiter = rate({
  limit: 100,
  time: 60000,
  blockedTime:30000,
})

app.use(express.json());

app.use(limiter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the triveous app" });
});

app.use("/api-docs", swaggerServe, swaggerSetup);
// routes
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", placeOrder);

app.listen(8000, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Something went wrong at connecting the DB");
  }
  console.log(`Server is running on port:8000`);
});
