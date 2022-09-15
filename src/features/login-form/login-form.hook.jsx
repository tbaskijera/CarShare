import { useContext, useRef, useCallback } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email address is required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

export const useLoginForm = () => {
  const { onLogin } = useContext(AuthenticationContext);
  const {
    setFieldValue,
    setFieldTouched,
    submitForm,
    values,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,

    async onSubmit(values, { setErrors }) {
      try {
        await onLogin(values);
      } catch (error) {
        if (error) {
          setErrors({
            email: " ",
            password: "Wrong credentials!",
          });
          return;
        }

        setErrors({
          email: "",
          password: "Something went wrong",
        });
      }
    },
  });

  return {
    fields: {
      email: {
        value: values.email,
        hasError: touched.email && errors.email,
        error: (touched.email && errors.email) ?? " ",
        onBlur: useCallback(() => setFieldTouched("email"), [setFieldTouched]),
        onChangeText: useCallback(
          (text) => setFieldValue("email", text),
          [setFieldValue]
        ),
      },
      password: {
        value: values.password,
        hasError: touched.password && errors.password,
        error: (touched.password && errors.password) ?? " ",
        onBlur: useCallback(
          () => setFieldTouched("password"),
          [setFieldTouched]
        ),
        onChangeText: useCallback(
          (text) => setFieldValue("password", text),
          [setFieldValue]
        ),
      },
    },
    submitForm,
    isSubmitting,
  };
};
