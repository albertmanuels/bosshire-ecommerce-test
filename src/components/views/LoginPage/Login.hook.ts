"use client";
import { loginActions } from "./actions";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormValues } from "./Login.types";
import { pathname } from "@/constants/navigation";

const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const useLogin = () => {
  const router = useRouter();
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(LoginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    if (errors.username || errors.password) {
      return;
    }

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    const result = await loginActions(null, formData);

    if (result?.fieldErrors) {
      for (const key in result.fieldErrors) {
        setError(key as keyof FormValues, {
          type: "server",
          message: result.fieldErrors[key],
        });
      }

      toast.error(result?.error);
      return;
    }

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Login successful!");
    router.push(pathname.DASHBOARD);
  };

  return {
    control,
    handleSubmit,
    onSubmit
  };
};

export default useLogin;
