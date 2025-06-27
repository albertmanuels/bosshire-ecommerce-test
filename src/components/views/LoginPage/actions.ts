"use server"
import { API_URL } from "@/constants/config"
import { ADMIN } from "@/constants/user"
import { createSession, deleteSession } from "@/utils/session"
import * as yup from "yup";

const LoginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export async function loginActions(_: unknown, formData: FormData) {
  const raw = {
    username: formData.get("username"),
    password: formData.get("password")
  }

  try {
     const credentials = await LoginSchema.validate(raw, {abortEarly: false})
    if(credentials.username === ADMIN.username && credentials.password === ADMIN.password) {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
      })

        if(!res.ok) {
          throw new Error(res.statusText)
        }

        const data = await res.json()
        const token = data.token

        await createSession(token)

        return {
          success: true,
          error: null
        }
    } else {
      return {
        success: false,
        error: "Your are not allowed to access the dashboard!"
      }
    }
   
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const fieldErrors: Record<string, string> = {};
      error.inner.forEach((e) => {
        if (e.path) fieldErrors[e.path] = e.message;
      });

      return {
        success: false,
        fieldErrors
      };
    }

    throw error;
  }
}

export async function logout() {
  try {
    await deleteSession();

    return {
      success: true,
      error: null
    }
  } catch (error) {
    return {
      success: false,
      error: error
    }
  }
}