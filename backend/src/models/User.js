import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    uniqueCode: { type: String, unique: true },
    passportImage: { type: String},
    signatureImage: { type: String},
    fullName: { type: String },
    email: { type: String },
    dateOfBirth: { type: Date },
    age: { type: Number },
    address: { type: String },
    status: { type: String },
    type: { type: String },
    expiryDate: { type: Date },
    licenceNumber: { type: String },
    cardNumber: { type: String },
    class: { type: String },
    gender: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
