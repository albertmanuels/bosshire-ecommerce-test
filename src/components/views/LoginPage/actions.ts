"use server"
import { API_URL } from "@/constants/config"
import { createSession, deleteSession } from "@/utils/session"
import { redirect } from "next/navigation"
import * as yup from "yup"

const LoginSchema = yup.object({
  username: yup.string(),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required")
})

export async function login(_: unknown, formData: FormData) {
  const raw = {
    username: formData.get("username"),
    password: formData.get("password")
  }

  try {
    const credentials = await LoginSchema.validate(raw, {abortEarly: false})
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(credentials)
    })

    if(!res.ok) {
      const errText = res.statusText
      return {
        success: false,
        erros: `API error - ${res.status} - ${errText}`
      }
    }

  const data = await res.json()
  const token = data.token
 
  await createSession(token)

  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return {
        success: false,
        errors: error.errors,
      };
    }

    throw error;
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}