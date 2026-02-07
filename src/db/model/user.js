import Joi from 'joi';
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // emaillerin benzersiz olmasını sağlar
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const userCreateSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(3).email().required(),
  password: Joi.string().min(6).required(),
});
export const usersLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export const User = model('users', userSchema);
