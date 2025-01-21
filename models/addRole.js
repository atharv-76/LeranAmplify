import mongoose from "mongoose";

// Define the schema
const addRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["User", "Instructor"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Use an existing model or create a new one
const AddRole = mongoose.models.AddRole || mongoose.model("AddRole", addRoleSchema);

export default AddRole;

