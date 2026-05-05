"use server";

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  let redirectTo = "";

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, // ← critical: disable built-in redirect
    });
    redirectTo = "/admin";
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password" };
    }
    return { error: "Something went wrong. Please try again." };
  }

  // Redirect OUTSIDE of try/catch — this is the key fix
  if (redirectTo) redirect(redirectTo);
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}
