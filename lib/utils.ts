import prisma from "@/prisma/client";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
const bcrypt = require('bcryptjs');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export async function getUserFromDb(email: string, password: string) {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(), // Convert email to lowercase
      },
    });

    // If no user found, return null
    if (!user) {
      return null;
    }
    
    // Verify the password using bcrypt
    const isPasswordValid = await verifyPassword(password, user.password);

    // If the password is not valid, return null
    if (!isPasswordValid) {
      return null;
    }

    // Return the user if everything is valid
    return user;
  } catch (error) {
    console.error("Error fetching user from DB:", error);
    throw new Error("Failed to fetch user");
  }
}
