import * as Yup from "yup";
import regexOptions from "../utils/options/regex";
import getErrorMessage from "../helpers/error-message-helper";

const emailSchema = Yup.string()
  .required(getErrorMessage("required"))
  .matches(regexOptions.patterns.email, getErrorMessage("email"));

const passwordSchema = Yup.string().required(getErrorMessage("required"));

export const loginSchema = Yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export const initLoginFormValue = {
  email: "",
  password: "",
};
