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
// ! Create ve Login işlemleri için doğrulama şemaları
export const userCreateSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(3).email().required(),
  password: Joi.string().min(6).required(),
});
// ! Login işlemi için doğrulama şeması
export const usersLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
// ! Şİfre güncelleme talebi için doğrulama şeması
export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
// ! Şifre sıfırlandıktan sonra gelen veriyi  doğrulama şeması
export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});

export const User = model('users', userSchema);
