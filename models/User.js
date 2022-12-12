import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true, //Create the fields createdAt & updatedAt automatically and the type of the fields are Date
  }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
