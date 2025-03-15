require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/charityDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose Schemas
const DonationSchema = new mongoose.Schema({
  donorName: String,
  amount: Number,
  timestamp: Date,
});

const ExpenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  timestamp: Date,
});

const Donation = mongoose.model("Donation", DonationSchema);
const Expense = mongoose.model("Expense", ExpenseSchema);

// API Endpoints
app.post("/donate", async (req, res) => {
  const { donorName, amount } = req.body;
  const donation = new Donation({ donorName, amount, timestamp: new Date() });
  await donation.save();
  res.json({ success: true, donation });
});

app.post("/add-expense", async (req, res) => {
  const { description, amount } = req.body;
  const expense = new Expense({ description, amount, timestamp: new Date() });
  await expense.save();
  res.json({ success: true, expense });
});

app.get("/donations", async (req, res) => {
  const donations = await Donation.find();
  res.json(donations);
});

app.get("/expenses", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB Connection
// mongoose.connect("mongodb://127.0.0.1:27017/charityDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Define Mongoose Schemas
// const UserSchema = new mongoose.Schema({
//   email: String,
//   blockchainAddress: String, // Maps email to blockchain address
//   isOwner: Boolean, // Boolean to determine if this user is the owner
// });

// const DonationSchema = new mongoose.Schema({
//   donorName: String,
//   amount: Number,
//   email: String, // Store email to track user donations
//   timestamp: Date,
// });

// const ExpenseSchema = new mongoose.Schema({
//   description: String,
//   amount: Number,
//   email: String, // Only the owner should be able to add expenses
//   timestamp: Date,
// });

// const User = mongoose.model("User", UserSchema);
// const Donation = mongoose.model("Donation", DonationSchema);
// const Expense = mongoose.model("Expense", ExpenseSchema);

// // 🔹 API: User Login & Address Mapping
// app.post("/login", async (req, res) => {
//   const { email } = req.body;

//   let user = await User.findOne({ email });

//   if (!user) {
//     // Generate a random blockchain address for new users
//     const blockchainAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
    
//     user = new User({ email, blockchainAddress, isOwner: false });
//     await user.save();
//   }

//   res.json({ success: true, address: user.blockchainAddress, isOwner: user.isOwner });
// });

// // 🔹 API: Donate (Only for Logged-in Users)
// app.post("/donate", async (req, res) => {
//   const { donorName, amount, email } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(401).json({ success: false, message: "User not found. Please log in first." });
//   }

//   const donation = new Donation({ donorName, amount, email, timestamp: new Date() });
//   await donation.save();
  
//   res.json({ success: true, donation });
// });

// // 🔹 API: Add Expense (Only for the Owner)
// app.post("/add-expense", async (req, res) => {
//   const { description, amount, email } = req.body;

//   const user = await User.findOne({ email });
//   if (!user || !user.isOwner) {
//     return res.status(403).json({ success: false, message: "Only the owner can add expenses." });
//   }

//   const expense = new Expense({ description, amount, email, timestamp: new Date() });
//   await expense.save();
  
//   res.json({ success: true, expense });
// });

// // 🔹 API: Get Donations for a Specific User
// app.get("/donations/:email", async (req, res) => {
//   const { email } = req.params;
//   const donations = await Donation.find({ email });
//   res.json(donations);
// });

// // 🔹 API: Get All Expenses (For Both Donors & Owner)
// app.get("/expenses/:email", async (req, res) => {
//   const { email } = req.params;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(403).json({ success: false, message: "User not found. Please log in first." });
//   }

//   // Fetch all expenses (both owners and donors can view them)
//   const expenses = await Expense.find();
//   res.json(expenses);
// });

// // 🔹 API: Get User Role (Check if User is Owner)
// app.get("/get-user-role/:email", async (req, res) => {
//   const { email } = req.params;
//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(404).json({ success: false, message: "User not found." });
//   }

//   res.json({ success: true, isOwner: user.isOwner, address: user.blockchainAddress });
// });

// // Start Server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
