import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { userRoute } from "./APIs/UserAPI.js";
import cookieParser from "cookie-parser";
import { adminRoute } from "./APIs/AdminAPI.js";
import { authorRoute } from "./APIs/AuthorAPI.js";
import { commonRouter } from "./APIs/CommonAPI.js";
import cors from "cors";

config(); //process.env

// Debug: Log loaded environment variables
console.log("✓ Loaded DB_URL:", process.env.DB_URL ? "✓ Set" : "✗ Missing");
console.log("✓ Loaded PORT:", process.env.PORT);
console.log("✓ Loaded JWT_SECRET:", process.env.JWT_SECRET ? "✓ Set" : "✗ Missing");

//Create express application - restarting to load .env
const app = exp();

// If behind a proxy (Render), trust the first proxy so req.secure and protocol detection work
app.set('trust proxy', 1);

// Set PORT with fallback
const PORT = process.env.PORT || 10000;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
        return callback(null, true);
      }
      if (origin.startsWith('https://week-9-10') && origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);



//add body parser middleware
app.use(exp.json());
//add cookie parser middleware
app.use(cookieParser());

//connect APIs
app.use("/user-api", userRoute);
app.use("/author-api", authorRoute);
app.use("/admin-api", adminRoute);
app.use("/common-api", commonRouter);

//connect to db
const connectDB = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("DB_URL environment variable is not set!");
    }
    
    await connect(process.env.DB_URL);
    console.log("✓ DB connection success");

    //start http server
    app.listen(PORT, () => {
      console.log(`✓ Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error("✗ Error in DB connection:", err.message);
    process.exit(1);
  }
};

connectDB();

//dealing with invalid path
app.use((req, res, next) => {
  console.log(req.url);
  res.json({ message: `${req.url} is invalid path` });
});

//error handling middleware
app.use((err, req, res, next) => {
  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  // ✅ HANDLE CUSTOM ERRORS
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});
// app.use((err, req, res, next) => {
//   console.log("Error name:", err.name);
//   console.log("Error code:", err.code);
//   console.log("Error cause:", err.cause);
//   console.log("Full error:", JSON.stringify(err, null, 2));
//   //ValidationError
//   if (err.name === "ValidationError") {
//     return res.status(400).json({ message: "error occurred", error: err.message });
//   }
//   //CastError
//   if (err.name === "CastError") {
//     return res.status(400).json({ message: "error occurred", error: err.message });
//   }
//   const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
//   const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

//   if (errCode === 11000) {
//     const field = Object.keys(keyValue)[0];
//     const value = keyValue[field];
//     return res.status(409).json({
//       message: "error occurred",
//       error: `${field} "${value}" already exists`,
//     });
//   }

//   //send server side error
//   res.status(500).json({ message: "error occurred", error: "Server side error" });
// });
// app.use((err, req, res, next) => {
//   const status = err.status || err.statusCode || 500;
//   const isProduction = process.env.NODE_ENV === "production";

//   let message = err.message || "Unexpected error";
//   let details;

//   // Mongoose validation errors
//   if (err.name === "ValidationError") {
//     message = "Validation error";
//     details = Object.values(err.errors || {}).map((e) => e.message);
//   }

//   // Mongoose cast errors (e.g. invalid ObjectId)
//   if (err.name === "CastError") {
//     message = "Invalid value for field";
//     details = [`${err.path} is invalid`];
//   }

//   // Duplicate key errors
//   if (err.code === 11000) {
//     message = "Duplicate value";
//     const fields = Object.keys(err.keyValue || {});
//     details = fields.length ? fields.map((f) => `${f} already exists`) : undefined;
//   }

//   // Strict mode "throw" errors from schema
//   if (err.name === "StrictModeError") {
//     message = "Invalid fields provided";
//     details = err.path ? [`${err.path} is not allowed`] : undefined;
//   }

//   // Default to 400 for known client errors without explicit status
//   const finalStatus = status === 500 && (err.name || err.code) ? 400 : status;

//   const response = {
//     message,
//     status: finalStatus,
//   };

//   if (details) response.details = details;
//   if (!isProduction) {
//     response.stack = err.stack;
//   }

//   console.log("err :", err);
//   res.status(finalStatus).json(response);
// });
