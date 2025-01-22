import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    passportImage: { type: String, required: true },
    signatureImage: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String },
    dateOfBirth: { type: Date, required: true },
    age: { type: Number },
    address: { type: String, required: true },
    status: { type: String },
    type: { type: String },
    expiryDate: { type: Date },
    licenceNumber: { type: String },
    cardNumber: { type: String, required: true },
    class: { type: String },
    gender: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
