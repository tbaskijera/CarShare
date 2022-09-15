import { useContext, useRef, useCallback } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required").max(32).trim(),
  surname: yup.string().required("Surname is required").max(32).trim(),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email address is required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

export const useRegisterForm = () => {
  const { onRegister } = useContext(AuthenticationContext);
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
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    validationSchema,

    async onSubmit(values, { setErrors }) {
      try {
        await onRegister(values);
      } catch (error) {
        if (error.code == "auth/email-already-in-use") {
          setErrors({
            name: " ",
            surname: " ",
            email: "Email is already in use",
            password: " ",
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
      name: {
        value: values.name,
        hasError: touched.name && errors.name,
        error: (touched.name && errors.name) ?? " ",
        onBlur: useCallback(() => setFieldTouched("name"), [setFieldTouched]),
        onChangeText: useCallback(
          (text) => setFieldValue("name", text),
          [setFieldValue]
        ),
      },
      surname: {
        value: values.surname,
        hasError: touched.surname && errors.surname,
        error: (touched.surname && errors.surname) ?? " ",
        onBlur: useCallback(
          () => setFieldTouched("surname"),
          [setFieldTouched]
        ),
        onChangeText: useCallback(
          (text) => setFieldValue("surname", text),
          [setFieldValue]
        ),
      },
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
