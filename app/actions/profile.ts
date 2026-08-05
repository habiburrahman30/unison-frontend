"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

type ActionResult = { success?: true; error?: string };

// Update the signed-in user's profile (name only — email is not changeable)
export async function updateProfileAction(data: { name: string }): Promise<ActionResult> {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    const name = data.name?.trim();
    if (!name) return { error: "Name is required" };

    try {
        await prisma.user.update({
            where: { id: Number(session.user.id) },
            data: { name },
        });
        revalidatePath("/admin/profile");
        return { success: true };
    } catch (error) {
        console.error("updateProfileAction:", error);
        return { error: "Failed to update profile" };
    }
}

// Change the signed-in user's password
export async function changePasswordAction(data: {
    currentPassword: string;
    newPassword: string;
}): Promise<ActionResult> {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    const { currentPassword, newPassword } = data;
    if (!currentPassword || !newPassword) return { error: "Both passwords are required" };
    if (newPassword.length < 6) return { error: "New password must be at least 6 characters" };

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(session.user.id) },
        });
        if (!user) return { error: "User not found" };

        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) return { error: "Current password is incorrect" };

        const hashed = await bcrypt.hash(newPassword, 12);
        await prisma.user.update({
            where: { id: Number(session.user.id) },
            data: { password: hashed },
        });
        return { success: true };
    } catch (error) {
        console.error("changePasswordAction:", error);
        return { error: "Failed to change password" };
    }
}
