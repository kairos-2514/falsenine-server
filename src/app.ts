import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import contactRoutes from "./routes/contactRoutes";
import authRoutes from "./routes/authRoutes";
import addressRoutes from "./routes/addressRoutes";
import productRoutes from "./routes/productRoutes";
import razorpayRoutes from "./routes/razorpayRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://www.falseninejersey.shop",
      "https://falseninejersey.shop",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/products", productRoutes);
app.use("/api/v2/razorpay", razorpayRoutes);
app.use("/api/orders", orderRoutes);

export default app;
