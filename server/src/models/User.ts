import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  profileImage?: string;
  password: string;
  role: "admin" | "user";
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    profileImage: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
    permissions: {
      create: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    }
  },
  {
    timestamps: true
  }
);

/**
 * Hash password before saving user
 */
UserSchema.pre<UserDocument>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});



/**
 * Compare password on login
 */
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<UserDocument>("User", UserSchema);
