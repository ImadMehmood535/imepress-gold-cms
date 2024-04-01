/** @format */

import * as yup from "yup";
const passwordRegExp = /^\s*([^\s]+)\s*$/;

export const smtpValidationSchema = yup.object().shape({
  host: yup.string().required("Host is required"),
  port: yup.number().required("*").positive("Port must be a positive number"),
  email: yup
    .string()
    .email("Invalid Sender Address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .matches(passwordRegExp, "Password cannot have leading or trailing spaces")
    .required("Password is required"),
  newPassword: yup
    .string()
    .matches(passwordRegExp, "Password cannot have leading or trailing spaces")
    .required("Please re-enter your password")
    .notOneOf(
      [yup.ref("password"), null],
      "Password cannot be the same as the old password"
    ),
});

export const forgotPassword = yup.object().shape({
  email: yup
    .string()
    .email("Invalid Sender Address")
    .required("Email is required"),
});

export const OTPSchema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .min(6, "Otp must be at least 6 characters")
    .max(6, "Otp must be at least 6 characters"),
});

export const resetSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const boxTypeSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .test("maxWord", "Exceeded maximum word limit of 60 words", (value) => {
      const words = value.trim().split(/\s+/);
      return words.length <= 60;
    }),
});

export const sponsorDetailsSchema = yup.object().shape({
  requirements: yup
    .string()
    .required("Requirement is required")
    .test("maxWord", "Exceeded maximum word limit of 60 words", (value) => {
      const words = value.trim().split(/\s+/);
      return words.length <= 60;
    }),
  requirement_details: yup.string().required("Requirement Details is required"),
  requirement_description: yup
    .string()
    .required("Requirement Description is required"),
});

export const productSchema = yup.object().shape({
  name: yup.string().required("Title is required"),
  description: yup.string().required("description is required"),
  brandId: yup.number().required("Brand is required"),
  categoryId: yup.number().required("Category is required"),
  subCategoryId: yup.number().required("Sub Category is required"),
  price: yup.number().min(1).required("Price is required"),
  image: yup
    .mixed()
    .test("fileSize", "png and jpeg image required", (value) => {
      return value && value.length > 0;
    }),
});
export const updateProductSchema = yup.object().shape({
  name: yup.string().required("Title is required"),
  description: yup.string().required("description is required"),
  brandId: yup.number().required("Brand is required"),
  categoryId: yup.number().required("Category is required"),
  subCategoryId: yup.number().required("Sub Category is required"),
  price: yup.number().min(1).required("Price is required"),
  image: yup
    .mixed()
    .test("fileSize", "png and jpeg image required", (value) => {
      return value && value.length > 0;
    }),
});

export const updateBoxesSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .test("maxWord", "Exceeded maximum word limit of 60 words", (value) => {
      const words = value.trim().split(/\s+/);
      return words.length <= 60;
    }),
  item_name: yup
    .string()
    .required("Item name is required")
    .test("maxWord", "Exceeded maximum word limit of 60 words", (value) => {
      const words = value.trim().split(/\s+/);
      return words.length <= 60;
    }),
  details: yup.string().required("Detail is required"),
  price: yup.number().min(1).required("Price is required"),
  item_quantity: yup
    .number("must be number")
    .min(1)
    .required("Quantity is required"),
  is_brand: yup.boolean().default(false),
  type_id: yup.number("must be number").min(1).required("Type is required"),
  length: yup.number().min(1).required("length is required"),
  width: yup.number().min(1).required("width is required"),
  height: yup.number().min(1).required("height is required"),
  weight: yup.number().min(1).required("weight is required"),
});

export const CommunitySchema = yup.object().shape({
  first_name: yup
    .string()
    .required("First Name is required")
    .test("maxWord", "Exceeded maximum word limit of 60 words", (value) => {
      const words = value.trim().split(/\s+/);
      return words.length <= 60;
    }),
  last_name: yup
    .string()
    .required("Last name is required")
    .test("maxWord", "Exceeded maximum word limit of 60 words", (value) => {
      const words = value.trim().split(/\s+/);
      return words.length <= 60;
    }),
  message: yup.string().required("Message is required"),
  image: yup
    .mixed()
    .test("fileSize", "png and jpeg image required", (value) => {
      return value && value.length > 0;
    })
    .test(
      "fileType",
      "Invalid file format. Only PNG or JPEG/JPG allowed.",
      (value) => {
        if (!value) return true;
        const supportedFormats = ["image/png", "image/jpeg", "image/jpg"];
        return supportedFormats.includes(value[0]?.type);
      }
    ),
  rating: yup.number().min(1).max(5).required("Rating is required"),
});

export const updateCommunitySchema = yup.object().shape({
  first_name: yup
    .string()
    .required("First Name is required")
    .test("maxWord", "Exceeded maximum word limit of 60 words", (value) => {
      const words = value.trim().split(/\s+/);
      return words.length <= 60;
    }),
  last_name: yup
    .string()
    .required("Last name is required")
    .test("maxWord", "Exceeded maximum word limit of 60 words", (value) => {
      const words = value.trim().split(/\s+/);
      return words.length <= 60;
    }),
  message: yup.string().required("Message is required"),
  rating: yup.number().min(1).max(5).required("Rating is required"),
});

export const BrandSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .test("maxWord", "Exceeded maximum word limit of 60 words", (value) => {
      const words = value.trim().split(/\s+/);
      return words.length <= 60;
    }),
});

export const updateEventSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .test("maxWord", "Exceeded maximum word limit of 60 words", (value) => {
      const words = value.trim().split(/\s+/);
      return words.length <= 60;
    }),
  address: yup.string().required("Adress is required"),
  description: yup.string().required("Description is required"),
  time: yup.date().required("Event Date is required"),
});

export const memeberSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  designation: yup.string().required("Designation is required"),
  image: yup
    .mixed()
    .test("fileSize", "png and jpeg images are requires", (value) => {
      return value && value.length > 0;
    }),
});

export const updateMemberSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  designation: yup.string().required("Designation is required"),
});

export const statsSchema = yup.object().shape({
  label: yup.string().required("Label is required"),
  value: yup
    .number()
    .typeError("Must be a number")
    .required("Value is required"),
  type: yup.string().required("type is required"),
});
