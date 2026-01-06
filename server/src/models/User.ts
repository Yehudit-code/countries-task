import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  profileImage?: string; // path to file (not the image itself)
  password: string;
  role: "admin" | "user";
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };

  // password reset (future requirement)
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: true
    },

    profileImage: {
      type: String // stores file path only
    },

    password: {
      type: String,
      required: true,
      select: false // important: do not return password by default
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
    },

    resetPasswordToken: {
      type: String
    },

    resetPasswordExpires: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre<UserDocument>("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<UserDocument>("User", UserSchema);
