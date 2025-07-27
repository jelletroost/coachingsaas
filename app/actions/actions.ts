"use server";

import { redirect } from "next/navigation";

// redirect
export async function redirectTo(path: string) {
   redirect(path);
}
