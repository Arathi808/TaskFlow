const app = require("./app");
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

// ✅ CORS (required for frontend deployment)
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Middleware (safe to ensure JSON handling)
app.use(require("express").json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});